import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabase';
import { getAdminUser } from '@/lib/adminAuth';

export async function GET(request: Request) {
    try {
        const user = await getAdminUser();
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { data, error } = await supabase
            .from('blocked_users')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json({ success: true, blockedUsers: data });
    } catch (error: any) {
        console.error('Error fetching blocked users:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const user = await getAdminUser();
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { email, reason } = body;

        if (!email) {
            return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
        }

        const { error } = await supabase
            .from('blocked_users')
            .insert([{ email, reason }]);

        if (error) throw error;

        return NextResponse.json({ success: true, message: 'User blocked successfully' });
    } catch (error: any) {
        console.error('Error blocking user:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const user = await getAdminUser();
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
        }

        const { error } = await supabase
            .from('blocked_users')
            .delete()
            .eq('email', email);

        if (error) throw error;

        return NextResponse.json({ success: true, message: 'User unblocked successfully' });

    } catch (error: any) {
        console.error('Error unblocking user:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
