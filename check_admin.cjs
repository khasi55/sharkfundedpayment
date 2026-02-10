const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://abtcxdaddnfozgekkrsw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFidGN4ZGFkZG5mb3pnZWtrcnN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMDMyMjAsImV4cCI6MjA2MTY3OTIyMH0.B9usHQY_oQea53fqa02_FEmadEBnC8GJeViRsJEOcPE';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAdmin() {
    const email = 'D3devansh12@gmail.com';
    console.log(`Checking admin status for: ${email}`);

    // 1. Check admin table
    const { data: admins, error: adminError } = await supabase
        .from('admin')
        .select('*');

    if (adminError) {
        console.error('Error fetching admins:', adminError);
    } else {
        console.log('--- Admin Table ---');
        console.log(JSON.stringify(admins, null, 2));
        const found = admins.find(a => a.email.toLowerCase() === email.toLowerCase());
        if (found) {
            console.log(`\nFound user in admin table:`, JSON.stringify(found, null, 2));
        } else {
            console.log(`\nUser NOT found in admin table.`);
        }
    }

    // 2. Check admin_audit_logs
    const { data: logs, error: logError } = await supabase
        .from('admin_audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

    if (logError) {
        console.error('Error fetching audit logs:', logError);
    } else {
        const relatedLogs = logs.filter(log =>
            JSON.stringify(log).toLowerCase().includes(email.toLowerCase())
        );
        console.log('\n--- Related Audit Logs ---');
        console.log(JSON.stringify(relatedLogs, null, 2));
    }
}

checkAdmin();
