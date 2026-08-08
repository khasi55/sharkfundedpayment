import { NextResponse } from 'next/server';
import { TOTP } from 'otplib';
import { NodeCryptoPlugin } from '@otplib/plugin-crypto-node';
import { ScureBase32Plugin } from '@otplib/plugin-base32-scure';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, token, secret, isSetup } = body;

        if (!email || !token) {
            return NextResponse.json({ success: false, message: 'Email and token are required' }, { status: 400 });
        }

        let adminUserData: any = null;
        let verifySecret = secret;

        if (!isSetup) {
            const res = await query(`SELECT id, email, name, role, permissions, two_factor_secret FROM admin WHERE LOWER(email) = LOWER($1) LIMIT 1`, [email]);
            adminUserData = res.rows[0];

            if (!adminUserData) {
                return NextResponse.json({ success: false, message: 'Admin user not found' }, { status: 404 });
            }

            if (!adminUserData.two_factor_secret) {
                return NextResponse.json({
                    success: false,
                    message: '2FA is not set up for this user',
                    requiresSetup: true
                }, { status: 400 });
            }

            verifySecret = adminUserData.two_factor_secret;
        } else {
            if (!secret) {
                return NextResponse.json({ success: false, message: 'Secret is required for setup verification' }, { status: 400 });
            }
            const res = await query(`SELECT id, email, name, role, permissions FROM admin WHERE LOWER(email) = LOWER($1) LIMIT 1`, [email]);
            adminUserData = res.rows[0];
        }

        const cleanToken = token.trim();
        const cleanSecret = verifySecret ? verifySecret.trim() : '';

        const totp = new TOTP({
            algorithm: 'sha1',
            digits: 6,
            period: 30,
            crypto: new NodeCryptoPlugin(),
            base32: new ScureBase32Plugin()
        });

        const { valid } = await totp.verify(cleanToken, { secret: cleanSecret, epochTolerance: 60 });

        if (!valid) {
            return NextResponse.json({ success: false, message: 'Invalid 2FA code. Please check your authenticator app and try again.' }, { status: 401 });
        }

        if (isSetup) {
            await query(
                `UPDATE admin SET two_factor_secret = $1, two_factor_enabled = true WHERE LOWER(email) = LOWER($2)`,
                [verifySecret, email]
            );
        }

        const userPayload = {
            id: adminUserData?.id,
            email: adminUserData?.email || email,
            name: adminUserData?.name || email.split('@')[0],
            role: adminUserData?.role || 'subadmin',
            permissions: adminUserData?.permissions || []
        };

        const response = NextResponse.json({
            success: true,
            message: 'Verification successful',
            user: userPayload
        });

        const cookieValue = encodeURIComponent(JSON.stringify(userPayload));
        const isHttps = req.url.startsWith('https://');

        response.cookies.set({
            name: 'admin_session',
            value: cookieValue,
            path: '/',
            maxAge: 86400,
            sameSite: 'lax',
            secure: isHttps
        });

        return response;

    } catch (error: any) {
        console.error('Error verifying 2FA:', error);
        return NextResponse.json({ success: false, message: error.message || 'Internal server error' }, { status: 500 });
    }
}
