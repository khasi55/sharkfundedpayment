import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabase';
import { sendPaymentSuccessEmail } from '@/utils/email';
import { sendMerchantWebhook } from '@/utils/webhooks';
import { getAdminUser } from '@/lib/adminAuth';

export async function POST(request: Request) {
    try {
        const adminUser = await getAdminUser();
        if (!adminUser) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { transactionId, status } = body; // approvedBy is now derived from session

        if (!transactionId || !status) {
            return NextResponse.json({ success: false, message: 'Transaction ID and Status are required' }, { status: 400 });
        }

        // 1. Update Transaction Status & Approver
        const updateData: any = {
            status: status,
            approved_by: adminUser.email // SECURE: Use session user, not request body
        };

        const { data: transaction, error } = await supabase
            .from('transactions')
            .update(updateData)
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
            let referenceId = transaction.customer_details?.reference_id || transaction.customer_details?.referenceId;

            // Base payload from original merchant request (if saved in customer_details)
            let originalPayload: any = (typeof transaction.customer_details === 'object') ? transaction.customer_details : {};

            const orderIdForLookup = transaction.id;

            // Fallback: If originalPayload looks incomplete, try to find the create-order API log
            if (!originalPayload.callback_url && !originalPayload.webhook_url) {
                const { data: apiLog } = await supabase
                    .from('api_logs')
                    .select('request_payload')
                    .or(`metadata->>order_id.eq.${orderIdForLookup}`)
                    .eq('endpoint', 'create-order')
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .maybeSingle();

                if (apiLog && apiLog.request_payload) {
                    originalPayload = { ...apiLog.request_payload, ...originalPayload };
                    console.log('Found original API log payload as fallback:', JSON.stringify(apiLog.request_payload));
                }
            }

            // Extract callback details from merged originalPayload
            if (originalPayload.reference_id) referenceId = originalPayload.reference_id;
            if (originalPayload.callback_url) webhookUrl = originalPayload.callback_url;
            else if (originalPayload.callbackUrl) webhookUrl = originalPayload.callbackUrl;
            else if (originalPayload.webhook_url) webhookUrl = originalPayload.webhook_url;
            else if (originalPayload.webhookUrl) webhookUrl = originalPayload.webhookUrl;

            if (!webhookUrl) {
                console.log('No webhook_url found, using default fallback.');
                webhookUrl = 'https://dashboard.sharkfunded.com/sharkpaycallbackrespo';
            }

            if (webhookUrl) {
                // Construct final payload: original metadata + verified status overrides
                const payload = {
                    ...(typeof originalPayload === 'object' ? originalPayload : {}),
                    event: 'payment.success',
                    orderId: orderId,
                    reference_id: referenceId || null,
                    utr: utr,
                    amount: amount,
                    status: 'verified',
                    timestamp: new Date().toISOString(),
                    name: name,
                    email: email,
                };

                console.log('Sending Webhook Payload:', JSON.stringify(payload, null, 2));

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
                    console.log('✅ Webhook sent and finished.');
                } catch (webhookError) {
                    console.error('⚠️ Webhook failed (likely timeout), but Order is Verified.', webhookError);
                }
            }
        }

        return NextResponse.json({ success: true, message: 'Status updated successfully', data: transaction });

    } catch (error) {
        console.error('Admin API Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
