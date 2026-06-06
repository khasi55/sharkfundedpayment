const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://abtcxdaddnfozgekkrsw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFidGN4ZGFkZG5mb3pnZWtrcnN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMDMyMjAsImV4cCI6MjA2MTY3OTIyMH0.B9usHQY_oQea53fqa02_FEmadEBnC8GJeViRsJEOcPE';
const supabase = createClient(supabaseUrl, supabaseKey);

async function searchOrderLogs() {
    const orderId = 'SF-2025-00006750';
    const utr = '608288975120';
    const email = 'VIVEKMISHRAGTA@GMAIL.COM';

    console.log(`Searching for Order: ${orderId}, UTR: ${utr}, Email: ${email}`);

    // 1. Search Transactions
    const { data: transactions, error: txError } = await supabase
        .from('transactions')
        .select('*')
        .or(`order_id.eq.${orderId},utr.eq.${utr}`);

    console.log('\n--- Transactions ---');
    console.log(JSON.stringify(transactions, null, 2));

    // 2. Search Webhook Logs
    const { data: webhookLogs, error: whError } = await supabase
        .from('webhook_logs')
        .select('*')
        .or(`utr.eq.${utr},raw_text.ilike.%${utr}%,raw_text.ilike.%${orderId}%`);

    console.log('\n--- Webhook Logs ---');
    console.log(JSON.stringify(webhookLogs, null, 2));

    // 3. Search API Logs (Wide Search)
    const { data: apiLogs, error: apiError } = await supabase
        .from('api_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(2000);

    const relatedApiLogs = apiLogs ? apiLogs.filter(l => 
        JSON.stringify(l).includes(orderId) || 
        JSON.stringify(l).includes(utr) || 
        JSON.stringify(l).includes(email)
    ) : [];

    console.log('\n--- Related API Logs ---');
    console.log(JSON.stringify(relatedApiLogs, null, 2));
}

searchOrderLogs();
