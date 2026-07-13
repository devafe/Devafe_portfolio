/* ============================================================
   DEVAFE — Supabase Client
   Fill in YOUR_SUPABASE_URL and YOUR_SUPABASE_ANON_KEY below
   (Project Settings → API in your Supabase dashboard).
   The anon key is safe to expose in frontend code — that's
   what it's designed for, as long as Row Level Security (RLS)
   is enabled on your tables (see README for the policies).
   ============================================================ */

const SUPABASE_URL = 'https://enjzzwwxklijenjvrxqm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuanp6d3d4a2xpamVuanZyeHFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5NTQ1NTAsImV4cCI6MjA5OTUzMDU1MH0.goRd-B540bESqXIKpnMOk-UUcBJHWQGOm7PuqdoP2o4';

// Loaded via CDN script tag in each page's <head>, see index.html
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ---------- Example fetch helpers (used by Home + Projects pages) ---------- */

async function fetchFeaturedProjects(limit = 3){
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limit);
  if(error){ console.error(error); return []; }
  return data;
}

async function fetchLatestArticle(){
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(1);
  if(error){ console.error(error); return null; }
  return data?.[0] || null;
}

async function fetchFeaturedCertificate(){
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .eq('featured', true)
    .limit(1);
  if(error){ console.error(error); return null; }
  return data?.[0] || null;
}
