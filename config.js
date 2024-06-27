require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");


module.exports = {
  supabase: createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  ),
  SESSION_SECRET: process.env.SECRET,
  SESSION_MAXAGE:  1000 * 60 * 60 * 24,
};
 