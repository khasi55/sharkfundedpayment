import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
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

        const whereClauses: string[] = [];
        const params: any[] = [];

        // 1. Status Filter
        if (status && status !== 'all') {
            params.push(status);
            whereClauses.push(`status = $${params.length}`);
        }

        // 2. Date Filter
        if (dateFilter && dateFilter !== 'all') {
            const now = new Date();
            if (dateFilter === 'today') {
                const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
                params.push(todayStart);
                whereClauses.push(`created_at >= $${params.length}`);
            } else if (dateFilter === 'week') {
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
                params.push(weekAgo);
                whereClauses.push(`created_at >= $${params.length}`);
            } else if (dateFilter === 'month') {
                const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
                params.push(monthAgo);
                whereClauses.push(`created_at >= $${params.length}`);
            } else if (dateFilter === 'custom' && customDate) {
                const targetDate = new Date(customDate);
                const dayStart = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()).toISOString();
                const dayEnd = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 23, 59, 59, 999).toISOString();
                params.push(dayStart);
                whereClauses.push(`created_at >= $${params.length}`);
                params.push(dayEnd);
                whereClauses.push(`created_at <= $${params.length}`);
            }
        }

        // 3. Search Filter
        if (search) {
            const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(search);
            if (isUuid) {
                params.push(search);
                whereClauses.push(`id::text = $${params.length}`);
            } else {
                params.push(`%${search}%`);
                const pIndex = params.length;
                whereClauses.push(`(utr ILIKE $${pIndex} OR order_id ILIKE $${pIndex} OR customer_details->>'email' ILIKE $${pIndex} OR customer_details->>'name' ILIKE $${pIndex})`);
            }
        }

        const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

        // Total count query
        const countRes = await query(`SELECT COUNT(*) FROM transactions ${whereSql}`, params);
        const total = parseInt(countRes.rows[0]?.count || '0');

        let dataSql = `SELECT * FROM transactions ${whereSql} ORDER BY created_at DESC`;

        if (limitParam !== 'all') {
            const page = parseInt(pageParam) || 1;
            const limit = parseInt(limitParam) || 50;
            const offset = (page - 1) * limit;

            params.push(limit);
            dataSql += ` LIMIT $${params.length}`;
            params.push(offset);
            dataSql += ` OFFSET $${params.length}`;
        } else {
            dataSql += ` LIMIT 100000`;
        }

        const dataRes = await query(dataSql, params);

        return NextResponse.json({
            success: true,
            data: dataRes.rows,
            total,
            page: limitParam === 'all' ? 1 : parseInt(pageParam),
            limit: limitParam === 'all' ? dataRes.rows.length : parseInt(limitParam)
        });
    } catch (error: any) {
        console.error('Error fetching admin transactions:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
