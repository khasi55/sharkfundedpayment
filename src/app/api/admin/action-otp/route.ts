import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import nodemailer from 'nodemailer';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import { getAdminUser } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

// Email transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function POST(req: Request) {
    try {
        const user = await getAdminUser();
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { action } = body;

        // Target Email
        const targetEmail = 'khasireddy3@gmail.com';

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        // Save OTP
        const { error } = await supabaseAdmin
            .from('action_otps')
            .insert({
                email: targetEmail,
                otp,
                expires_at: expiresAt.toISOString()
            });

        if (error) throw error;

        // Check for mock/dev environment or missing SMTP config
        const isMockSmtp = !process.env.SMTP_HOST || process.env.SMTP_HOST.includes('example.com');

        if (isMockSmtp) {
            console.log('================================================================');
            console.log(' [MOCK EMAIL] SMTP not configured. OTP generated:');
            console.log(` To: ${targetEmail}`);
            console.log(` OTP: ${otp}`);
            console.log('================================================================');

            return NextResponse.json({
                success: true,
                message: `[MOCK] OTP generated. Check server console. (SMTP not configured)`
            });
        }

        // Send Email
        await transporter.sendMail({
            from: process.env.SMTP_FROM || '"Shark Funded" <no-reply@sharkfunded.com>',
            to: targetEmail,
            subject: 'Admin Action OTP - Payment Settings Change',
            html: `
                <div style="font-family: sans-serif; padding: 20px;">
                    <h2>Admin Action Verification</h2>
                    <p>A request was made to change payment settings by <b>${user.email}</b>.</p>
                    <p>Use the following OTP to verify this action:</p>
                    <h1 style="background: #f0f0f0; padding: 10px; display: inline-block; letter-spacing: 5px;">${otp}</h1>
                    <p>This OTP expires in 5 minutes.</p>
                </div>
            `
        });

        return NextResponse.json({ success: true, message: `OTP sent to ${targetEmail}` });

    } catch (error: any) {
        console.error('Error sending OTP detailed:', JSON.stringify(error, null, 2));
        console.error('Error sending OTP raw:', error);
        return NextResponse.json({
            success: false,
            message: error.message || 'Internal server error',
            details: error
        }, { status: 500 });
    }
}
