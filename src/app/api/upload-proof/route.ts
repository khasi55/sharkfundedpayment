import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;
        const sessionId = formData.get('sessionId') as string | null;
        const utr = formData.get('utr') as string | null;
        const amount = formData.get('amount') as string | null;
        const name = formData.get('name') as string | null;
        const email = formData.get('email') as string | null;

        if (!file) {
            return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'payment_proofs');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const ext = file.name.split('.').pop() || 'png';
        const filename = `${sessionId || 'proof'}-${Date.now()}.${ext}`;
        const filePath = path.join(uploadsDir, filename);

        fs.writeFileSync(filePath, buffer);

        const publicUrl = `/uploads/payment_proofs/${filename}`;

        let transaction = null;

        if (sessionId) {
            const updateRes = await query(
                `UPDATE transactions
                 SET utr = COALESCE($1, utr),
                     amount = COALESCE($2, amount),
                     status = 'pending_manual_verification',
                     screenshot_url = $3,
                     customer_details = jsonb_set(COALESCE(customer_details, '{}'::jsonb), '{name}', to_jsonb($4::text))
                 WHERE id::text = $5 OR session_id = $5 OR order_id = $5
                 RETURNING *`,
                [
                    utr || null,
                    amount ? parseFloat(amount) : null,
                    publicUrl,
                    name || 'Customer',
                    sessionId
                ]
            );
            if (updateRes.rows.length > 0) {
                transaction = updateRes.rows[0];
            }
        }

        if (!transaction) {
            const insertRes = await query(
                `INSERT INTO transactions (amount, utr, session_id, status, screenshot_url, customer_details)
                 VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                [
                    amount ? parseFloat(amount) : 0,
                    utr || `MANUAL-${Date.now()}`,
                    sessionId || null,
                    'pending_manual_verification',
                    publicUrl,
                    JSON.stringify({ name: name || 'Customer', email: email || '' })
                ]
            );
            transaction = insertRes.rows[0];
        }

        return NextResponse.json({
            success: true,
            screenshot_url: publicUrl,
            data: transaction
        });

    } catch (error: any) {
        console.error('Upload proof error:', error);
        return NextResponse.json({ success: false, message: error.message || 'Internal server error' }, { status: 500 });
    }
}
