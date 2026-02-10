const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://abtcxdaddnfozgekkrsw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFidGN4ZGFkZG5mb3pnZWtrcnN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMDMyMjAsImV4cCI6MjA2MTY3OTIyMH0.B9usHQY_oQea53fqa02_FEmadEBnC8GJeViRsJEOcPE';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testLogins() {
    const emails = ['D3devansh12@gmail.com', 'admin@sharkfunded.com', 'khasireddy3@gmail.com', 'punit@mazifinance.com'];
    console.log(`Testing logins for: ${emails.join(', ')}`);

    for (const email of emails) {
        console.log(`\n--- Testing: ${email} ---`);
        const { data, error } = await supabase.rpc('check_admin_login', {
            email_input: email,
            password_input: 'wrong_password' // This should fail unless there's a bypass
        });

        if (error) {
            console.error(`Error for ${email}:`, error.message);
        } else {
            console.log(`Result:`, JSON.stringify(data, null, 2));
        }
    }
}

testLogins();
