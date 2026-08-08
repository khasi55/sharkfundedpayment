import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAdminUser } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const user = await getAdminUser();
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const res = await query(`SELECT id, email, name, role, permissions, two_factor_enabled, created_at FROM admin ORDER BY created_at DESC`);

        return NextResponse.json({
            success: true,
            data: res.rows
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

        if (id === user.id) {
            return NextResponse.json({ success: false, message: 'Cannot delete yourself' }, { status: 400 });
        }

        await query(`DELETE FROM admin WHERE id = $1`, [id]);

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

        const res = await query(
            `INSERT INTO admin (name, email, password, role, permissions)
             VALUES ($1, $2, $3, $4, $5) RETURNING id, email, name, role, permissions, created_at`,
            [name, email, password, role || 'subadmin', JSON.stringify(permissions || [])]
        );

        return NextResponse.json({ success: true, data: res.rows[0] });
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
        const { id, name, email, password, role, permissions } = body;

        if (!id) {
            return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 });
        }

        let updateQuery = `UPDATE admin SET name = COALESCE($1, name), email = COALESCE($2, email), role = COALESCE($3, role), permissions = COALESCE($4, permissions)`;
        const params: any[] = [name || null, email || null, role || null, permissions ? JSON.stringify(permissions) : null];

        if (password) {
            updateQuery += `, password = $5 WHERE id = $6 RETURNING id, email, name, role, permissions, created_at`;
            params.push(password, id);
        } else {
            updateQuery += ` WHERE id = $5 RETURNING id, email, name, role, permissions, created_at`;
            params.push(id);
        }

        const res = await query(updateQuery, params);

        return NextResponse.json({ success: true, data: res.rows[0] });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
