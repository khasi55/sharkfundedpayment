
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('URL:', supabaseUrl ? 'Set' : 'Missing');
console.log('Anon Key:', supabaseAnonKey ? 'Set' : 'Missing');
console.log('Service Role Key:', serviceRoleKey ? 'Set' : 'Missing');

if (serviceRoleKey && supabaseAnonKey && serviceRoleKey === supabaseAnonKey) {
    console.error('CRITICAL: SUPABASE_SERVICE_ROLE_KEY is identical to NEXT_PUBLIC_SUPABASE_ANON_KEY. This will cause RLS errors!');
} else {
    console.log('Keys are different.');
}

if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing credentials');
    process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
    }
});

async function testInsert() {
    console.log('Attempting insert...');
    const email = `test_admin_${Date.now()}@example.com`;
    const { data, error } = await supabaseAdmin
        .from('admin')
        .insert([{
            email,
            password: 'testpassword',
            name: 'Test Admin',
            role: 'subadmin',
            permissions: []
        }])
        .select()
        .single();

    if (error) {
        console.error('Insert failed:', error);
    } else {
        console.log('Insert successful:', data);
        // Clean up
        await supabaseAdmin.from('admin').delete().eq('id', data.id);
    }
}

testInsert();
