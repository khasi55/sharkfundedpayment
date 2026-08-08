import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/rateLimit';

const CreateOrderSchema = z.object({
    amount: z.coerce.number().positive('Amount must be positive'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    callback_url: z.string().url().optional().or(z.literal('')),
    reference_id: z.string().optional(),
    webhook_url: z.string().url().optional().or(z.literal('')),
    success_url: z.string().url().optional().or(z.literal('')),
    failed_url: z.string().url().optional().or(z.literal('')),
}).passthrough();

export async function POST(request: Request) {
    let body: any = null;
    let ip = '127.0.0.1';
    let keyId: string | undefined = undefined;

    const logResponse = async (statusCode: number, responseBody: any, metadata: any = {}) => {
        try {
            await query(
                `INSERT INTO api_logs (endpoint, ip_address, request_payload, response_payload, status_code, metadata)
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [
                    'create-order',
                    ip,
                    JSON.stringify(body),
                    JSON.stringify(responseBody),
                    statusCode,
                    JSON.stringify({
                        ...metadata,
                        key_id: keyId || metadata?.key_id
                    })
                ]
            );
        } catch (err) {
            console.error('[Logging Error] Failed to write API log:', err);
        }
    };

    try {
        ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

        const authHeader = request.headers.get('authorization');
        if (authHeader && authHeader.startsWith('Basic ')) {
            try {
                const base64Credentials = authHeader.split(' ')[1];
                const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
                const [kId] = credentials.split(':');
                keyId = kId;
            } catch (e) {
                // Ignore
            }
        }

        const rateLimit = await checkRateLimit(ip, 'create-order', 5, 60);

        if (!rateLimit.success) {
            const resBody = { success: false, message: 'Too many requests. Please try again later.' };
            await logResponse(429, resBody, { rate_limit: true });
            return NextResponse.json(resBody, { status: 429 });
        }

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

        const { amount, email } = validation.data;

        // Check if user is blocked (Case Insensitive)
        try {
            const blockCheck = await query(`SELECT email FROM blocked_users WHERE LOWER(email) = LOWER($1) LIMIT 1`, [email]);
            if (blockCheck.rows.length > 0) {
                console.log(`Blocked user attempted order: ${email}`);
                const resBody = { success: false, message: 'Your account has been restricted from making new orders. Please contact support.' };
                await logResponse(403, resBody, { email, blocked: true });
                return NextResponse.json(resBody, { status: 403 });
            }
        } catch (blockErr) {
            console.error('Error checking blocked status:', blockErr);
        }

        const placeholderUtr = `ORDER-${Date.now()}-${Math.random().toString(36).substring(7)}`;

        // Insert new transaction record in PostgreSQL
        const insertRes = await query(
            `INSERT INTO transactions (amount, status, customer_details, utr)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [amount, 'pending_payment', JSON.stringify(body), placeholderUtr]
        );

        if (insertRes.rows.length === 0) {
            const resBody = { success: false, message: 'Database error creating order' };
            await logResponse(500, resBody);
            return NextResponse.json(resBody, { status: 500 });
        }

        const data = insertRes.rows[0];
        const orderId = data.id;
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
