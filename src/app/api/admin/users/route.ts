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
        const filter = searchParams.get('filter') || 'all';
        const pageParam = searchParams.get('page') || '1';
        const limitParam = searchParams.get('limit') || '50';

        const page = parseInt(pageParam) || 1;
        const limit = parseInt(limitParam) || 50;
        const offset = (page - 1) * limit;

        const whereClauses: string[] = [`t.customer_details->>'email' IS NOT NULL`, `t.customer_details->>'email' != ''`];
        const params: any[] = [];

        if (search) {
            params.push(`%${search}%`);
            const pIdx = params.length;
            whereClauses.push(`(t.customer_details->>'email' ILIKE $${pIdx} OR t.customer_details->>'name' ILIKE $${pIdx})`);
        }

        let havingClause = '';
        if (filter === 'verified') {
            havingClause = 'HAVING COUNT(CASE WHEN t.status = \'verified\' THEN 1 END) > 0';
        }

        const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

        // Total count of distinct users matching filter
        const countSql = `
            SELECT COUNT(*) FROM (
                SELECT LOWER(t.customer_details->>'email')
                FROM transactions t
                ${whereSql}
                GROUP BY LOWER(t.customer_details->>'email')
                ${havingClause}
            ) sub
        `;
        const countRes = await query(countSql, params);
        const total = parseInt(countRes.rows[0]?.count || '0');

        params.push(limit);
        const limitIdx = params.length;
        params.push(offset);
        const offsetIdx = params.length;

        const dataSql = `
            SELECT 
                COALESCE(t.customer_details->>'email', '') AS email,
                MAX(t.customer_details->>'name') AS name,
                SUM(CASE WHEN t.status = 'verified' THEN t.amount ELSE 0 END) AS total_spend,
                COUNT(*) AS total_orders,
                COUNT(CASE WHEN t.status = 'verified' THEN 1 END) AS verified_orders,
                MAX(t.created_at) AS last_active,
                EXISTS(SELECT 1 FROM blocked_users b WHERE LOWER(b.email) = LOWER(COALESCE(t.customer_details->>'email', ''))) AS is_blocked
            FROM transactions t
            ${whereSql}
            GROUP BY LOWER(t.customer_details->>'email'), COALESCE(t.customer_details->>'email', '')
            ${havingClause}
            ORDER BY total_spend DESC
            LIMIT $${limitIdx} OFFSET $${offsetIdx}
        `;

        const dataRes = await query(dataSql, params);

        const users = dataRes.rows.map((u: any) => ({
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
            total,
            page,
            limit
        });
    } catch (error: any) {
        console.error('Error fetching admin users:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
