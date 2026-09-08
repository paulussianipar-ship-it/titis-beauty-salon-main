import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const publishableKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !publishableKey) {
  console.error('Supabase connection failed: VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY is missing.');
  process.exit(1);
}

const main = async () => {
  const response = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/health_check?select=id&limit=1`, {
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
    },
  });

  if (response.ok) {
    console.log('Supabase connection OK: health_check is reachable.');
    return;
  }

  const responseBody = await response.text();
  if (response.status === 404 && responseBody.includes('health_check')) {
    console.error('Supabase is reachable, but the database schema is not applied yet. Run db/schema.sql in Supabase SQL Editor.');
  } else if (response.status === 401 || response.status === 403) {
    console.error(`Supabase rejected the publishable key (HTTP ${response.status}). Check VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.`);
  } else {
    console.error(`Supabase connection failed (HTTP ${response.status}).`);
  }

  process.exitCode = 1;
};

await main();