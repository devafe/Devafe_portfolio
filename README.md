# DEVAFE Portfolio — Setup Guide

## 1. Previewing in Acode (important!)
`main.js` loads the nav/footer using `fetch()`, which browsers **block** when you open an HTML file directly (`file://...`). You need a tiny local server:

- In Acode, install the **"Acode Live Server"** plugin (or use the built-in one if your version has it) and hit Run on `index.html`. It'll serve over `http://localhost` and everything will load correctly.
- Alternative: once pushed to GitHub/Netlify, it works automatically since it's served over real `http://`.

## 2. File structure
```
devafe/
├── index.html              ← Home page
├── assets/
│   ├── css/
│   │   ├── style.css       ← Global brand styles (colors, fonts, buttons, nav)
│   │   └── home.css        ← Home-page-only styles
│   ├── js/
│   │   ├── main.js         ← Loads nav/footer on every page + mobile menu
│   │   ├── supabase-client.js
│   │   └── home.js         ← Home page typing effect + dynamic content
│   ├── partials/
│   │   ├── nav.html        ← Edit ONCE, updates every page
│   │   └── footer.html
│   └── img/                ← Put your logo/favicon/project images here
```
Every future page (about.html, projects.html, etc.) follows the same pattern: `<div id="site-nav"></div>` at the top, `<div id="site-footer"></div>" at the bottom, and include `main.js`.

## 3. Supabase setup
1. Go to supabase.com → your project → **Settings → API**.
2. Copy your **Project URL** and **anon public key**.
3. Paste them into `assets/js/supabase-client.js` (`SUPABASE_URL`, `SUPABASE_ANON_KEY`).

### Tables to create (SQL editor in Supabase)
```sql
create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  description text,
  category text,
  tags text[],
  github_url text,
  live_url text,
  image_url text,
  featured boolean default false,
  created_at timestamp with time zone default now()
);

create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  category text,
  published_at timestamp with time zone default now()
);

create table certificates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text,
  issued_date date,
  credential_id text,
  verify_url text,
  image_url text,
  featured boolean default false
);
```

### Row Level Security (required — do this or the tables are locked)
For each table, enable RLS and add a **public read** policy:
```sql
alter table projects enable row level security;
create policy "Public read" on projects for select using (true);
-- repeat for blog_posts and certificates
```
Writing (insert/update/delete) should only be allowed for you — that's handled once we build the admin dashboard with Supabase Auth (Phase 2), so only logged-in you can edit content.

## 4. Hosting (when ready)
**Netlify (easiest from phone):**
1. Push this folder to a GitHub repo (Acode has git support), or zip it.
2. netlify.com → "Add new site" → connect the repo → deploy. No build command needed, publish directory is the project root.

## Status
- [x] Phase 1: Home page + shared nav/footer/brand system
- [ ] Phase 2: About, Skills, Projects, Project Details
- [ ] Phase 3: Blog, Certificates, Learning Journey, Uses, Resume, Contact, 404
- [ ] Phase 4: Supabase Auth + Admin Dashboard
