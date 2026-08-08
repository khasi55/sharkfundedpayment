import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(req: Request) {
    try {
        const { utr, orderId } = await req.json();

        if (!utr) {
            return NextResponse.json({ error: 'UTR is required' }, { status: 400 });
        }

        const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
        const rateLimit = await checkRateLimit(ip, 'check-utr', 30, 60);
        if (!rateLimit.success) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }

        const res = await query(
            `SELECT id, status, utr FROM transactions WHERE utr = $1 ORDER BY created_at DESC LIMIT 1`,
            [utr]
        );
        const existingTxn = res.rows[0];

        if (existingTxn) {
            const isOwnTransaction = orderId && (existingTxn.id === orderId || existingTxn.session_id === orderId);

            if (existingTxn.status === 'verified') {
                return NextResponse.json({
                    exists: true,
                    message: isOwnTransaction
                        ? 'This UTR has already been successfully verified for your order.'
                        : 'This UTR has already been used.'
                });
            } else {
                if (isOwnTransaction) {
                    return NextResponse.json({ exists: false });
                }

                if (utr.length === 12) {
                    const releasedUtr = `REUSED-${Date.now()}-${existingTxn.utr}`;
                    await query(
                        `UPDATE transactions SET utr = $1 WHERE id = $2`,
                        [releasedUtr, existingTxn.id]
                    );
                }

                return NextResponse.json({ exists: false });
            }
        }

        return NextResponse.json({ exists: false });

    } catch (error: any) {
        console.error('Server error checking UTR:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
