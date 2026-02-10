const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://abtcxdaddnfozgekkrsw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFidGN4ZGFkZG5mb3pnZWtrcnN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMDMyMjAsImV4cCI6MjA2MTY3OTIyMH0.B9usHQY_oQea53fqa02_FEmadEBnC8GJeViRsJEOcPE';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRecentApprovals() {
    const orderIds = ['SF-2025-00004128', 'SF-2025-00004129'];
    console.log(`Checking transactions for Order IDs: ${orderIds.join(', ')}`);

    const { data: txs, error } = await supabase
        .from('transactions')
        .select('*');

    if (error) {
        console.error('Error:', error);
    } else {
        const found = txs.filter(t => orderIds.includes(t.order_id));
        console.log('--- Transactions ---');
        console.log(JSON.stringify(found, null, 2));

        if (found.length > 0) {
            const uuids = found.map(f => f.id);
            console.log(`\nFound transaction UUIDs: ${uuids.join(', ')}`);

            // Now check api_logs for these UUIDs (metadata->>order_id)
            const { data: logs } = await supabase
                .from('api_logs')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(1000);

            const related = logs.filter(l => {
                const metaStr = JSON.stringify(l.metadata || {});
                const payloadStr = JSON.stringify(l.request_payload || {});
                return uuids.some(uuid => metaStr.includes(uuid) || payloadStr.includes(uuid));
            });

            console.log('\n--- Related API Logs ---');
            console.log(JSON.stringify(related, null, 2));
        }
    }
}

checkRecentApprovals();
