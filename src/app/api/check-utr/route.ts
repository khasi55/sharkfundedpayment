import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const { utr } = await req.json();

        if (!utr) {
            return NextResponse.json({ error: 'UTR is required' }, { status: 400 });
        }

        // Use supabaseAdmin (Service Role) to bypass RLS
        const { data: existingTxn, error } = await supabaseAdmin
            .from('transactions')
            .select('id, status, utr')
            .eq('utr', utr)
            .maybeSingle();

        if (error) {
            console.error('Error checking UTR:', error);
            return NextResponse.json({ error: 'Error validating UTR' }, { status: 500 });
        }

        if (existingTxn) {
            if (existingTxn.status === 'verified') {
                return NextResponse.json({ exists: true, message: 'This UTR has already been used for a verified payment.' });
            } else {
                // Transaction exists but is NOT verified (e.g. pending/failed)
                // releasing the UTR so it can be used again.
                // We append a timestamp to the old UTR to avoid unique constraint violation on the new insert.
                const releasedUtr = `REUSED-${Date.now()}-${existingTxn.utr}`;

                const { error: updateError } = await supabaseAdmin
                    .from('transactions')
                    .update({ utr: releasedUtr })
                    .eq('id', existingTxn.id);

                if (updateError) {
                    console.error('Error releasing UTR:', updateError);
                    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
                }

                // Return exists: false so the frontend proceeds
                return NextResponse.json({ exists: false });
            }
        }

        return NextResponse.json({ exists: false });

    } catch (error: any) {
        console.error('Server error checking UTR:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
