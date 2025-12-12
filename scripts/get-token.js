/**
 * Helper script to get auth token from Supabase
 *
 * This is a browser console script, not a Node.js script.
 * Copy and paste this into your browser console while on the app.
 */

(async () => {
  // Import Supabase client (adjust path if needed)
  const { createClient } = await import(
    'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'
  );

  const supabaseUrl = 'YOUR_SUPABASE_URL'; // Replace with your URL
  const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'; // Replace with your key

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error('Error getting session:', error);
    return;
  }

  if (!session) {
    console.log('❌ No active session. Please sign in first.');
    return;
  }

  console.log('✅ Auth Token:');
  console.log(session.access_token);
  console.log('\n📋 Copy the token above and use it for API testing.');
})();

