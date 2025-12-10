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
});

export async function POST(request: Request) {
    try {
        // Rate Limiting
        const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
        // increased from 10 to 60 to allow polling (e.g. every 5s = 12/min)
        const rateLimit = await checkRateLimit(ip, 'verify-payment', 60, 60);

        if (!rateLimit.success) {
            return NextResponse.json(
                { success: false, message: 'Too many requests. Please try again later.' },
                { status: 429, headers: { 'Content-Type': 'application/json' } }
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

        const { utr, amount, orderId, email, name } = validation.data;
        const amountStr = String(amount);



        // Helper to send email
        const handleEmailSending = async (transaction: any) => {
            console.log('--- Email Handle Start ---');
            console.log('Transaction Data:', {
                providedEmail: email,
                txEmail: transaction?.customer_details?.email,
                utr: utr
            });

            const recipientEmail = email || transaction?.customer_details?.email;
            const recipientName = name || transaction?.customer_details?.name || 'Customer';
            const orderIdentifier = orderId || transaction?.order_id || transaction?.session_id || 'N/A';

            console.log('Resolved Recipient:', recipientEmail);

            if (recipientEmail) {
                console.log(`Sending email to ${recipientEmail} for Order ${orderIdentifier}`);
                try {
                    const result = await sendPaymentSuccessEmail({
                        to: recipientEmail,
                        name: recipientName,
                        amount: amountStr,
                        orderId: orderIdentifier,
                        utr: utr,
                        date: new Date().toLocaleString()
                    });
                    console.log('Email Result:', result);
                } catch (emailErr) {
                    console.error('FATAL EMAIL ERROR:', emailErr);
                }
            } else {
                console.log(`No email found for UTR ${utr}, skipping email.`);
            }
            console.log('--- Email Handle End ---');
        };

        const handleWebhookTrigger = async (transaction: any, status: 'verified' | 'failed') => {
            // ONLY send POST if webhook_url is provided. 
            // DO NOT send to callback_url to avoid 405 Method Not Allowed errors on frontend-only URLs.
            const webhookUrl = transaction?.customer_details?.webhook_url;

            if (!webhookUrl) {
                console.log('No webhook_url found in transaction, skipping server-to-server POST.');
                return;
            }

            const payload = {
                event: status === 'verified' ? 'payment.success' : 'payment.failed',
                orderId: transaction?.order_id || orderId || 'N/A',
                reference_id: transaction?.customer_details?.reference_id,
                utr: utr,
                amount: transaction?.amount || amountStr,
                status: status,
                timestamp: new Date().toISOString()
            };

            await sendMerchantWebhook(webhookUrl, payload as any);
        };

        // 1. Check Supabase Webhook Logs
        const { data: foundPayment, error } = await supabase
            .from('webhook_logs')
            .select('*')
            .eq('utr', utr)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error && error.code !== 'NONE') { // NONE means no rows found
            console.error('Supabase error during verification:', error);
        }

        if (foundPayment) {
            // Check amount (allow small difference)
            if (parseFloat(foundPayment.amount) === parseFloat(amountStr)) {


                // Fetch transaction details if needed (mostly for fallback if email not provided)
                const { data: transaction } = await supabase
                    .from('transactions')
                    .select('*')
                    .eq('utr', utr)
                    .single();

                await handleEmailSending(transaction);
                await handleWebhookTrigger(transaction, 'verified');

                return NextResponse.json({
                    success: true,
                    message: 'Payment verified',
                    data: transaction
                });
            } else {
                console.log(`Amount mismatch for UTR ${utr}. Logged: ${foundPayment.amount}, Requested: ${amountStr}`);

                // Record failure
                // Record failure
                // FIX: Use orderId (UUID) to find the transaction, as UTR might be a placeholder
                if (orderId) {
                    const failureReason = `Amount mismatch. Received: ${foundPayment.amount}, Expected: ${amountStr}`;
                    const { data: tx } = await supabase.from('transactions').select('customer_details').eq('id', orderId).single();
                    if (tx) {
                        const newDetails = {
                            ...tx.customer_details,
                            failure_reason: failureReason,
                            failed_attempt_utr: utr
                        };
                        await supabase.from('transactions').update({ status: 'failed', customer_details: newDetails }).eq('id', orderId);
                        // Trigger failed callback (webhook style)
                        await handleWebhookTrigger({ ...tx, amount: foundPayment.amount, order_id: 'N/A' }, 'failed');
                    }
                }

                return NextResponse.json({
                    success: false,
                    message: `Amount mismatch. We received Rs. ${foundPayment.amount} but you are verifying for Rs. ${amountStr}. Please check the amount.`
                });
            }
        } else {
            console.log(`No webhook log found for UTR ${utr}`);
        }

        // Mock Logic
        if (utr.startsWith('TEST')) {
            const mockTransaction = {
                id: 'mock-id',
                utr,
                amount: amountStr,
                status: 'verified',
                order_id: orderId,
                customer_details: { email, name }
            };

            await handleEmailSending(mockTransaction);
            await handleWebhookTrigger(mockTransaction, 'verified');

            return NextResponse.json({
                success: true,
                message: 'Payment verified (MOCKED)',
                data: { utr, amount, status: 'verified' }
            });
        }

        if (orderId) {
            if (orderId) {
                const failureReason = 'Payment not found in webhook logs during verification.';
                // FIX: Use 'id' not 'order_id' because orderId variable is the UUID
                const { data: tx } = await supabase.from('transactions').select('customer_details').eq('id', orderId).single();
                if (tx) {
                    const newDetails = {
                        ...tx.customer_details,
                        failure_reason: failureReason,
                        failed_attempt_utr: utr
                    };
                    await supabase.from('transactions').update({ status: 'failed', customer_details: newDetails }).eq('id', orderId);
                }
            }
        }

        return NextResponse.json({ success: false, message: 'Payment not found yet. Order Cancelled.' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}

