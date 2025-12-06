import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendPaymentSuccessEmail } from '@/utils/email';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { utr, amount, orderId, email, name } = body;

        const requestMsg = `Received verification request: UTR=${utr}, Email=${email}`;


        if (!utr || !amount) {
            return NextResponse.json({ success: false, message: 'UTR and Amount are required' }, { status: 400 });
        }



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
                        amount: amount,
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
            if (parseFloat(foundPayment.amount) === parseFloat(amount)) {


                // Fetch transaction details if needed (mostly for fallback if email not provided)
                const { data: transaction } = await supabase
                    .from('transactions')
                    .select('*')
                    .eq('utr', utr)
                    .single();

                await handleEmailSending(transaction);

                return NextResponse.json({
                    success: true,
                    message: 'Payment verified',
                    data: transaction
                });
            } else {

            }
        }

        // Mock Logic
        if (utr.startsWith('TEST')) {
            const mockTransaction = {
                id: 'mock-id',
                utr,
                amount,
                status: 'verified',
                order_id: orderId,
                customer_details: { email, name }
            };

            await handleEmailSending(mockTransaction);

            return NextResponse.json({
                success: true,
                message: 'Payment verified (MOCKED)',
                data: { utr, amount, status: 'verified' }
            });
        }

        return NextResponse.json({ success: false, message: 'Payment not found yet. Order Cancelled.' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}

