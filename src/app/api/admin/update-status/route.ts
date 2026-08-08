import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
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
        const { transactionId, status } = body;

        if (!transactionId || !status) {
            return NextResponse.json({ success: false, message: 'Transaction ID and Status are required' }, { status: 400 });
        }

        const updateRes = await query(
            `UPDATE transactions SET status = $1, approved_by = $2 WHERE id::text = $3 OR session_id = $3 RETURNING *`,
            [status, adminUser.email, transactionId]
        );

        if (updateRes.rows.length === 0) {
            return NextResponse.json({ success: false, message: 'Failed to update transaction' }, { status: 500 });
        }

        const transaction = updateRes.rows[0];

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
            }

            let webhookUrl = transaction.customer_details?.webhook_url || transaction.customer_details?.callback_url;
            let referenceId = transaction.customer_details?.reference_id || transaction.customer_details?.referenceId;

            let originalPayload: any = (typeof transaction.customer_details === 'object') ? transaction.customer_details : {};

            const orderIdForLookup = transaction.id;

            if (!originalPayload.callback_url && !originalPayload.webhook_url) {
                const apiLogRes = await query(
                    `SELECT request_payload FROM api_logs WHERE endpoint = 'create-order' AND (metadata->>'order_id' = $1 OR request_payload->>'orderId' = $1) ORDER BY created_at DESC LIMIT 1`,
                    [String(orderIdForLookup)]
                );
                const apiLog = apiLogRes.rows[0];

                if (apiLog && apiLog.request_payload) {
                    originalPayload = { ...apiLog.request_payload, ...originalPayload };
                }
            }

            if (originalPayload.reference_id) referenceId = originalPayload.reference_id;
            if (originalPayload.callback_url) webhookUrl = originalPayload.callback_url;
            else if (originalPayload.callbackUrl) webhookUrl = originalPayload.callbackUrl;
            else if (originalPayload.webhook_url) webhookUrl = originalPayload.webhook_url;
            else if (originalPayload.webhookUrl) webhookUrl = originalPayload.webhookUrl;

            if (!webhookUrl) {
                webhookUrl = 'https://dashboard.sharkfunded.com/sharkpaycallbackrespo';
            }

            if (webhookUrl) {
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

                try {
                    await query(
                        `INSERT INTO api_logs (endpoint, request_payload, metadata) VALUES ($1, $2, $3)`,
                        [
                            'webhook-outbound',
                            JSON.stringify(payload),
                            JSON.stringify({ target_url: webhookUrl, order_id: orderId, utr, reference_id: referenceId })
                        ]
                    );
                } catch (logError) {
                    console.error('Failed to log outgoing webhook:', logError);
                }

                try {
                    await sendMerchantWebhook(webhookUrl, payload as any);
                    console.log('✅ Webhook sent and finished.');
                } catch (webhookError) {
                    console.error('⚠️ Webhook failed, but Order is Verified.', webhookError);
                }
            }
        }

        return NextResponse.json({ success: true, message: 'Status updated successfully', data: transaction });

    } catch (error) {
        console.error('Admin API Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
