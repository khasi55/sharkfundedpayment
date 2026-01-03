import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendPaymentSuccessEmail } from '@/utils/email';
import { sendMerchantWebhook } from '@/utils/webhooks';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/rateLimit';

const VerifyPaymentSchema = z.object({
    utr: z.string().min(1, 'UTR is required'),
    amount: z.union([z.string(), z.number()]),
    orderId: z.string().optional(),
    email: z.string().email().optional().or(z.literal('')),
    name: z.string().optional(),
    merchantUpiId: z.string().optional(),
});

export async function POST(request: Request) {
    try {
        console.log("--- VERIFY PAYMENT API V2 HIT ---");

        const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
        const rateLimit = await checkRateLimit(ip, 'verify-payment', 60, 60);

        if (!rateLimit.success) {
            return NextResponse.json(
                { success: false, message: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const body = await request.json();
        const validation = VerifyPaymentSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { success: false, message: 'Validation Error', errors: validation.error.format() },
                { status: 400 }
            );
        }

        const { utr, amount, orderId, email, name, merchantUpiId } = validation.data;
        const amountStr = String(amount);

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
                return NextResponse.json(
                    { success: false, message: 'Invalid amount data.' },
                    { status: 400 }
                );
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

                // Update transaction with merchant_upi_id if available
                if (transaction && merchantUpiId) {
                    await supabase
                        .from('transactions')
                        .update({ merchant_upi_id: merchantUpiId })
                        .eq('id', transaction.id);

                    transaction.merchant_upi_id = merchantUpiId;
                }

                await handleEmailSending(transaction);
                await handleWebhookTrigger(transaction, 'verified');

                return NextResponse.json({
                    success: true,
                    message: 'Payment verified',
                    data: transaction
                });
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

                return NextResponse.json({
                    success: false,
                    message: `Amount mismatch. Received Rs. ${paidAmount}, expected Rs. ${requestedAmount}`
                });
            }
        }

        if (utr.startsWith('TEST')) {
            const mockTransaction = {
                id: 'mock-id',
                utr,
                amount: amountStr,
                status: 'verified',
                order_id: orderId,
                customer_details: { email, name },
                merchant_upi_id: merchantUpiId
            };

            await handleEmailSending(mockTransaction);
            await handleWebhookTrigger(mockTransaction, 'verified');

            return NextResponse.json({
                success: true,
                message: 'Payment verified (MOCKED)',
                data: { utr, amount, status: 'verified', merchant_upi_id: merchantUpiId }
            });
        }

        // If no webhook log found yet, update the transaction with the UTR so admin can see "Checking UTR: ..."
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
                        merchant_upi_id: merchantUpiId
                    })
                    .eq('id', orderId);
            } else {
                // Fallback update if read fails (shouldn't happen)
                await supabase
                    .from('transactions')
                    .update({ utr: utr, status: 'pending_payment', merchant_upi_id: merchantUpiId })
                    .eq('id', orderId);
            }
        }

        // Return false to keep polling
        return NextResponse.json({ success: false, message: 'Payment not found yet. Keep polling.' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
