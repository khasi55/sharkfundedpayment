import { NextResponse } from 'next/server';
import { TOTP } from 'otplib';
import { NodeCryptoPlugin } from '@otplib/plugin-crypto-node';
import { ScureBase32Plugin } from '@otplib/plugin-base32-scure';
import { supabaseAdmin } from '@/lib/supabase';

// Disable caching
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, token, secret, isSetup } = body;

        if (!email || !token) {
            return NextResponse.json({ success: false, message: 'Email and token are required' }, { status: 400 });
        }

        let verifySecret = secret;

        // If not checking a new setup, fetch the secret from the database
        if (!isSetup) {
            const { data: adminUser, error: fetchError } = await supabaseAdmin
                .from('admin')
                .select('two_factor_secret')
                .eq('email', email)
                .single();

            if (fetchError || !adminUser) {
                return NextResponse.json({ success: false, message: 'Admin user not found' }, { status: 404 });
            }

            if (!adminUser.two_factor_secret) {
                return NextResponse.json({
                    success: false,
                    message: '2FA is not set up for this user',
                    requiresSetup: true
                }, { status: 400 });
            }

            verifySecret = adminUser.two_factor_secret;
        } else {
            // validating a new setup
            if (!secret) {
                return NextResponse.json({ success: false, message: 'Secret is required for setup verification' }, { status: 400 });
            }
        }

        // Create TOTP instance with Node crypto and Scure Base32 plugins
        const totp = new TOTP({
            algorithm: 'sha1',
            digits: 6,
            period: 30,
            crypto: new NodeCryptoPlugin(),
            base32: new ScureBase32Plugin()
        });

        // Verify the token
        // TOTP.verify(token: string, options?: Partial<TOTPOptions>)
        const { valid } = await totp.verify(token, { secret: verifySecret });

        if (!valid) {
            return NextResponse.json({ success: false, message: 'Invalid 2FA code' }, { status: 401 });
        }

        // If this was a setup verification and it passed, save the secret to the user's record
        if (isSetup) {
            const { error: updateError } = await supabaseAdmin
                .from('admin')
                .update({ two_factor_secret: verifySecret })
                .eq('email', email);

            if (updateError) {
                return NextResponse.json({ success: false, message: 'Failed to save 2FA secret' }, { status: 500 });
            }
        }

        // Return verifySecret so client can store it temporarily if needed (though usually not improved security practice to echo it back, 
        // but for this flow might be needed if state management is light)
        return NextResponse.json({ success: true, message: 'Verification successful' });

    } catch (error: any) {
        console.error('Error verifying 2FA:', error);
        return NextResponse.json({ success: false, message: error.message || 'Internal server error' }, { status: 500 });
    }
}
