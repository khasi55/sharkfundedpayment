const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://abtcxdaddnfozgekkrsw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFidGN4ZGFkZG5mb3pnZWtrcnN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMDMyMjAsImV4cCI6MjA2MTY3OTIyMH0.B9usHQY_oQea53fqa02_FEmadEBnC8GJeViRsJEOcPE';
const supabase = createClient(supabaseUrl, supabaseKey);

async function getFunctionDef() {
    console.log('Fetching definition for check_admin_login...');

    // Attempt to query pg_proc via standard select (might fail due to permissions)
    const { data: proc, error } = await supabase
        .from('pg_proc')
        .select('prosrc')
        .eq('proname', 'check_admin_login')
        .maybeSingle();

    if (error) {
        console.error('Error fetching pg_proc:', error.message);
        console.log('Trying to find the function another way...');

        // Let's try to query the information_schema
        const { data: routines, error: routineError } = await supabase
            .from('information_schema.routines')
            .select('routine_definition')
            .eq('routine_name', 'check_admin_login')
            .maybeSingle();

        if (routineError) {
            console.error('Error fetching information_schema:', routineError.message);
        } else {
            console.log('Function Definition:', routines ? routines.routine_definition : 'Not found');
        }
    } else {
        console.log('Function Definition:', proc ? proc.prosrc : 'Not found');
    }
}

getFunctionDef();
