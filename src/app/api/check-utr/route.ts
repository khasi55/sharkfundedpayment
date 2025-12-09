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
            .select('status')
            .eq('utr', utr)
            .eq('status', 'verified')
            .maybeSingle();

        if (error) {
            console.error('Error checking UTR:', error);
            // Don't expose internal DB errors to client
            return NextResponse.json({ error: 'Error validating UTR' }, { status: 500 });
        }

        if (existingTxn) {
            return NextResponse.json({ exists: true, message: 'This UTR has already been used for a verified payment.' });
        }

        return NextResponse.json({ exists: false });

    } catch (error: any) {
        console.error('Server error checking UTR:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
