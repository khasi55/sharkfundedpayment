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

        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search') || '';
        const filter = searchParams.get('filter') || 'all';
        const pageParam = searchParams.get('page') || '1';
        const limitParam = searchParams.get('limit') || '50';

        const page = parseInt(pageParam) || 1;
        const limit = parseInt(limitParam) || 50;
        const offset = (page - 1) * limit;

        let query = supabaseAdmin
            .from('user_stats_view')
            .select('*', { count: 'exact' });

        // 1. Apply Search Filter
        if (search) {
            query = query.or(`email.ilike.%${search}%,name.ilike.%${search}%`);
        }

        // 2. Apply Verified Orders Filter
        if (filter === 'verified') {
            query = query.gt('verified_orders', 0);
        }

        // 3. Sort by total spend descending
        query = query.order('total_spend', { ascending: false });

        // 4. Paginate
        query = query.range(offset, offset + limit - 1);

        const { data, error, count } = await query;

        if (error) throw error;

        // Map database view snake_case fields to frontend UserStat camelCase fields
        const users = (data || []).map((u: any) => ({
            email: u.email,
            name: u.name,
            totalSpend: Number(u.total_spend || 0),
            totalOrders: Number(u.total_orders || 0),
            verifiedOrders: Number(u.verified_orders || 0),
            lastActive: u.last_active,
            status: u.is_blocked ? 'inactive' : 'active',
            isBlocked: u.is_blocked
        }));

        return NextResponse.json({
            success: true,
            users,
            total: count || 0,
            page,
            limit
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
