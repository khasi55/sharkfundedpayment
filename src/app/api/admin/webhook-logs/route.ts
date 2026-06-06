import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAdminUser } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const user = await getAdminUser();
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const url = new URL(req.url);
        const limit = parseInt(url.searchParams.get('limit') || '100');
        const isOtp = url.searchParams.get('is_otp') === 'true';

        let query = supabaseAdmin
            .from('webhook_logs')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .limit(limit);

        if (isOtp) {
            query = query.eq('is_otp', true);
        }

        const { data, error, count } = await query;

        if (error) throw error;

        return NextResponse.json({
            success: true,
            data
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
