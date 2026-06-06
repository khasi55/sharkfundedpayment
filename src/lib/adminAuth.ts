import { cookies } from 'next/headers';
import { supabaseAdmin } from './supabase';

export async function getAdminUser() {
    try {
        const cookieStore = await cookies();
        const adminSession = cookieStore.get('admin_session');

        if (!adminSession) {
            console.log('[adminAuth] No admin_session cookie found.');
            return null;
        }

        let userData: any = null;
        const rawValue = decodeURIComponent(adminSession.value).trim();

        if (rawValue.startsWith('{')) {
            try {
                userData = JSON.parse(rawValue);
            } catch (parseErr) {
                console.error('[adminAuth] Error parsing JSON cookie:', parseErr);
                return null;
            }
        } else if (rawValue.includes('.') && rawValue.split('.').length === 3) {
            try {
                // It is a JWT token. Decode the payload (index 1)
                const payloadPart = rawValue.split('.')[1];
                const decodedPayload = Buffer.from(payloadPart, 'base64').toString('utf8');
                const jwtData = JSON.parse(decodedPayload);
                userData = {
                    email: jwtData.email || jwtData.user_email || jwtData.sub
                };
                console.log('[adminAuth] Decoded JWT cookie, email found:', userData.email);
            } catch (jwtErr) {
                console.error('[adminAuth] Error decoding JWT cookie:', jwtErr);
                return null;
            }
        }

        if (!userData || !userData.email) {
            console.log('[adminAuth] userData or email could not be parsed from cookie:', rawValue);
            return null;
        }

        console.log('[adminAuth] Attempting admin lookup for email:', userData.email);

        const { data: admin, error } = await supabaseAdmin
            .from('admin')
            .select('id, email, name, role, permissions')
            .ilike('email', userData.email)
            .single();

        if (error) {
            console.error('[adminAuth] Database error looking up admin:', error.message || error);
            return null;
        }

        if (!admin) {
            console.warn(`[adminAuth] No admin user found in database matching email: ${userData.email}`);
            return null;
        }

        console.log('[adminAuth] Successfully authenticated admin:', admin.email);
        return admin;
    } catch (error) {
        console.error('[adminAuth] General exception in getAdminUser:', error);
        return null;
    }
}
