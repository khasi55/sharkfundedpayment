import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
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
            await supabase.from('api_logs').insert({
                endpoint: 'verify-payment',
                ip_address: ip,
                request_payload: body,
                response_payload: responseBody,
                status_code: statusCode,
                metadata: {
                    ...metadata,
                    utr: body?.utr || metadata?.utr,
                    order_id: body?.orderId || metadata?.order_id
                }
            });
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
        const { data: duplicateVerification } = await supabase
            .from('transactions')
            .select('id, order_id')
            .eq('utr', utr)
            .eq('status', 'verified')
            .neq('id', orderId || '')
            .limit(1)
            .maybeSingle();

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
            const { data: existingTx } = await supabase
                .from('transactions')
                .select('*')
                .eq('id', orderId)
                .maybeSingle();

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
            const { data: existingTx } = await supabase
                .from('transactions')
                .select('*')
                .eq('utr', utr)
                .maybeSingle();

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
                merchant_upi_id: merchantUpiId, // Pass back to merchant
                timestamp: new Date().toISOString()
            };

            try {
                await sendMerchantWebhook(targetUrl, payload as any);
            } catch (err) {
                console.error('Webhook POST failed:', err);
            }
        };

        const { data: foundPayment } = await supabase
            .from('webhook_logs')
            .select('*')
            .eq('utr', utr)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (foundPayment) {
            // Amount Tolerance Logic
            const paidAmount = Number(foundPayment.amount);
            const requestedAmount = Number(amountStr);

            if (!Number.isFinite(paidAmount) || !Number.isFinite(requestedAmount)) {
                const resBody = { success: false, message: 'Invalid amount data.' };
                await logResponse(400, resBody);
                return NextResponse.json(resBody, { status: 400 });
            }

            // Allow overpayment and up to ₹5 underpayment
            if (paidAmount >= (requestedAmount - 5)) {

                let transaction = null;

                if (orderId) {
                    const { data } = await supabase
                        .from('transactions')
                        .select('*')
                        .eq('id', orderId)
                        .maybeSingle();
                    transaction = data;
                }

                if (!transaction) {
                    const { data } = await supabase
                        .from('transactions')
                        .select('*')
                        .eq('utr', utr)
                        .maybeSingle();
                    transaction = data;
                }

                // Update transaction status to verified, utr, and merchant_upi_id on the server
                if (transaction) {
                    const { data: updatedTx, error: updateErr } = await supabase
                        .from('transactions')
                        .update({
                            status: 'verified',
                            utr: utr,
                            merchant_upi_id: merchantUpiId || transaction.merchant_upi_id
                        })
                        .eq('id', transaction.id)
                        .select()
                        .single();

                    if (!updateErr && updatedTx) {
                        transaction = updatedTx;
                    }
                } else {
                    // Create transaction on server if it doesn't exist
                    const { data: insertedTx, error: insertErr } = await supabase
                        .from('transactions')
                        .insert({
                            amount: requestedAmount,
                            utr: utr,
                            session_id: orderId || null,
                            status: 'verified',
                            customer_details: { name: name || 'Customer', email: email || '' },
                            merchant_upi_id: merchantUpiId
                        })
                        .select()
                        .single();

                    if (!insertErr && insertedTx) {
                        transaction = insertedTx;
                    } else if (insertErr && insertErr.code === '23505') {
                        // Handle race condition/duplicate key: fetch existing row
                        const { data: existingData } = await supabase
                            .from('transactions')
                            .select()
                            .eq('utr', utr)
                            .maybeSingle();
                        if (existingData) {
                            transaction = existingData;
                        }
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
                    const { data: tx } = await supabase
                        .from('transactions')
                        .select('customer_details')
                        .eq('id', orderId)
                        .single();

                    if (tx) {
                        await supabase
                            .from('transactions')
                            .update({
                                status: 'failed',
                                customer_details: {
                                    ...tx.customer_details,
                                    failure_reason: failureReason,
                                    failed_attempt_utr: utr
                                },
                                merchant_upi_id: merchantUpiId
                            })
                            .eq('id', orderId);

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


        // [ANTI-HACK] Validate the merchantUpiId against our hardcoded list
        // If the client sends something else (malicious), we override it with our known good one if possible,
        // or just reject the VPA update.
        let safeMerchantUpiId = merchantUpiId;
        const isUpiValid = UPI_CONFIGS.some(c => c.vpa === merchantUpiId);

        if (!isUpiValid && merchantUpiId) {
            console.log(`[Security Alert] Malicious UPI ID attempt: ${merchantUpiId}. Overriding with default.`);
            safeMerchantUpiId = UPI_CONFIGS[0].vpa;
        }

        if (orderId) {
            // Fetch current details to clear any previous failure reason
            const { data: tx } = await supabase.from('transactions').select('customer_details').eq('id', orderId).single();

            if (tx) {
                const newDetails = { ...tx.customer_details };
                // Remove failure flags so Admin Dashboard and Client don't show "Failed" or old reasons
                if (newDetails.failure_reason) delete newDetails.failure_reason;
                if (newDetails.failed_attempt_utr) delete newDetails.failed_attempt_utr;

                await supabase
                    .from('transactions')
                    .update({
                        utr: utr,
                        status: 'pending_payment',
                        customer_details: newDetails,
                        merchant_upi_id: safeMerchantUpiId
                    })
                    .eq('id', orderId);
            } else {
                // Fallback update if read fails (shouldn't happen)
                await supabase
                    .from('transactions')
                    .update({ utr: utr, status: 'pending_payment', merchant_upi_id: safeMerchantUpiId })
                    .eq('id', orderId);
            }
        }

        // Return false to keep polling
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
