import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabase';
import { getAdminUser } from '@/lib/adminAuth';

interface UserFraudStats {
    email: string;
    name: string;
    totalAmount: number;
    verifiedCount: number;
    rejectedCount: number;
    totalCount: number;
    rejectionRate: number;
    isFraudulent: boolean;
}

export async function POST(request: Request) {
    try {
        const user = await getAdminUser();
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        // Fetch all transactions to analyze both verified and rejected by user
        const { data: transactions, error } = await supabase
            .from('transactions')
            .select('amount, customer_details, status');

        if (error) throw error;

        const userStats: Record<string, {
            name: string;
            totalAmount: number;
            verifiedCount: number;
            rejectedCount: number;
            totalCount: number;
        }> = {};

        transactions.forEach((txn: any) => {
            // Get email from customer_details JSONB field
            const email = txn.customer_details?.email || 'unknown@unknown.com';
            const name = txn.customer_details?.name || 'Unknown User';

            if (!userStats[email]) {
                userStats[email] = {
                    name,
                    totalAmount: 0,
                    verifiedCount: 0,
                    rejectedCount: 0,
                    totalCount: 0
                };
            }

            userStats[email].totalCount += 1;

            if (txn.status === 'verified') {
                userStats[email].verifiedCount += 1;
                userStats[email].totalAmount += Number(txn.amount);
            } else if (txn.status === 'rejected' || txn.status === 'failed') {
                userStats[email].rejectedCount += 1;
            }
        });

        // Format stats with fraud detection
        const formattedStats: UserFraudStats[] = Object.entries(userStats).map(([email, data]) => {
            const rejectionRate = data.totalCount > 0
                ? (data.rejectedCount / data.totalCount) * 100
                : 0;

            // Flag as fraudulent if:
            // 1. Rejection rate > 50% AND at least 5 transactions
            // 2. More than 10 rejected transactions
            const isFraudulent = (rejectionRate > 50 && data.totalCount >= 5) ||
                data.rejectedCount > 10;

            return {
                email,
                name: data.name,
                totalAmount: data.totalAmount,
                verifiedCount: data.verifiedCount,
                rejectedCount: data.rejectedCount,
                totalCount: data.totalCount,
                rejectionRate: Math.round(rejectionRate * 10) / 10, // Round to 1 decimal
                isFraudulent
            };
        });

        return NextResponse.json({ success: true, stats: formattedStats });

    } catch (error: any) {
        console.error('Error fetching user fraud stats:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
