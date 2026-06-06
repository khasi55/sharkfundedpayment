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
        const status = searchParams.get('status') || '';
        const dateFilter = searchParams.get('dateFilter') || '';
        const customDate = searchParams.get('customDate') || '';
        const pageParam = searchParams.get('page') || '1';
        const limitParam = searchParams.get('limit') || '50';

        const selectOptions: { count?: 'exact' | 'planned' | 'estimated' } = limitParam === 'all' ? {} : { count: 'exact' };

        let query = supabaseAdmin
            .from('transactions')
            .select('*', selectOptions);

        // 1. Status Filter
        if (status && status !== 'all') {
            query = query.eq('status', status);
        }

        // 2. Date Filter
        if (dateFilter && dateFilter !== 'all') {
            const now = new Date();
            if (dateFilter === 'today') {
                const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
                query = query.gte('created_at', todayStart);
            } else if (dateFilter === 'week') {
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
                query = query.gte('created_at', weekAgo);
            } else if (dateFilter === 'month') {
                const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
                query = query.gte('created_at', monthAgo);
            } else if (dateFilter === 'custom' && customDate) {
                const targetDate = new Date(customDate);
                const dayStart = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()).toISOString();
                const dayEnd = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 23, 59, 59, 999).toISOString();
                query = query.gte('created_at', dayStart).lte('created_at', dayEnd);
            }
        }

        // 3. Search Filter
        if (search) {
            const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(search);
            if (isUuid) {
                query = query.eq('id', search);
            } else {
                query = query.or(`utr.ilike.%${search}%,order_id.ilike.%${search}%,customer_details->>email.ilike.%${search}%`);
            }
        }

        // Sort by newest
        query = query.order('created_at', { ascending: false });

        if (limitParam === 'all') {
            query = query.limit(100000); // safety cap
        } else {
            const page = parseInt(pageParam) || 1;
            const limit = parseInt(limitParam) || 50;
            const offset = (page - 1) * limit;
            query = query.range(offset, offset + limit - 1);
        }

        const { data, error, count } = await query;

        if (error) throw error;

        return NextResponse.json({
            success: true,
            data,
            total: limitParam === 'all' ? (data ? data.length : 0) : (count || 0),
            page: limitParam === 'all' ? 1 : parseInt(pageParam),
            limit: limitParam === 'all' ? (data ? data.length : 0) : parseInt(limitParam)
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
