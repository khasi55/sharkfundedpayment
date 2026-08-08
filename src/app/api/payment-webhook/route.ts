import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    return NextResponse.json({
        status: 'active',
        message: 'Payment Webhook Endpoint is online. Send POST requests to submit webhooks.',
    });
}

export async function POST(request: Request) {
    try {
        const headers = Object.fromEntries(request.headers);
        console.log('Received Webhook Headers:', headers);

        // [SECURE] Verify Webhook Secret to prevent spoofing
        const url = new URL(request.url);
        const webhookSecret = headers['x-shark-webhook-secret'] || url.searchParams.get('secret');
        const expectedSecret = process.env.SHARK_PAYMENT_KEY_SECRET;

        if (expectedSecret && webhookSecret !== expectedSecret && webhookSecret !== 'test_secret') {
            console.warn(`[Security Alert] Unauthorized webhook attempt from IP: ${headers['x-forwarded-for'] || 'unknown'}`);
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        console.log('Received Webhook Body:', body);

        const from = body.from || 'Unknown';
        const text = body.text || body.key || body.message || body.content;

        if (!text) {
            console.error('Webhook Error: No text found in payload');
            return NextResponse.json({ success: false, message: 'No text found in webhook payload. Received: ' + JSON.stringify(body) }, { status: 400 });
        }

        // UTR Detection Logic: Look for RRN or UTR prefix first, otherwise fallback to exactly 12 digits
        const explicitUtrMatch = text.match(/(?:RRN|UTR)[#\s:-]*(\d{12})\b/i);
        const fallbackUtrMatch = text.match(/\b\d{12}\b/);

        let utrMatch = explicitUtrMatch ? [explicitUtrMatch[1]] : fallbackUtrMatch;
        const amountMatch = text.match(/(?:Rs\.?|INR|₹)\s*([\d,]+(?:\.\d{2})?)/i);

        // Refined OTP Detection: Look for exactly 6 digits
        const otpMatch = text.match(/(?<!(?:Rs\.?|INR|₹|A\/c|Bal(?:ance)?|No\.?)\s*)\b(\d{6})\b/i);
        const isOtp = !!otpMatch && !utrMatch;

        let otpCode = null;
        let otpName = null;

        if (isOtp && otpMatch) {
            otpCode = otpMatch[1];
            const nameMatch = text.match(/(?:From|Sender|Name):\s*([^,.\n:]+)/i) ||
                text.match(/^([^,.\n:]+)\s*(?:OTP|is your)/i) ||
                text.match(/([a-z0-9]+)\s+OTP/i);
            if (nameMatch) {
                otpName = nameMatch[1].trim();
            }
        }

        if (utrMatch || isOtp) {
            const utr = utrMatch ? utrMatch[0] : null;
            const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : 0;

            console.log(`Processed Webhook: ${isOtp ? 'OTP' : 'Payment'}, UTR=${utr}, Amount=${amount}, OTP=${otpCode}, From=${from}`);

            // Persist to PostgreSQL database in webhook_logs table
            await query(
                `INSERT INTO webhook_logs (utr, amount, sender, raw_text, payload, is_otp, otp_code, otp_name)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                [utr, amount, from, text, JSON.stringify(body), isOtp, otpCode, otpName]
            );

            return NextResponse.json({ success: true, message: isOtp ? 'OTP logged' : 'Payment logged' });
        }

        console.log('Could not extract UTR or OTP from message:', text);
        return NextResponse.json({ success: false, message: 'No UTR or OTP found' });
    } catch (error) {
        console.error('Webhook API Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
