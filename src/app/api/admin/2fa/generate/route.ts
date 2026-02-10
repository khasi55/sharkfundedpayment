import { NextResponse } from 'next/server';
import { TOTP } from 'otplib';
import { NodeCryptoPlugin } from '@otplib/plugin-crypto-node';
import { ScureBase32Plugin } from '@otplib/plugin-base32-scure';
import { supabaseAdmin } from '@/lib/supabase';

// Disable caching for this route
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
        }

        // Verify the user exists in the admin table
        const { data: adminUser, error: fetchError } = await supabaseAdmin
            .from('admin')
            .select('email, id')
            .eq('email', email)
            .single();

        if (fetchError || !adminUser) {
            return NextResponse.json({ success: false, message: 'Admin user not found' }, { status: 404 });
        }

        // Create TOTP instance with Node crypto and Scure Base32 plugins
        const totp = new TOTP({
            algorithm: 'sha1',
            digits: 6,
            period: 30,
            crypto: new NodeCryptoPlugin(),
            base32: new ScureBase32Plugin()
        });

        // Generate a new secret
        const secret = totp.generateSecret();

        // Generate the otpauth URL for QR code
        // format: otpauth://totp/Label:Account?secret=Secret&issuer=Issuer
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
