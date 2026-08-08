import { cookies } from 'next/headers';
import { query } from './db';

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

        const result = await query(
            'SELECT id, email, name, role, permissions FROM admin WHERE LOWER(email) = LOWER($1) LIMIT 1',
            [userData.email]
        );

        if (result.rows.length === 0) {
            console.warn(`[adminAuth] No admin user found in database matching email: ${userData.email}`);
            return null;
        }

        const admin = result.rows[0];
        console.log('[adminAuth] Successfully authenticated admin:', admin.email);
        return admin;
    } catch (error) {
        console.error('[adminAuth] General exception in getAdminUser:', error);
        return null;
    }
}
