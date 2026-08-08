import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAdminUser } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const user = await getAdminUser();
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const statsQuery = `
            SELECT
                COALESCE(SUM(CASE WHEN status = 'verified' THEN amount ELSE 0 END), 0) AS "totalRevenue",
                COUNT(*) AS "totalPayments",
                COUNT(CASE WHEN status = 'verified' THEN 1 END) AS "approvedCount",
                COUNT(CASE WHEN status IN ('pending', 'pending_payment', 'pending_manual_verification') THEN 1 END) AS "pendingCount",
                COUNT(CASE WHEN status = 'failed' THEN 1 END) AS "failedCount",
                COUNT(CASE WHEN status = 'rejected' THEN 1 END) AS "rejectedCount",
                COUNT(CASE WHEN status = 'expired' THEN 1 END) AS "expiredCount",
                COUNT(DISTINCT NULLIF(customer_details->>'email', '')) AS "totalUsers",
                COUNT(CASE WHEN created_at >= CURRENT_DATE THEN 1 END) AS "todayCount",
                COUNT(CASE WHEN created_at >= CURRENT_DATE AND status = 'verified' THEN 1 END) AS "todayApprovedCount",
                COUNT(CASE WHEN created_at >= CURRENT_DATE AND status = 'rejected' THEN 1 END) AS "todayRejectedCount",
                COALESCE(SUM(CASE WHEN created_at >= CURRENT_DATE AND status = 'verified' THEN amount ELSE 0 END), 0) AS "todayVolume"
            FROM transactions
        `;

        const statsRes = await query(statsQuery);
        const statsRow = statsRes.rows[0] || {};

        const statsData = {
            totalRevenue: Number(statsRow.totalRevenue || 0),
            totalPayments: Number(statsRow.totalPayments || 0),
            approvedCount: Number(statsRow.approvedCount || 0),
            pendingCount: Number(statsRow.pendingCount || 0),
            failedCount: Number(statsRow.failedCount || 0),
            rejectedCount: Number(statsRow.rejectedCount || 0),
            expiredCount: Number(statsRow.expiredCount || 0),
            totalUsers: Number(statsRow.totalUsers || 0),
            todayCount: Number(statsRow.todayCount || 0),
            todayApprovedCount: Number(statsRow.todayApprovedCount || 0),
            todayRejectedCount: Number(statsRow.todayRejectedCount || 0),
            todayVolume: Number(statsRow.todayVolume || 0)
        };

        const recentRes = await query(`SELECT * FROM transactions ORDER BY created_at DESC LIMIT 5`);

        return NextResponse.json({
            success: true,
            stats: statsData,
            recentTransactions: recentRes.rows
        });
    } catch (error: any) {
        console.error('Dashboard stats error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
