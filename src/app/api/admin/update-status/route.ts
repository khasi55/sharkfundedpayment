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
            // Ideally, we fetch the ORIGINAL payload from api_logs to get the exact data sent by the merchant.
            // This prevents issues where manual uploads might have overwritten customer_details.
            let webhookUrl = transaction.customer_details?.webhook_url || transaction.customer_details?.callback_url;
            let referenceId = transaction.customer_details?.reference_id || transaction.customer_details?.referenceId;
            let originalPayload: any = {};

            // Try to find the original API log for this order
            const orderIdForLookup = transaction.order_id || transaction.session_id || transaction.id;
            // We search for metadata->order_id matching the ID
            // Since we can't easily query JSONB metadata efficiently without an index, and we didn't index it yet,
            // we will try to match by session_id in the 'transactions' table which we already have.
            // But wait, we need to query `api_logs`.
            // Let's query api_logs where metadata->>'order_id' equals our orderId.
            const { data: apiLog } = await supabase
                .from('api_logs')
                .select('request_payload')
                .eq('metadata->>order_id', orderIdForLookup)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();

            if (apiLog && apiLog.request_payload) {
                // Found the original payload! Use this as Source of Truth.
                originalPayload = apiLog.request_payload;
                console.log('Found original API log payload:', JSON.stringify(originalPayload));

                // Prioritize values from the log
                if (originalPayload.callback_url || originalPayload.callbackUrl) {
                    webhookUrl = originalPayload.callback_url || originalPayload.callbackUrl;
                }
                if (originalPayload.webhook_url || originalPayload.webhookUrl) {
                    // If both exist, we might want to prefer webhook_url, but stick to existing logic
                    // existing logic: webhook_url || callback_url
                    webhookUrl = originalPayload.webhook_url || originalPayload.webhookUrl || webhookUrl;
                }
                if (originalPayload.reference_id) {
                    referenceId = originalPayload.reference_id;
                }
            } else {
                console.log('No API log found for order, falling back to transaction details.');
            }

            if (!webhookUrl) {
                console.log('No webhook_url or callback_url found, using default fallback URL.');
                webhookUrl = 'https://dashboard.sharkfunded.com/sharkpaycallbackrespo';
            }

            if (webhookUrl) {
                const payload = {
                    event: 'payment.success',
                    orderId: orderId,
                    reference_id: referenceId || null,
                    utr: utr,
                    amount: amount,
                    status: 'verified',
                    timestamp: new Date().toISOString(),
                    name: name,
                    email: email,
                    ...(typeof originalPayload === 'object' ? originalPayload : {})
                };

                console.log('Sending Webhook Payload:', JSON.stringify(payload, null, 2));

                // [NEW] Log Outgoing Webhook to Database
                try {
                    await supabase.from('api_logs').insert({
                        endpoint: 'webhook-outbound',
                        request_payload: payload,
                        metadata: {
                            target_url: webhookUrl,
                            order_id: orderId,
                            utr: utr,
                            reference_id: referenceId
                        }
                    });
                } catch (logError) {
                    console.error('Failed to log outgoing webhook:', logError);
                }

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
