const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials in backend .env');
}

// This is the admin client using the Service Role key
// BYPASSES Row Level Security (RLS) - Use ONLY in the backend!
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

module.exports = { supabaseAdmin };
