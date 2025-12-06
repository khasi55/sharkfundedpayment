import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendPaymentSuccessEmail } from '@/utils/email';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Use anon key as we only need to read (assuming public read access or user's own data)
// If RLS prevents reading other's transactions, this might need service role, 
// but usually users can read their own transaction if authenticated, or public read is enabled for verification.
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { utr, email: providedEmail, name: providedName } = body;

        if (!utr) {
            return NextResponse.json({ success: false, message: 'UTR is required' }, { status: 400 });
        }



        // 1. Fetch Transaction
        const { data: transaction, error } = await supabase
            .from('transactions')
            .select('*')
            .eq('utr', utr)
            .single();

        if (error || !transaction) {
            console.error('Transaction not found:', error);
            return NextResponse.json({ success: false, message: 'Transaction not found' }, { status: 404 });
        }

        // 2. Check Status
        if (transaction.status !== 'verified') {
            return NextResponse.json({ success: false, message: 'Transaction is not verified yet' }, { status: 400 });
        }

        // 3. Send Email
        const recipientEmail = providedEmail || transaction.customer_details?.email;
        const recipientName = providedName || transaction.customer_details?.name || 'Customer';
        const orderId = transaction.order_id || transaction.session_id || 'N/A';
        const amount = transaction.amount;
        const date = new Date(transaction.created_at).toLocaleString();

        if (recipientEmail) {
            await sendPaymentSuccessEmail({
                to: recipientEmail,
                name: recipientName,
                amount,
                orderId,
                utr,
                date
            });
            return NextResponse.json({ success: true, message: 'Receipt sent successfully' });
        } else {
            return NextResponse.json({ success: false, message: 'No email address found' }, { status: 400 });
        }

    } catch (error) {
        console.error('Send Receipt Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
