const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://abtcxdaddnfozgekkrsw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFidGN4ZGFkZG5mb3pnZWtrcnN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMDMyMjAsImV4cCI6MjA2MTY3OTIyMH0.B9usHQY_oQea53fqa02_FEmadEBnC8GJeViRsJEOcPE';
const supabase = createClient(supabaseUrl, supabaseKey);

async function searchSuraj() {
    const email = 'surajshaikh6@gmail.com';

    console.log(`Searching for Email: ${email} in sharkpayments gateway...`);

    // 1. Search Transactions
    const { data: transactions, error: txError } = await supabase
        .from('transactions')
        .select('*')
        .ilike('email', email);

    console.log('\n--- Transactions ---');
    if (transactions && transactions.length > 0) {
        transactions.forEach(tx => {
            console.log(`Order: ${tx.order_id}, Phone: ${tx.phone || 'N/A'}`);
            if (tx.metadata) console.log(`Metadata: ${JSON.stringify(tx.metadata)}`);
        });
    } else {
        console.log('No transactions found.');
    }

    // 2. Search Webhook Logs
    const { data: webhookLogs, error: whError } = await supabase
        .from('webhook_logs')
        .select('*')
        .ilike('raw_text', `%${email}%`);

    console.log('\n--- Webhook Logs ---');
    if (webhookLogs && webhookLogs.length > 0) {
        webhookLogs.forEach(log => {
            console.log(`Log ID: ${log.id}, Created At: ${log.created_at}`);
            // Look for phone number pattern in raw_text
            const phoneMatch = log.raw_text.match(/\d{10,12}/);
            if (phoneMatch) console.log(`Potential phone found: ${phoneMatch[0]}`);
            console.log(`Raw Text snippet: ${log.raw_text.substring(0, 200)}...`);
        });
    } else {
        console.log('No webhook logs found.');
    }

    // 3. Search API Logs
    const { data: apiLogs, error: apiError } = await supabase
        .from('api_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5000);

    const relatedApiLogs = apiLogs ? apiLogs.filter(l => 
        JSON.stringify(l).toLowerCase().includes(email.toLowerCase())
    ) : [];

    console.log('\n--- Related API Logs ---');
    if (relatedApiLogs.length > 0) {
        relatedApiLogs.forEach(log => {
            console.log(`Log ID: ${log.id}, Full Log: ${JSON.stringify(log, null, 2)}`);
        });
    } else {
        console.log('No API logs found.');
    }
}

searchSuraj();
