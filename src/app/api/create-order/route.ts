import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/rateLimit';

const CreateOrderSchema = z.object({
    amount: z.coerce.number().positive('Amount must be positive'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    callback_url: z.string().url().optional().or(z.literal('')),
    reference_id: z.string().optional(), // Allow external reference ID
    webhook_url: z.string().url().optional().or(z.literal('')), // [NEW] Webhook URL for server-to-server POST
    success_url: z.string().url().optional().or(z.literal('')), // [NEW] Explicit Success Redirect
    failed_url: z.string().url().optional().or(z.literal('')), // [NEW] Explicit Failed Redirect
}).passthrough();

export async function POST(request: Request) {
    let body: any = null;
    let ip = '127.0.0.1';
    let keyId: string | undefined = undefined;

    const logResponse = async (statusCode: number, responseBody: any, metadata: any = {}) => {
        try {
            await supabase.from('api_logs').insert({
                endpoint: 'create-order',
                ip_address: ip,
                request_payload: body,
                response_payload: responseBody,
                status_code: statusCode,
                metadata: {
                    ...metadata,
                    key_id: keyId || metadata?.key_id
                }
            });
        } catch (err) {
            console.error('[Logging Error] Failed to write API log:', err);
        }
    };

    try {
        ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

        // Extract keyId early for logging
        const authHeader = request.headers.get('authorization');
        if (authHeader && authHeader.startsWith('Basic ')) {
            try {
                const base64Credentials = authHeader.split(' ')[1];
                const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
                const [kId] = credentials.split(':');
                keyId = kId;
            } catch (e) {
                // Ignore decoding issues
            }
        }

        // Rate Limiting
        const rateLimit = await checkRateLimit(ip, 'create-order', 5, 60); // 5 requests per minute

        if (!rateLimit.success) {
            const resBody = { success: false, message: 'Too many requests. Please try again later.' };
            await logResponse(429, resBody, { rate_limit: true });
            return NextResponse.json(resBody, { status: 429 });
        }

        // Authentication Check (Basic Auth)
        if (!authHeader || !authHeader.startsWith('Basic ')) {
            const resBody = { success: false, message: 'Unauthorized: Missing Basic Auth' };
            await logResponse(401, resBody);
            return NextResponse.json(resBody, { status: 401 });
        }

        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [kId, keySecret] = credentials.split(':');
        keyId = kId;

        const validKeyId = process.env.SHARK_PAYMENT_KEY_ID;
        const validKeySecret = process.env.SHARK_PAYMENT_KEY_SECRET;

        if (keyId !== validKeyId || keySecret !== validKeySecret) {
            const resBody = { success: false, message: 'Unauthorized: Invalid Credentials' };
            await logResponse(401, resBody);
            return NextResponse.json(resBody, { status: 401 });
        }

        try {
            body = await request.json();
        } catch (e) {
            const resBody = { success: false, message: 'Invalid JSON payload' };
            await logResponse(400, resBody, { error: 'Invalid JSON' });
            return NextResponse.json(resBody, { status: 400 });
        }

        console.log('Create Order Payload:', JSON.stringify(body, null, 2));

        const validation = CreateOrderSchema.safeParse(body);

        if (!validation.success) {
            const resBody = { success: false, message: 'Validation Error', errors: validation.error.format() };
            await logResponse(400, resBody);
            return NextResponse.json(resBody, { status: 400 });
        }

        const { amount, name, email, callback_url, reference_id, webhook_url, success_url, failed_url } = validation.data;

        // [NEW] Check if user is blocked (Case Insensitive)
        const { data: blockedUser, error: blockCheckError } = await supabase
            .from('blocked_users')
            .select('email')
            .ilike('email', email) // Case-insensitive match
            .maybeSingle(); // Use maybeSingle to avoid error if 0 rows, but still catch DB errors

        if (blockCheckError) {
            console.error('Error checking blocked status (ignoring block to allow order):', blockCheckError);
            // Verify if the error is "relation does not exist" - if so, it means the feature isn't set up yet.
            // We allow the order to proceed to avoid breaking payments due to missing config, 
            // but we logged it.
        } else if (blockedUser) {
            console.log(`Blocked user attempted order: ${email}`);
            const resBody = { success: false, message: 'Your account has been restricted from making new orders. Please contact support.' };
            await logResponse(403, resBody, { email, blocked: true });
            return NextResponse.json(resBody, { status: 403 });
        }

        // Create a new transaction record
        const { data, error } = await supabase
            .from('transactions')
            .insert([
                {
                    amount: amount,
                    status: 'pending_payment', // Initial status
                    customer_details: body, // [NEW] Store entire body to preserve merchant metadata
                    utr: `ORDER-${Date.now()}-${Math.random().toString(36).substring(7)}`, // Placeholder UTR
                },
            ])
            .select()
            .single();

        if (error) {
            console.error('Error creating order:', JSON.stringify(error, null, 2));
            const resBody = { success: false, message: 'Database error creating order', error: error.message || error };
            await logResponse(500, resBody, { db_error: error });
            return NextResponse.json(resBody, { status: 500 });
        }

        const orderId = data.id; // This UUID is our "Session ID"
        const checkoutUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sharkfunded.com'}/secure-checkout/${orderId}`;

        const resBody = {
            success: true,
            orderId: orderId,
            url: checkoutUrl,
            message: 'Order created successfully'
        };

        await logResponse(200, resBody, { order_id: orderId, generated_utr: data.utr });

        return NextResponse.json(resBody);

    } catch (error: any) {
        console.error('API Error:', error);
        const resBody = { success: false, message: 'Internal server error' };
        await logResponse(500, resBody, { error: error?.message || String(error) });
        return NextResponse.json(resBody, { status: 500 });
    }
}
