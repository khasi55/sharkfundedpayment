const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://abtcxdaddnfozgekkrsw.supabase.co';
const supabaseKey = 'sb_secret_nLLaRR4Wp2TTDYRGvkGPhQ_VBTKsD4i'; // Service role key for metadata
const supabase = createClient(supabaseUrl, supabaseKey);

async function listTables() {
    console.log('Listing all tables in public schema...');

    // Querying information_schema to see all tables
    const { data, error } = await supabase.rpc('get_tables'); // Checking if a custom RPC exists for this

    if (error) {
        console.log('No get_tables RPC, trying direct SQL via REST (might fail if not enabled)...');
        // Fallback: try to select from a non-existent table to see error or use a known one
        const { data: tables, error: sqlError } = await supabase
            .from('pg_catalog.pg_tables') // Usually not accessible via REST
            .select('tablename')
            .eq('schemaname', 'public');

        if (sqlError) {
            console.error('Could not list tables via REST. Checking known tables...');
            const known = ['admin', 'admin_audit_logs', 'transactions', 'webhook_logs', 'api_logs', 'blocked_users', 'payment_configs'];
            for (const table of known) {
                const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
                console.log(`${table}: ${error ? 'Error' : count + ' rows'}`);
            }
        } else {
            console.log('Tables:', tables);
        }
    } else {
        console.log('Tables:', data);
    }
}

listTables();
