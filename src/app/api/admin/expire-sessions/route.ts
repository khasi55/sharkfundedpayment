import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        // Calculate the timestamp 15 minutes ago
        // Using 20 minutes to be safe and give users a grace period
        const graceThreshold = new Date(Date.now() - 20 * 60 * 1000).toISOString();

        // Update transactions that are 'pending_payment' AND older than threshold
        const { data, error, count } = await supabase
            .from('transactions')
            .update({ status: 'expired' })
            .eq('status', 'pending_payment')
            .lt('created_at', graceThreshold)
            .select('id', { count: 'exact' });

        if (error) {
            console.error('Error expiring sessions:', error);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        if (count && count > 0) {
            console.log(`[Auto-Expire] Cleaned up ${count} abandoned sessions.`);
        }

        return NextResponse.json({
            success: true,
            expiredCount: count,
            message: `Successfully expired ${count} abandoned sessions.`
        });

    } catch (error: any) {
        console.error('API Error expiring sessions:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
