import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const payload = await request.json();

        await query(
            `INSERT INTO api_logs (endpoint, request_payload, metadata) VALUES ($1, $2, $3)`,
            ['webhook-received', JSON.stringify(payload), JSON.stringify({ source: 'sharkpaycallbackrespo' })]
        );

        return NextResponse.json({ success: true, message: 'Webhook received' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error processing webhook' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const queryParams = Object.fromEntries(searchParams.entries());

        await query(
            `INSERT INTO api_logs (endpoint, request_payload, metadata) VALUES ($1, $2, $3)`,
            ['webhook-received-get', JSON.stringify(queryParams), JSON.stringify({ source: 'sharkpaycallbackrespo' })]
        );

        return NextResponse.json({ success: true, message: 'Callback received' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error processing callback' }, { status: 500 });
    }
}
