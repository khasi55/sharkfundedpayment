import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAdminUser } from '@/lib/adminAuth';

export async function POST(request: Request) {
    try {
        const user = await getAdminUser();
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const res = await query(
            `SELECT amount, merchant_upi_id, status FROM transactions WHERE status = 'verified'`
        );

        const stats: Record<string, { totalAmount: number; count: number }> = {};

        res.rows.forEach((txn: any) => {
            const upiId = txn.merchant_upi_id || 'Unknown';

            if (!stats[upiId]) {
                stats[upiId] = { totalAmount: 0, count: 0 };
            }

            stats[upiId].count += 1;
            stats[upiId].totalAmount += Number(txn.amount);
        });

        const formattedStats = Object.entries(stats).map(([upiId, data]) => ({
            upiId,
            totalAmount: data.totalAmount,
            count: data.count
        }));

        return NextResponse.json({ success: true, stats: formattedStats });

    } catch (error: any) {
        console.error('Error fetching bank stats:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
