import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { TOTP } from 'otplib';
import { NodeCryptoPlugin } from '@otplib/plugin-crypto-node';
import { ScureBase32Plugin } from '@otplib/plugin-base32-scure';
import { getAdminUser } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

async function verify2FA(email: string, token: string) {
    if (!token) {
        console.log('2FA Verify: No token provided');
        return false;
    }

    // Fetch the secret directly from the DB regarding the user's email
    // This ensures we are checking against the current user's configured 2FA
    const { data: adminUser, error } = await supabaseAdmin
        .from('admin')
        .select('two_factor_secret')
        .eq('email', email)
        .single();

    if (error || !adminUser) {
        console.log('2FA Verify: User not found or DB error', error);
        return false;
    }

    if (!adminUser.two_factor_secret) {
        console.log('2FA Verify: No secret set for user', email);
        return false;
    }

    // Configure TOTP
    const totp = new TOTP({
        algorithm: 'sha1',
        digits: 6,
        period: 30,
        crypto: new NodeCryptoPlugin(),
        base32: new ScureBase32Plugin()
    });

    try {
        // Verify the token
        const { valid } = await totp.verify(token, { secret: adminUser.two_factor_secret } as any);
        console.log(`2FA Verify: Token '${token}' validation result: ${valid}`);
        return valid;
    } catch (e) {
        console.error('2FA Verification Error:', e);
        return false;
    }
}

async function logAction(adminEmail: string, action: string, details: any, req: Request) {
    console.log(`[AuditLog] Attempting to log action: ${action} for ${adminEmail}`);
    try {
        const ip = req.headers.get('x-forwarded-for') || 'unknown';

        const { error } = await supabaseAdmin.from('admin_audit_logs').insert({
            admin_email: adminEmail,
            action,
            details,
            ip_address: ip
        });

        if (error) {
            console.error('[AuditLog] Supabase Insert Error:', error);
        } else {
            console.log('[AuditLog] Successfully logged action');
        }
    } catch (e) {
        console.error('[AuditLog] Failed to log action:', e);
    }
}

import { UPI_CONFIGS } from '@/config/upiConfig';

export async function GET(req: Request) {
    try {
        // Verify Auth
        const user = await getAdminUser();
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        // [ANTI-HACK] Now returning hardcoded configs instead of DB
        const mappedData = UPI_CONFIGS.map((c, index) => ({
            id: `hardcoded-${index}`,
            vpa: c.vpa,
            merchant_name: c.merchantName,
            is_active: true,
            created_at: new Date().toISOString()
        }));

        return NextResponse.json({ success: true, data: mappedData });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    return NextResponse.json({ success: false, message: 'Add operation is disabled for security. Update source code instead.' }, { status: 403 });
}

export async function PUT(req: Request) {
    return NextResponse.json({ success: false, message: 'Toggle operation is disabled for security. Update source code instead.' }, { status: 403 });
}

export async function DELETE(req: Request) {
    return NextResponse.json({ success: false, message: 'Delete operation is disabled for security. Update source code instead.' }, { status: 403 });
}
