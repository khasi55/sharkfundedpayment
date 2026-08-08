import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAdminUser } from '@/lib/adminAuth';
import { UPI_CONFIGS } from '@/config/upiConfig';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const user = await getAdminUser();
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const mappedData = UPI_CONFIGS.map((c, index) => ({
            id: `hardcoded-${index}`,
            vpa: c.vpa,
            merchant_name: c.merchantName,
            is_active: true,
            created_at: new Date().toISOString()
        }));

        return NextResponse.json({ success: true, data: mappedData });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    return NextResponse.json({ success: false, message: 'Add operation is disabled for security. Update source code instead.' }, { status: 403 });
}

export async function PUT(req: Request) {
    return NextResponse.json({ success: false, message: 'Toggle operation is disabled for security. Update source code instead.' }, { status: 403 });
}

export async function DELETE(req: Request) {
    return NextResponse.json({ success: false, message: 'Delete operation is disabled for security. Update source code instead.' }, { status: 403 });
}
