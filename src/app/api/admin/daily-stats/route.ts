import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabase';
import { getAdminUser } from '@/lib/adminAuth';

export async function POST(request: Request) {
    try {
        const user = await getAdminUser();
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { startDate, endDate } = await request.json().catch(() => ({}));

        let query = supabase
            .from('transactions')
            .select('created_at, amount, status');

        if (startDate) {
            query = query.gte('created_at', startDate);
        } else {
            const d = new Date();
            d.setDate(d.getDate() - 90);
            query = query.gte('created_at', d.toISOString());
        }

        if (endDate) {
            query = query.lte('created_at', endDate);
        }

        const { data: transactions, error } = await query;

        if (error) throw error;

        const dailyStats: Record<string, { totalAmount: number; count: number; verifiedCount: number }> = {};

        transactions.forEach((txn: any) => {
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
