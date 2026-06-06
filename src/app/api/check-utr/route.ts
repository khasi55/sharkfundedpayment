import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(req: Request) {
    try {
        const { utr, orderId } = await req.json();

        if (!utr) {
            return NextResponse.json({ error: 'UTR is required' }, { status: 400 });
        }

        const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
        // FAIL CLOSED: if rate limit check fails or hits limit, block request.
        const rateLimit = await checkRateLimit(ip, 'check-utr', 30, 60);
        if (!rateLimit.success) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }

        // Use supabaseAdmin (Service Role) to bypass RLS
        const { data: existingTxn, error } = await supabaseAdmin
            .from('transactions')
            .select('id, status, utr')
            .eq('utr', utr)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (error) {
            console.error('Error checking UTR:', error);
            return NextResponse.json({ error: 'Error validating UTR' }, { status: 500 });
        }

        if (existingTxn) {
            // Is this the SAME transaction the user is currently on?
            const isOwnTransaction = orderId && existingTxn.id === orderId;

            if (existingTxn.status === 'verified') {
                return NextResponse.json({
                    exists: true,
                    message: isOwnTransaction
                        ? 'This UTR has already been successfully verified for your order.'
                        : 'This UTR has already been used.'
                });
            } else {
                // If it's NOT verified, we allow it to be "reused" only if it's the OWN transaction
                // OR if it's an old abandoned one.
                if (isOwnTransaction) {
                    return NextResponse.json({ exists: false });
                }

                // If someone else's UTR is sitting there as 'pending', we allow the new user to "take" it
                // by releasing it from the old one. BUT we only do this if the UTR is 12 digits (real).
                if (utr.length === 12) {
                    const releasedUtr = `REUSED-${Date.now()}-${existingTxn.utr}`;

                    const { error: updateError } = await supabaseAdmin
                        .from('transactions')
                        .update({ utr: releasedUtr })
                        .eq('id', existingTxn.id);

                    if (updateError) {
                        console.error('Error releasing UTR:', updateError);
                        return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
                    }
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
