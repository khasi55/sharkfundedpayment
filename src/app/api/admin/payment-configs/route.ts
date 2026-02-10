import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { TOTP } from 'otplib';
import { NodeCryptoPlugin } from '@otplib/plugin-crypto-node';
import { ScureBase32Plugin } from '@otplib/plugin-base32-scure';

export const dynamic = 'force-dynamic';

async function getAdminUser() {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get('admin_session');

    if (!adminSession) return null;

    try {
        const user = JSON.parse(decodeURIComponent(adminSession.value));
        return user;
    } catch (e) {
        return null;
    }
}

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

export async function GET(req: Request) {
    try {
        // Verify Auth
        const user = await getAdminUser();
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { data, error } = await supabaseAdmin
            .from('payment_configs')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const user = await getAdminUser();
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { vpa, merchant_name, is_active, two_factor_code } = body;

        // Verify 2FA
        const is2FAValid = await verify2FA(user.email, two_factor_code);
        if (!is2FAValid) {
            return NextResponse.json({ success: false, message: 'Invalid 2FA code' }, { status: 403 });
        }

        // Validation
        if (!vpa || !vpa.includes('@')) {
            return NextResponse.json({ success: false, message: 'Invalid VPA' }, { status: 400 });
        }

        const { data, error } = await supabaseAdmin
            .from('payment_configs')
            .insert([{
                vpa: vpa.trim(),
                merchant_name: merchant_name.trim(),
                is_active
            }])
            .select()
            .single();

        if (error) {
            if (error.code === '23505') return NextResponse.json({ success: false, message: 'VPA already exists' }, { status: 400 });
            throw error;
        }

        // Log Action
        await logAction(user.email, 'PAYMENT_CONFIG_ADD', { vpa, merchant_name, is_active }, req);

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const user = await getAdminUser();
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { id, is_active, two_factor_code } = body;

        // Verify 2FA
        const is2FAValid = await verify2FA(user.email, two_factor_code);
        if (!is2FAValid) {
            return NextResponse.json({ success: false, message: 'Invalid 2FA code' }, { status: 403 });
        }

        if (!id) return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });

        // Get old status for logging
        const { data: oldConfig } = await supabaseAdmin
            .from('payment_configs')
            .select('*')
            .eq('id', id)
            .single();

        const { data, error } = await supabaseAdmin
            .from('payment_configs')
            .update({ is_active })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        // Log Action
        await logAction(user.email, 'PAYMENT_CONFIG_TOGGLE', {
            id,
            vpa: oldConfig?.vpa,
            old_status: oldConfig?.is_active,
            new_status: is_active
        }, req);

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const user = await getAdminUser();
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        const two_factor_code = url.searchParams.get('two_factor_code');

        // Verify 2FA
        const is2FAValid = await verify2FA(user.email, two_factor_code || '');
        if (!is2FAValid) {
            return NextResponse.json({ success: false, message: 'Invalid 2FA code' }, { status: 403 });
        }

        if (!id) return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });

        // Get info before delete
        const { data: configToDelete } = await supabaseAdmin
            .from('payment_configs')
            .select('*')
            .eq('id', id)
            .single();

        const { error } = await supabaseAdmin
            .from('payment_configs')
            .delete()
            .eq('id', id);

        if (error) throw error;

        // Log Action
        await logAction(user.email, 'PAYMENT_CONFIG_DELETE', {
            id,
            vpa: configToDelete?.vpa,
            merchant_name: configToDelete?.merchant_name
        }, req);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
