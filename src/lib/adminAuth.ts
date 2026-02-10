import { cookies } from 'next/headers';
import { supabaseAdmin } from './supabase';

export async function getAdminUser() {
    try {
        const cookieStore = await cookies();
        const adminSession = cookieStore.get('admin_session');

        if (!adminSession) return null;

        const userData = JSON.parse(decodeURIComponent(adminSession.value));

        if (!userData || !userData.email) return null;

        // CRITICAL: Verify the user actually exists in our admin table
        // This prevents forging of cookies by malicious users.
        const { data: admin, error } = await supabaseAdmin
            .from('admin')
            .select('id, email, name, role, permissions')
            .eq('email', userData.email)
            .single();

        if (error || !admin) {
            console.warn(`Unauthorized access attempt using forged or stale cookie for: ${userData.email}`);
            return null;
        }

        return admin;
    } catch (error) {
        console.error('Error in getAdminUser:', error);
        return null;
    }
}
