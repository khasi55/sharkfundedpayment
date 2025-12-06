import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
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
        const { amount, name, email, callback_url } = body;

        if (!amount || !name || !email) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields: amount, name, email' },
                { status: 400 }
            );
        }

        // Create a new transaction record
        // We use the 'id' (UUID) as the session identifier
        // We generate a placeholder UTR because the column is NOT NULL
        const { data, error } = await supabase
            .from('transactions')
            .insert([
                {
                    amount: amount,
                    status: 'pending_payment', // Initial status
                    customer_details: { name, email, callback_url },
                    utr: `ORDER-${Date.now()}-${Math.random().toString(36).substring(7)}`, // Placeholder UTR
                    // order_id is null initially (generated after verification)
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
