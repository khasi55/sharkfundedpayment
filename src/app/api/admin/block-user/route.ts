import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAdminUser } from '@/lib/adminAuth';

export async function GET(request: Request) {
    try {
        const user = await getAdminUser();
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const res = await query(`SELECT * FROM blocked_users ORDER BY created_at DESC`);

        return NextResponse.json({ success: true, blockedUsers: res.rows });
    } catch (error: any) {
        console.error('Error fetching blocked users:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const user = await getAdminUser();
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { email, reason } = body;

        if (!email) {
            return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
        }

        await query(
            `INSERT INTO blocked_users (email, reason) VALUES ($1, $2) ON CONFLICT (email) DO UPDATE SET reason = EXCLUDED.reason`,
            [email, reason || null]
        );

        return NextResponse.json({ success: true, message: 'User blocked successfully' });
    } catch (error: any) {
        console.error('Error blocking user:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const user = await getAdminUser();
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
        }

        await query(`DELETE FROM blocked_users WHERE LOWER(email) = LOWER($1)`, [email]);

        return NextResponse.json({ success: true, message: 'User unblocked successfully' });

    } catch (error: any) {
        console.error('Error unblocking user:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
