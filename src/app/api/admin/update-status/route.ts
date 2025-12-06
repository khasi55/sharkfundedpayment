import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendPaymentSuccessEmail } from '@/utils/email';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Supabase credentials missing');
}

// Use service role key for admin operations (falls back to anon if missing)
const supabase = createClient(supabaseUrl, supabaseServiceKey || 'missing-key');

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { transactionId, status } = body;

        if (!transactionId || !status) {
            return NextResponse.json({ success: false, message: 'Transaction ID and Status are required' }, { status: 400 });
        }



        // 1. Update Transaction Status
        const { data: transaction, error } = await supabase
            .from('transactions')
            .update({ status: status })
            .eq('id', transactionId)
            .select()
            .single();

        if (error) {
            console.error('Error updating transaction:', error);
            return NextResponse.json({ success: false, message: 'Failed to update transaction' }, { status: 500 });
        }

        // 2. If Verified, Send Email
        if (status === 'verified' && transaction) {
            const email = transaction.customer_details?.email;
            const name = transaction.customer_details?.name || 'Customer';
            const amount = transaction.amount;
            const utr = transaction.utr;
            const orderId = transaction.order_id || transaction.session_id || 'N/A';
            const date = new Date(transaction.created_at).toLocaleString();

            if (email) {

                try {
                    await sendPaymentSuccessEmail({
                        to: email,
                        name,
                        amount,
                        orderId,
                        utr,
                        date
                    });

                } catch (emailError) {
                    console.error('Error sending email:', emailError);
                }
            } else {

            }
        }

        return NextResponse.json({ success: true, message: 'Status updated successfully', data: transaction });

    } catch (error) {
        console.error('Admin API Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
