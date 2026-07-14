/* ============================================================
   DEVAFE — Fallback Blog + Certificate Data
   Used until Supabase "blog_posts" / "certificates" tables
   have real rows. Edit directly or replace via Supabase.
   ============================================================ */

const BLOG_CATEGORIES = ['All', 'Data Science', 'Machine Learning', 'Web Development', 'Tutorials', 'Notes'];

const fallbackPosts = [
  {
    id: 'sample-post-1',
    slug: 'getting-started',
    title: 'A sample blog post title goes here',
    excerpt: 'A short 1-2 sentence excerpt that appears in the blog list and on the homepage.',
    content: `## Introduction\n\nReplace this whole post with real content once you're ready to write. This editor supports **Markdown** — headings, lists, bold text, code blocks, all of it.\n\n## A Section Heading\n\n- Point one\n- Point two\n- Point three\n\n\`\`\`python\nprint("code blocks render in monospace")\n\`\`\`\n\nWrap up your thoughts here.`,
    category: 'Notes',
    reading_time: 4,
    published_at: '2025-06-01'
  },
  {
    id: 'sample-post-2',
    slug: 'second-post',
    title: 'Another sample post title',
    excerpt: 'Add real posts by inserting rows into the "blog_posts" table in Supabase.',
    content: `Replace with your real content. See README.md for the table schema.`,
    category: 'Tutorials',
    reading_time: 6,
    published_at: '2025-05-10'
  }
];

const fallbackCertificates = [
  {
    id: 'sample-cert-1',
    title: 'Sample Certificate Title',
    issuer: 'Issuing Organization',
    issued_date: '2025-03-15',
    credential_id: 'ABC123',
    verify_url: '',
    featured: true
  },
  {
    id: 'sample-cert-2',
    title: 'Another Sample Certificate',
    issuer: 'Issuing Organization',
    issued_date: '2024-11-02',
    credential_id: 'XYZ789',
    verify_url: '',
    featured: false
  }
];
