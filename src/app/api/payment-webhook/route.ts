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

        if (utrMatch) {
            const utr = utrMatch[0];
            const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : 0;

            console.log(`Extracted Payment: UTR=${utr}, Amount=${amount}, From=${from}`);

            // Persist to Supabase
            const { error } = await supabase
                .from('webhook_logs')
                .insert([{
                    utr,
                    amount,
                    sender: from,
                    raw_text: text,
                    payload: body
                }]);

            if (error) {
                console.error('Error saving webhook to Supabase:', error);
                // We still return success to the Android app so it doesn't retry endlessly
                return NextResponse.json({ success: true, message: 'Payment processed but db error' });
            }

            return NextResponse.json({ success: true, message: 'Payment logged to database' });
        }

        console.log('Could not extract UTR from SMS:', text);
        return NextResponse.json({ success: false, message: 'No UTR found in SMS' });
    } catch (error) {
        console.error('Webhook API Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
