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

        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '50');
        const offset = (page - 1) * limit;

        const countRes = await query(`SELECT COUNT(*) FROM audit_logs`);
        const total = parseInt(countRes.rows[0]?.count || '0');

        const dataRes = await query(
            `SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
            [limit, offset]
        );

        return NextResponse.json({
            success: true,
            data: dataRes.rows,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error: any) {
        console.error('Error fetching audit logs:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
