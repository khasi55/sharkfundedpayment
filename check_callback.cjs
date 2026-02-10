const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://abtcxdaddnfozgekkrsw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFidGN4ZGFkZG5mb3pnZWtrcnN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMDMyMjAsImV4cCI6MjA2MTY3OTIyMH0.B9usHQY_oQea53fqa02_FEmadEBnC8GJeViRsJEOcPE';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkVerifyLogs() {
    const transactionId = 'e1219a20-9917-4e63-b068-aab8da5c6148';
    console.log(`Checking verify-payment logs for transaction ID: ${transactionId}`);

    const { data: logs, error: logError } = await supabase
        .from('api_logs')
        .select('*')
        .eq('endpoint', 'verify-payment')
        .order('created_at', { ascending: false })
        .limit(100);

    if (logError) {
        // Fallback: search all logs for the transaction ID in the payload
        console.error('Error fetching logs, trying wide search...');
        const { data: allLogs } = await supabase
            .from('api_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1000);

        const related = allLogs.filter(l => JSON.stringify(l).includes(transactionId));
        console.log('--- Related API Logs (Wide Search) ---');
        console.log(JSON.stringify(related, null, 2));
    } else {
        const related = logs.filter(l => JSON.stringify(l).includes(transactionId));
        console.log('--- Related Verify-Payment Logs ---');
        console.log(JSON.stringify(related, null, 2));
    }
}

checkVerifyLogs();
