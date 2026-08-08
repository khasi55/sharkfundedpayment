import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAdminUser } from '@/lib/adminAuth';

export async function POST(request: Request) {
    try {
        const user = await getAdminUser();
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { startDate, endDate } = await request.json().catch(() => ({}));

        let defaultStartDate = startDate;
        if (!defaultStartDate) {
            const d = new Date();
            d.setDate(d.getDate() - 90);
            defaultStartDate = d.toISOString();
        }

        let sql = `SELECT created_at, amount, status FROM transactions WHERE created_at >= $1`;
        const params: any[] = [defaultStartDate];

        if (endDate) {
            sql += ` AND created_at <= $2`;
            params.push(endDate);
        }

        const res = await query(sql, params);

        const dailyStats: Record<string, { totalAmount: number; count: number; verifiedCount: number }> = {};

        res.rows.forEach((txn: any) => {
            const date = new Date(txn.created_at).toISOString().split('T')[0];

            if (!dailyStats[date]) {
                dailyStats[date] = { totalAmount: 0, count: 0, verifiedCount: 0 };
            }

            dailyStats[date].count += 1;

            if (txn.status === 'verified') {
                dailyStats[date].verifiedCount += 1;
                dailyStats[date].totalAmount += Number(txn.amount);
            }
        });

        const result = Object.entries(dailyStats).map(([date, stats]) => ({
            date,
            ...stats
        }));

        return NextResponse.json({ success: true, stats: result });

    } catch (error: any) {
        console.error('Error fetching daily stats:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
