import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
    try {
        const start = Date.now();

        // 1. Check Database Connection & Latency
        const { data: dbTest, error: dbError } = await supabase.from('transactions').select('count').limit(1).single();
        const dbLatency = Date.now() - start;

        if (dbError) {
            throw new Error(`Database Error: ${dbError.message}`);
        }

        // 2. Check Last Webhook Activity (to see if we are receiving payments)
        const { data: lastWebhook, error: webhookError } = await supabase
            .from('webhook_logs')
            .select('created_at')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        // 3. Check Last Transaction
        const { data: lastTxn, error: txnError } = await supabase
            .from('transactions')
            .select('created_at')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        // 4. Calculate Success Rate (Last 50 transactions)
        const { data: recentTxns } = await supabase
            .from('transactions')
            .select('status')
            .order('created_at', { ascending: false })
            .limit(50);

        const successCount = recentTxns?.filter(t => t.status === 'verified').length || 0;
        const totalCount = recentTxns?.length || 1;
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
                    last_transaction: lastTxn?.created_at || 'Never'
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
