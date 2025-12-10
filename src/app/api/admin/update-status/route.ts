import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabase';
import { sendPaymentSuccessEmail } from '@/utils/email';
import { sendMerchantWebhook } from '@/utils/webhooks';

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
                console.log(`No email found for transaction ${transactionId}, skipping email.`);
            }

            // 3. Send Webhook (Callback)
            let webhookUrl = transaction.customer_details?.webhook_url || transaction.customer_details?.callback_url;

            if (!webhookUrl) {
                console.log('No webhook_url or callback_url found, using default fallback URL.');
                webhookUrl = 'https://dashboard.sharkfunded.com/sharkpaycallbackrespo';
            }

            if (webhookUrl) {
                const payload = {
                    event: 'payment.success',
                    orderId: orderId,
                    reference_id: transaction.customer_details?.reference_id,
                    utr: utr,
                    amount: amount,
                    status: 'verified',
                    timestamp: new Date().toISOString()
                };

                try {
                    await sendMerchantWebhook(webhookUrl, payload as any);
                } catch (webhookError) {
                    console.error('Error sending webhook:', webhookError);
                }
            } else {
                console.log('No webhook_url found, skipping webhook.');
            }
        }

        return NextResponse.json({ success: true, message: 'Status updated successfully', data: transaction });

    } catch (error) {
        console.error('Admin API Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
