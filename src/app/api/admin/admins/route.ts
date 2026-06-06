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

        const { data, error } = await supabaseAdmin
            .from('admin')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json({
            success: true,
            data
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const user = await getAdminUser();
        if (!user || user.role !== 'superadmin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 });
        }

        // Prevent deleting yourself
        if (id === user.id) {
            return NextResponse.json({ success: false, message: 'Cannot delete yourself' }, { status: 400 });
        }

        const { error } = await supabaseAdmin
            .from('admin')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true, message: 'Admin deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const user = await getAdminUser();
        if (!user || user.role !== 'superadmin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { name, email, password, role, permissions } = body;

        const { data, error } = await supabaseAdmin
            .from('admin')
            .insert([{ name, email, password, role: role || 'subadmin', permissions }])
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const user = await getAdminUser();
        if (!user || user.role !== 'superadmin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 });
        }

        const { data, error } = await supabaseAdmin
            .from('admin')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
