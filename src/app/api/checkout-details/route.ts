import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const orderId = url.searchParams.get('orderId');

        if (!orderId) {
            return NextResponse.json({ success: false, message: 'Order ID is required' }, { status: 400 });
        }

        const res = await query(
            `SELECT * FROM transactions WHERE id::text = $1 OR session_id = $1 OR order_id = $1 LIMIT 1`,
            [orderId]
        );
        const data = res.rows[0];

        if (!data) {
            return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: {
                id: data.id,
                amount: data.amount,
                status: data.status,
                customer_details: data.customer_details,
                merchant_upi_id: data.merchant_upi_id,
                created_at: data.created_at,
                utr: data.utr,
                order_id: data.order_id
            }
        });
    } catch (error: any) {
        try {
            const logPath = path.join(process.cwd(), 'api-error.log');
            const logEntry = `\n[${new Date().toISOString()}] 500 Error: ${error.message}\nStack: ${error.stack}\n`;
            fs.appendFileSync(logPath, logEntry);
        } catch (logErr) {
            console.error('Failed to log to file:', logErr);
        }

        console.error('CRITICAL: checkout-details API Error:', error);
        return NextResponse.json({
            success: false,
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}
