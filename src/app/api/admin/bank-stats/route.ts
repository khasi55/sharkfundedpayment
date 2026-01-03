import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const { data: transactions, error } = await supabase
            .from('transactions')
            .select('amount, merchant_upi_id, status');

        if (error) throw error;

        const stats: Record<string, { totalAmount: number; count: number }> = {};

        transactions.forEach((txn: any) => {
            // Normalize UPI ID (handle nulls)
            const upiId = txn.merchant_upi_id || 'Unknown';

            if (!stats[upiId]) {
                stats[upiId] = { totalAmount: 0, count: 0 };
            }

            // Only count verified transactions for amount ?? 
            // Usually stats show "verified" volume. Let's do verified only for volume, but maybe total count for count?
            // "total transction volume and count"
            // Let's count everything but maybe mostly care about verified for money.
            // Let's simplify: Total Verified Volume, Total Verified Count, Total Attempted Count.

            stats[upiId].count += 1;

            if (txn.status === 'verified') {
                stats[upiId].totalAmount += Number(txn.amount);
            }
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
