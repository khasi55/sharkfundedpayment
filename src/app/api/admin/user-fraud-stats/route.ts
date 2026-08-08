import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
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

        const res = await query(`SELECT amount, customer_details, status FROM transactions`);

        const userStats: Record<string, {
            name: string;
            totalAmount: number;
            verifiedCount: number;
            rejectedCount: number;
            totalCount: number;
        }> = {};

        res.rows.forEach((txn: any) => {
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

        const formattedStats: UserFraudStats[] = Object.entries(userStats).map(([email, data]) => {
            const rejectionRate = data.totalCount > 0
                ? (data.rejectedCount / data.totalCount) * 100
                : 0;

            const isFraudulent = (rejectionRate > 50 && data.totalCount >= 5) ||
                data.rejectedCount > 10;

            return {
                email,
                name: data.name,
                totalAmount: data.totalAmount,
                verifiedCount: data.verifiedCount,
                rejectedCount: data.rejectedCount,
                totalCount: data.totalCount,
                rejectionRate: Math.round(rejectionRate * 10) / 10,
                isFraudulent
            };
        });

        return NextResponse.json({ success: true, stats: formattedStats });

    } catch (error: any) {
        console.error('Error fetching user fraud stats:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
