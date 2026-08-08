import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { sendPaymentSuccessEmail } from '@/utils/email';
import { sendMerchantWebhook } from '@/utils/webhooks';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/rateLimit';
import { UPI_CONFIGS } from '@/config/upiConfig';

const VerifyPaymentSchema = z.object({
    utr: z.string().min(1, 'UTR is required'),
    amount: z.union([z.string(), z.number()]),
    orderId: z.string().optional(),
    email: z.string().email().optional().or(z.literal('')),
    name: z.string().optional(),
    merchantUpiId: z.string().optional(),
});

export async function POST(request: Request) {
    let body: any = null;
    let ip = '127.0.0.1';

    const logResponse = async (statusCode: number, responseBody: any, metadata: any = {}) => {
        try {
            await query(
                `INSERT INTO api_logs (endpoint, ip_address, request_payload, response_payload, status_code, metadata)
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [
                    'verify-payment',
                    ip,
                    JSON.stringify(body),
                    JSON.stringify(responseBody),
                    statusCode,
                    JSON.stringify({
                        ...metadata,
                        utr: body?.utr || metadata?.utr,
                        order_id: body?.orderId || metadata?.order_id
                    })
                ]
            );
        } catch (err) {
            console.error('[Logging Error] Failed to write API log:', err);
        }
    };

    try {
        console.log("--- VERIFY PAYMENT API V2 HIT ---");

        ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
        const rateLimit = await checkRateLimit(ip, 'verify-payment', 60, 60);

        if (!rateLimit.success) {
            const resBody = { success: false, message: 'Too many requests. Please try again later.' };
            await logResponse(429, resBody, { rate_limit: true });
            return NextResponse.json(resBody, { status: 429 });
        }

        try {
            body = await request.json();
        } catch (e) {
            const resBody = { success: false, message: 'Invalid JSON payload' };
            await logResponse(400, resBody, { error: 'Invalid JSON' });
            return NextResponse.json(resBody, { status: 400 });
        }

        const validation = VerifyPaymentSchema.safeParse(body);

        if (!validation.success) {
            const resBody = { success: false, message: 'Validation Error', errors: validation.error.format() };
            await logResponse(400, resBody);
            return NextResponse.json(resBody, { status: 400 });
        }

        const { utr, amount, orderId, email, name, merchantUpiId } = validation.data;
        const amountStr = String(amount);

        // [SECURITY] Check if this UTR has already been successfully verified for another transaction
        const duplicateCheck = await query(
            `SELECT id, order_id FROM transactions WHERE utr = $1 AND status = 'verified' AND id::text != $2 LIMIT 1`,
            [utr, orderId || '']
        );
        const duplicateVerification = duplicateCheck.rows[0];

        if (duplicateVerification) {
            console.warn(`[Security Alert] Reused UTR Attempt. UTR: ${utr}, Current Order: ${orderId}, Existing Order: ${duplicateVerification.id || duplicateVerification.order_id}`);
            const resBody = {
                success: false,
                message: 'This UTR has already been verified for another transaction. Duplicate use is blocked.'
            };
            await logResponse(400, resBody, { duplicate_check: duplicateVerification });
            return NextResponse.json(resBody, { status: 400 });
        }

        // [SECURITY] Terminal State Guard - Prevent customers from overriding admin decisions or duplicate updates
        if (orderId) {
            const existingTxRes = await query(`SELECT * FROM transactions WHERE id::text = $1 OR session_id = $1 LIMIT 1`, [orderId]);
            const existingTx = existingTxRes.rows[0];

            if (existingTx) {
                if (existingTx.status === 'verified') {
                    console.log(`[VerifyPayment] Transaction ${orderId} is already verified. Returning success directly.`);
                    const resBody = {
                        success: true,
                        message: 'Payment already verified',
                        data: existingTx
                    };
                    await logResponse(200, resBody, { check_type: 'order_id_verified' });
                    return NextResponse.json(resBody);
                }
                if (existingTx.status === 'rejected') {
                    console.log(`[VerifyPayment] Transaction ${orderId} has been rejected by administration. Blocking verify.`);
                    const resBody = {
                        success: false,
                        message: 'This payment verification request has been rejected by administration. Please contact support.'
                    };
                    await logResponse(400, resBody, { check_type: 'order_id_rejected' });
                    return NextResponse.json(resBody, { status: 400 });
                }
                if (existingTx.status === 'expired' || existingTx.status === 'cancelled') {
                    console.log(`[VerifyPayment] Transaction ${orderId} is ${existingTx.status}. Blocking verify.`);
                    const resBody = {
                        success: false,
                        message: `This checkout session has ${existingTx.status === 'expired' ? 'expired' : 'been cancelled'}.`
                    };
                    await logResponse(400, resBody, { check_type: `order_id_${existingTx.status}` });
                    return NextResponse.json(resBody, { status: 400 });
                }
            }
        } else {
            // Check by UTR if orderId is missing
            const existingTxRes = await query(`SELECT * FROM transactions WHERE utr = $1 LIMIT 1`, [utr]);
            const existingTx = existingTxRes.rows[0];

            if (existingTx) {
                if (existingTx.status === 'verified') {
                    const resBody = {
                        success: true,
                        message: 'Payment already verified',
                        data: existingTx
                    };
                    await logResponse(200, resBody, { check_type: 'utr_verified' });
                    return NextResponse.json(resBody);
                }
                if (existingTx.status === 'rejected') {
                    const resBody = {
                        success: false,
                        message: 'This payment verification request has been rejected by administration. Please contact support.'
                    };
                    await logResponse(400, resBody, { check_type: 'utr_rejected' });
                    return NextResponse.json(resBody, { status: 400 });
                }
                if (existingTx.status === 'expired' || existingTx.status === 'cancelled') {
                    const resBody = {
                        success: false,
                        message: `This checkout session has ${existingTx.status === 'expired' ? 'expired' : 'been cancelled'}.`
                    };
                    await logResponse(400, resBody, { check_type: `utr_${existingTx.status}` });
                    return NextResponse.json(resBody, { status: 400 });
                }
            }
        }

        const handleEmailSending = async (transaction: any) => {
            const recipientEmail = email || transaction?.customer_details?.email;
            const recipientName = name || transaction?.customer_details?.name || 'Customer';
            const orderIdentifier = orderId || transaction?.order_id || 'N/A';

            if (recipientEmail) {
                await sendPaymentSuccessEmail({
                    to: recipientEmail,
                    name: recipientName,
                    amount: amountStr,
                    orderId: orderIdentifier,
                    utr,
                    date: new Date().toLocaleString()
                });
            }
        };

        const handleWebhookTrigger = async (transaction: any, status: 'verified' | 'failed') => {
            let targetUrl =
                transaction?.customer_details?.webhook_url ||
                transaction?.customer_details?.callback_url ||
                'https://dashboard.sharkfunded.com/sharkpaycallbackrespo';

            const payload = {
                event: status === 'verified' ? 'payment.success' : 'payment.failed',
                orderId: transaction?.order_id || orderId || 'N/A',
                reference_id: transaction?.customer_details?.reference_id,
                utr,
                amount: transaction?.amount || amountStr,
                status,
                merchant_upi_id: merchantUpiId,
                timestamp: new Date().toISOString()
            };

            try {
                await sendMerchantWebhook(targetUrl, payload as any);
            } catch (err) {
                console.error('Webhook POST failed:', err);
            }
        };

        const webhookRes = await query(`SELECT * FROM webhook_logs WHERE utr = $1 ORDER BY created_at DESC LIMIT 1`, [utr]);
        const foundPayment = webhookRes.rows[0];

        if (foundPayment) {
            const paidAmount = Number(foundPayment.amount);
            const requestedAmount = Number(amountStr);

            if (!Number.isFinite(paidAmount) || !Number.isFinite(requestedAmount)) {
                const resBody = { success: false, message: 'Invalid amount data.' };
                await logResponse(400, resBody);
                return NextResponse.json(resBody, { status: 400 });
            }

            if (paidAmount >= (requestedAmount - 5)) {
                let transaction = null;

                if (orderId) {
                    const txRes = await query(`SELECT * FROM transactions WHERE id::text = $1 OR session_id = $1 LIMIT 1`, [orderId]);
                    transaction = txRes.rows[0];
                }

                if (!transaction) {
                    const txRes = await query(`SELECT * FROM transactions WHERE utr = $1 LIMIT 1`, [utr]);
                    transaction = txRes.rows[0];
                }

                if (transaction) {
                    const updateRes = await query(
                        `UPDATE transactions SET status = 'verified', utr = $1, merchant_upi_id = COALESCE($2, merchant_upi_id) WHERE id = $3 RETURNING *`,
                        [utr, merchantUpiId || null, transaction.id]
                    );
                    if (updateRes.rows.length > 0) {
                        transaction = updateRes.rows[0];
                    }
                } else {
                    const insertRes = await query(
                        `INSERT INTO transactions (amount, utr, session_id, status, customer_details, merchant_upi_id)
                         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                        [
                            requestedAmount,
                            utr,
                            orderId || null,
                            'verified',
                            JSON.stringify({ name: name || 'Customer', email: email || '' }),
                            merchantUpiId || null
                        ]
                    );
                    if (insertRes.rows.length > 0) {
                        transaction = insertRes.rows[0];
                    }
                }

                await handleEmailSending(transaction);
                await handleWebhookTrigger(transaction, 'verified');

                const resBody = {
                    success: true,
                    message: 'Payment verified',
                    data: transaction
                };
                await logResponse(200, resBody, { verified_success: true });
                return NextResponse.json(resBody);
            } else {
                if (orderId) {
                    const failureReason = `Amount mismatch. Received: ${paidAmount}, Expected: ${requestedAmount}`;
                    const txRes = await query(`SELECT customer_details FROM transactions WHERE id::text = $1 OR session_id = $1 LIMIT 1`, [orderId]);
                    const tx = txRes.rows[0];

                    if (tx) {
                        const newDetails = {
                            ...(tx.customer_details || {}),
                            failure_reason: failureReason,
                            failed_attempt_utr: utr
                        };
                        await query(
                            `UPDATE transactions SET status = 'failed', customer_details = $1, merchant_upi_id = $2 WHERE id::text = $3 OR session_id = $3`,
                            [JSON.stringify(newDetails), merchantUpiId || null, orderId]
                        );

                        await handleWebhookTrigger(
                            { ...tx, amount: paidAmount, order_id: 'N/A' },
                            'failed'
                        );
                    }
                }

                const resBody = {
                    success: false,
                    message: `Amount mismatch. Received Rs. ${paidAmount}, expected Rs. ${requestedAmount}`
                };
                await logResponse(400, resBody, { mismatch_details: { paidAmount, requestedAmount } });
                return NextResponse.json(resBody, { status: 400 });
            }
        }

        let safeMerchantUpiId = merchantUpiId;
        const isUpiValid = UPI_CONFIGS.some(c => c.vpa === merchantUpiId);

        if (!isUpiValid && merchantUpiId) {
            console.log(`[Security Alert] Malicious UPI ID attempt: ${merchantUpiId}. Overriding with default.`);
            safeMerchantUpiId = UPI_CONFIGS[0].vpa;
        }

        if (orderId) {
            const txRes = await query(`SELECT customer_details FROM transactions WHERE id::text = $1 OR session_id = $1 LIMIT 1`, [orderId]);
            const tx = txRes.rows[0];

            if (tx) {
                const newDetails = { ...(tx.customer_details || {}) };
                delete newDetails.failure_reason;
                delete newDetails.failed_attempt_utr;

                await query(
                    `UPDATE transactions SET utr = $1, status = 'pending_payment', customer_details = $2, merchant_upi_id = $3 WHERE id::text = $4 OR session_id = $4`,
                    [utr, JSON.stringify(newDetails), safeMerchantUpiId || null, orderId]
                );
            } else {
                await query(
                    `UPDATE transactions SET utr = $1, status = 'pending_payment', merchant_upi_id = $2 WHERE id::text = $3 OR session_id = $3`,
                    [utr, safeMerchantUpiId || null, orderId]
                );
            }
        }

        const resBody = { success: false, message: 'Payment not found yet. Keep polling.' };
        await logResponse(200, resBody, { polling: true });
        return NextResponse.json(resBody);
    } catch (error: any) {
        console.error('API Error:', error);
        const resBody = { success: false, message: 'Internal Server Error' };
        await logResponse(500, resBody, { error: error?.message || String(error) });
        return NextResponse.json(resBody, { status: 500 });
    }
}
