import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://your-project.supabase.co') {
    console.warn('Supabase credentials missing! Please check your .env file.');
}

// Fallback to prevent crash if keys are missing, but requests will fail.
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
);

const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

// Fall back to anon key if serviceRoleKey is invalid (e.g. database password starting with sb_secret_)
const activeServiceKey = (serviceRoleKey && serviceRoleKey.startsWith('eyJ'))
    ? serviceRoleKey
    : supabaseAnonKey;

export const supabaseAdmin = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    activeServiceKey || 'placeholder-service-key',
    {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false
        }
    }
);
