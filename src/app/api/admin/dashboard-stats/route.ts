import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAdminUser } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const user = await getAdminUser();
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        // Call our RPC to fetch aggregates in a single query
        const { data: statsData, error: statsError } = await supabaseAdmin
            .rpc('get_dashboard_stats');

        if (statsError) {
            console.error('Error fetching RPC get_dashboard_stats:', statsError);
            throw statsError;
        }

        // Fetch recent 5 transactions for the activity feed
        const { data: recentTransactions, error: recentError } = await supabaseAdmin
            .from('transactions')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);

        if (recentError) {
            console.error('Error fetching recent transactions:', recentError);
            throw recentError;
        }

        return NextResponse.json({
            success: true,
            stats: statsData,
            recentTransactions
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
