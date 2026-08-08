import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
        }

        const res = await query(
            `SELECT id, email, password, name, role, permissions, two_factor_secret, two_factor_enabled FROM admin WHERE LOWER(email) = LOWER($1) LIMIT 1`,
            [email]
        );

        const adminUser = res.rows[0];

        if (!adminUser || adminUser.password !== password) {
            return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
        }

        return NextResponse.json({
            success: true,
            user: {
                id: adminUser.id,
                email: adminUser.email,
                name: adminUser.name,
                role: adminUser.role || 'subadmin',
                permissions: adminUser.permissions || [],
                has2FA: Boolean(adminUser.two_factor_enabled && adminUser.two_factor_secret)
            }
        });
    } catch (error: any) {
        console.error('Error during admin login:', error);
        return NextResponse.json({ success: false, message: error.message || 'Internal server error' }, { status: 500 });
    }
}
