import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const payload = await request.json();

        // Log the received webhook
        await supabase.from('api_logs').insert({
            endpoint: 'webhook-received',
            request_payload: payload,
            metadata: { source: 'sharkpaycallbackrespo' }
        });

        return NextResponse.json({ success: true, message: 'Webhook received' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error processing webhook' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const queryParams = Object.fromEntries(searchParams.entries());

        // Log the received GET callback
        await supabase.from('api_logs').insert({
            endpoint: 'webhook-received-get',
            request_payload: queryParams,
            metadata: { source: 'sharkpaycallbackrespo' }
        });

        return NextResponse.json({ success: true, message: 'Callback received' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error processing callback' }, { status: 500 });
    }
}
