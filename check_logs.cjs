const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://abtcxdaddnfozgekkrsw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFidGN4ZGFkZG5mb3pnZWtrcnN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMDMyMjAsImV4cCI6MjA2MTY3OTIyMH0.B9usHQY_oQea53fqa02_FEmadEBnC8GJeViRsJEOcPE';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkApiLogs() {
    const email = 'D3devansh12@gmail.com';
    console.log(`Searching api_logs for: ${email}`);

    // Fetch all logs from the last 1000 entries
    const { data: logs, error } = await supabase
        .from('api_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1000);

    if (error) {
        console.error('Error fetching logs:', error);
    } else {
        const related = logs.filter(l => JSON.stringify(l).toLowerCase().includes(email.toLowerCase()));
        console.log(`Found ${related.length} related logs.`);
        console.log(JSON.stringify(related, null, 2));
    }
}

checkApiLogs();
