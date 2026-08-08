import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    try {
        const start = Date.now();

        // 1. Check Database Connection & Latency
        await query('SELECT 1');
        const dbLatency = Date.now() - start;

        // 2. Check Last Webhook Activity
        const lastWebhookRes = await query(`SELECT created_at FROM webhook_logs ORDER BY created_at DESC LIMIT 1`);
        const lastWebhook = lastWebhookRes.rows[0];

        // 3. Check Last Transaction
        const lastTxnRes = await query(`SELECT created_at FROM transactions ORDER BY created_at DESC LIMIT 1`);
        const lastTxn = lastTxnRes.rows[0];

        // 4. Check Last SMS (OTP Webhook)
        const lastSmsRes = await query(`SELECT created_at FROM webhook_logs WHERE is_otp = true ORDER BY created_at DESC LIMIT 1`);
        const lastSms = lastSmsRes.rows[0];

        // 5. Calculate Success Rate (Last 50 transactions)
        const recentTxnsRes = await query(`SELECT status FROM transactions ORDER BY created_at DESC LIMIT 50`);
        const recentTxns = recentTxnsRes.rows;

        const successCount = recentTxns.filter(t => t.status === 'verified').length;
        const totalCount = recentTxns.length || 1;
        const successRate = totalCount > 0 ? ((successCount / totalCount) * 100).toFixed(1) : '0.0';

        return NextResponse.json({
            status: 'operational',
            checks: {
                database: {
                    status: 'connected',
                    latency: `${dbLatency}ms`
                },
                payments: {
                    last_webhook: lastWebhook?.created_at || 'Never',
                    last_transaction: lastTxn?.created_at || 'Never',
                    last_sms: lastSms?.created_at || 'Never'
                },
                metrics: {
                    success_rate: successRate
                }
            },
            timestamp: new Date().toISOString()
        });

    } catch (error: any) {
        return NextResponse.json({
            status: 'down',
            message: error.message,
            location: 'Database Connection Pool (src/app/api/system-status/route.ts)',
            stack: error.stack,
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}
