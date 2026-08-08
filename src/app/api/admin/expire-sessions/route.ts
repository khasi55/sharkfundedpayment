import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAdminUser } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const user = await getAdminUser();
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const graceThreshold = new Date(Date.now() - 20 * 60 * 1000).toISOString();

        const res = await query(
            `UPDATE transactions SET status = 'expired' WHERE status = 'pending_payment' AND created_at < $1 RETURNING id`,
            [graceThreshold]
        );

        const count = res.rowCount || 0;

        if (count > 0) {
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
