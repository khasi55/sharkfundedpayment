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
        const limit = Math.min(parseInt(url.searchParams.get('limit') || '500'), 1000);

        const res = await query(
            `SELECT * FROM api_logs ORDER BY created_at DESC LIMIT $1`,
            [limit]
        );

        return NextResponse.json({
            success: true,
            data: res.rows
        });
    } catch (error: any) {
        console.error('Error fetching api logs:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
