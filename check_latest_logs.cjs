const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: './.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://abtcxdaddnfozgekkrsw.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFidGN4ZGFkZG5mb3pnZWtrcnN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMDMyMjAsImV4cCI6MjA2MTY3OTIyMH0.B9usHQY_oQea53fqa02_FEmadEBnC8GJeViRsJEOcPE';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkLatest() {
    console.log('Querying latest api_logs...');
    const { data, error } = await supabase
        .from('api_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    if (error) {
        console.error('Error querying api_logs:', error);
    } else {
        console.log('Latest 5 api_logs:');

        console.log(JSON.stringify(data, null, 2));
    }
}

checkLatest();
