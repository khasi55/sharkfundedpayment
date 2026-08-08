import { NextResponse } from 'next/server';
import { TOTP } from 'otplib';
import { NodeCryptoPlugin } from '@otplib/plugin-crypto-node';
import { ScureBase32Plugin } from '@otplib/plugin-base32-scure';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
        }

        const res = await query(`SELECT id, email FROM admin WHERE LOWER(email) = LOWER($1) LIMIT 1`, [email]);
        const adminUser = res.rows[0];

        if (!adminUser) {
            return NextResponse.json({ success: false, message: 'Admin user not found' }, { status: 404 });
        }

        const totp = new TOTP({
            algorithm: 'sha1',
            digits: 6,
            period: 30,
            crypto: new NodeCryptoPlugin(),
            base32: new ScureBase32Plugin()
        });

        const secret = totp.generateSecret();
        const otpauth = totp.toURI({
            label: email,
            issuer: 'SharkFunded Admin',
            secret
        });

        return NextResponse.json({
            success: true,
            secret,
            otpauth
        });
    } catch (error: any) {
        console.error('Error generating 2FA secret:', error);
        return NextResponse.json({ success: false, message: error.message || 'Internal server error' }, { status: 500 });
    }
}
