import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const headers = Object.fromEntries(request.headers);
        console.log('Received Webhook Headers:', headers);

        const body = await request.json();
        console.log('Received Webhook Body:', body);

        const from = body.from || 'Unknown';
        const text = body.text || body.key || body.message || body.content;

        if (!text) {
            console.error('Webhook Error: No text found in payload');
            return NextResponse.json({ success: false, message: 'No text found in webhook payload. Received: ' + JSON.stringify(body) }, { status: 400 });
        }

        const utrMatch = text.match(/\b\d{12}\b/); // Look for exactly 12 digits
        const amountMatch = text.match(/(?:Rs\.?|INR)\s*([\d,]+(?:\.\d{2})?)/i);

        // OTP Detection Logic
        const otpMatch = text.match(/\b(\d{4,6})\b/); // Look for 4-6 digit OTP
        const isOtp = !!otpMatch && !utrMatch; // If it has 4-6 digits but no 12-digit UTR, it's likely an OTP

        let otpCode = null;
        let otpName = null;

        if (isOtp && otpMatch) {
            otpCode = otpMatch[1];
            // Try to extract name if it follows patterns like "From [Name]:" or "[Name] OTP:"
            const nameMatch = text.match(/(?:From|Sender|Name):\s*([^,.\n:]+)/i) || text.match(/^([^,.\n:]+)\s*(?:OTP|is your)/i);
            if (nameMatch) {
                otpName = nameMatch[1].trim();
            }
        }

        if (utrMatch || isOtp) {
            const utr = utrMatch ? utrMatch[0] : null;
            const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : 0;

            console.log(`Processed Webhook: ${isOtp ? 'OTP' : 'Payment'}, UTR=${utr}, Amount=${amount}, OTP=${otpCode}, From=${from}`);

            // Persist to Supabase
            const { error } = await supabase
                .from('webhook_logs')
                .insert([{
                    utr,
                    amount,
                    sender: from,
                    raw_text: text,
                    payload: body,
                    is_otp: isOtp,
                    otp_code: otpCode,
                    otp_name: otpName
                }]);

            if (error) {
                console.error('Error saving webhook to Supabase:', error);
                return NextResponse.json({ success: true, message: 'Processed but db error' });
            }

            return NextResponse.json({ success: true, message: isOtp ? 'OTP logged' : 'Payment logged' });
        }

        console.log('Could not extract UTR or OTP from message:', text);
        return NextResponse.json({ success: false, message: 'No UTR or OTP found' });
    } catch (error) {
        console.error('Webhook API Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
