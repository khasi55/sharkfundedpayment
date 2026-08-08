import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAdminUser } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = body;

        let targetEmail = email;

        // If email is not explicitly provided in body, check logged in session
        if (!targetEmail) {
            const user = await getAdminUser();
            if (user) {
                targetEmail = user.email;
            }
        }

        if (!targetEmail) {
            return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
        }

        const res = await query(
            `UPDATE admin SET two_factor_secret = NULL, two_factor_enabled = false WHERE LOWER(email) = LOWER($1) RETURNING id, email, name`,
            [targetEmail]
        );

        if (res.rowCount === 0) {
            return NextResponse.json({ success: false, message: 'Admin user not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: `2FA has been successfully reset for ${targetEmail}. The user can now scan a new QR code on login.`
        });
    } catch (error: any) {
        console.error('Error resetting 2FA:', error);
        return NextResponse.json({ success: false, message: error.message || 'Internal server error' }, { status: 500 });
    }
}
