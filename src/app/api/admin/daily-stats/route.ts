import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        // Get start/end date from body if needed, or default to current month/last 30 days
        // For a full calendar, we usually need the data for the currently displayed month.
        // Let's simplified and fetch last 60 days to cover relevant history or accept a range.

        const { startDate, endDate } = await request.json().catch(() => ({}));

        let query = supabase
            .from('transactions')
            .select('created_at, amount, status');

        if (startDate) {
            query = query.gte('created_at', startDate);
        } else {
            // Default to last 90 days if not specified
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

        // Convert to array
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
