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
        const limit = Math.min(parseInt(url.searchParams.get('limit') || '100'), 500);
        const isOtp = url.searchParams.get('is_otp') === 'true';

        let sql = `SELECT * FROM webhook_logs`;
        const params: any[] = [];

        if (isOtp) {
            sql += ` WHERE is_otp = true`;
        }

        sql += ` ORDER BY created_at DESC LIMIT $${params.length + 1}`;
        params.push(limit);

        const res = await query(sql, params);

        return NextResponse.json({
            success: true,
            data: res.rows
        });
    } catch (error: any) {
        console.error('Error fetching webhook logs:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
