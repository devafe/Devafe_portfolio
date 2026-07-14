/* ============================================================
   DEVAFE — Blog Post Page Behavior
   Reads ?slug= from the URL and renders that post's content
   as Markdown (using the "marked" library loaded via CDN).
   ============================================================ */

function getSlugFromURL(){
  return new URLSearchParams(window.location.search).get('slug');
}

function renderPost(p){
  document.title = `${p.title} — DEVAFE`;
  document.getElementById('post-category').textContent = p.category || 'Post';
  document.getElementById('post-title').textContent = p.title;
  document.getElementById('post-date').textContent = formatDate(p.published_at);
  document.getElementById('post-reading-time').textContent = `${p.reading_time || 5} min read`;

  const bodyEl = document.getElementById('post-body');
  if(window.marked){
    bodyEl.innerHTML = marked.parse(p.content || '');
  } else {
    bodyEl.textContent = p.content || '';
  }
}

async function initBlogPost(){
  const slug = getSlugFromURL();
  const notFound = document.getElementById('not-found-state');
  const content = document.getElementById('post-content');

  if(!slug){ notFound.style.display = 'block'; content.style.display = 'none'; return; }

  let post = null;
  try{ post = await fetchPostBySlug(slug); }catch(e){ /* supabase not configured yet */ }
  if(!post){ post = fallbackPosts.find(p => p.slug === slug) || null; }

  if(!post){ notFound.style.display = 'block'; content.style.display = 'none'; return; }

  renderPost(post);
}

document.addEventListener('DOMContentLoaded', initBlogPost);
