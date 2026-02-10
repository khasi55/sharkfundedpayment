import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabase';
import { getAdminUser } from '@/lib/adminAuth';

export async function POST(request: Request) {
    try {
        const user = await getAdminUser();
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        // Only fetch verified/confirmed transactions
        const { data: transactions, error } = await supabase
            .from('transactions')
            .select('amount, merchant_upi_id, status')
            .eq('status', 'verified');

        if (error) throw error;

        const stats: Record<string, { totalAmount: number; count: number }> = {};

        transactions.forEach((txn: any) => {
            // Normalize UPI ID (handle nulls)
            const upiId = txn.merchant_upi_id || 'Unknown';

            if (!stats[upiId]) {
                stats[upiId] = { totalAmount: 0, count: 0 };
            }

            // Count only verified/confirmed transactions
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
