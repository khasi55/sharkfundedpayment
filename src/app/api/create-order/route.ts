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
});

export async function POST(request: Request) {
    try {
        // Rate Limiting
        const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
        const rateLimit = await checkRateLimit(ip, 'create-order', 5, 60); // 5 requests per minute

        if (!rateLimit.success) {
            return NextResponse.json(
                { success: false, message: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        // Authentication Check (Basic Auth)
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Basic ')) {
            return NextResponse.json({ success: false, message: 'Unauthorized: Missing Basic Auth' }, { status: 401 });
        }

        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [keyId, keySecret] = credentials.split(':');

        const validKeyId = process.env.SHARK_PAYMENT_KEY_ID;
        const validKeySecret = process.env.SHARK_PAYMENT_KEY_SECRET;

        if (keyId !== validKeyId || keySecret !== validKeySecret) {
            return NextResponse.json({ success: false, message: 'Unauthorized: Invalid Credentials' }, { status: 401 });
        }

        const body = await request.json();
        console.log('Create Order Payload:', JSON.stringify(body, null, 2));

        const validation = CreateOrderSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { success: false, message: 'Validation Error', errors: validation.error.format() },
                { status: 400 }
            );
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
            return NextResponse.json(
                { success: false, message: 'Your account has been restricted from making new orders. Please contact support.' },
                { status: 403 }
            );
        }

        // Create a new transaction record
        const { data, error } = await supabase
            .from('transactions')
            .insert([
                {
                    amount: amount,
                    status: 'pending_payment', // Initial status
                    customer_details: { name, email, callback_url, reference_id, webhook_url, success_url, failed_url },
                    utr: `ORDER-${Date.now()}-${Math.random().toString(36).substring(7)}`, // Placeholder UTR
                },
            ])
            .select()
            .single();

        if (error) {
            console.error('Error creating order:', JSON.stringify(error, null, 2));
            return NextResponse.json(
                { success: false, message: 'Database error creating order', error: error.message || error },
                { status: 500 }
            );
        }

        const orderId = data.id; // This UUID is our "Session ID"
        const checkoutUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sharkfunded.com'}/secure-checkout/${orderId}`;

        // [DEBUG] Log to Database (After creation to capture Order ID)
        // We use fire-and-forget here to not block response, but we await it to be safe for serverless
        await supabase.from('api_logs').insert({
            endpoint: 'create-order',
            ip_address: ip,
            request_payload: body,
            metadata: { key_id: keyId, order_id: orderId, generated_utr: data.utr }
        });

        return NextResponse.json({
            success: true,
            orderId: orderId,
            url: checkoutUrl,
            message: 'Order created successfully'
        });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
