/* ============================================================
   DEVAFE — Blog Page Behavior
   ============================================================ */

let allPosts = [];
let activePostCategory = 'All';
let postSearchTerm = '';

function formatDate(dateStr){
  if(!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function postCardHTML(p){
  return `
    <a href="blog-post.html?slug=${encodeURIComponent(p.slug)}" style="text-decoration:none;color:inherit;">
      <article class="card article-card">
        <span class="cat-tag">${p.category || 'Post'}</span>
        <h3>${p.title}</h3>
        <p>${p.excerpt || ''}</p>
        <div style="display:flex;justify-content:space-between;margin-top:1rem;">
          <time>${formatDate(p.published_at)}</time>
          <span class="reading-time">${p.reading_time || 5} min read</span>
        </div>
      </article>
    </a>`;
}

function renderPosts(){
  let list = [...allPosts];
  if(activePostCategory !== 'All') list = list.filter(p => p.category === activePostCategory);
  if(postSearchTerm.trim()){
    const q = postSearchTerm.trim().toLowerCase();
    list = list.filter(p => p.title.toLowerCase().includes(q) || (p.excerpt || '').toLowerCase().includes(q));
  }
  const grid = document.getElementById('blog-grid');
  grid.innerHTML = list.length
    ? list.map(postCardHTML).join('')
    : '<div class="empty-state">No posts match your search yet.</div>';
}

function buildBlogPills(){
  const row = document.getElementById('blog-category-pills');
  row.innerHTML = BLOG_CATEGORIES.map(cat =>
    `<button class="pill ${cat === activePostCategory ? 'active' : ''}" data-cat="${cat}">${cat}</button>`
  ).join('');
  row.querySelectorAll('.pill').forEach(btn => {
    btn.addEventListener('click', () => {
      activePostCategory = btn.dataset.cat;
      buildBlogPills();
      renderPosts();
    });
  });
}

async function initBlogPage(){
  if(!document.getElementById('blog-grid')) return; // not on the blog listing page
  let data = [];
  try{ data = await fetchAllPosts(); }catch(e){ /* supabase not configured yet */ }
  allPosts = data.length ? data : fallbackPosts;

  buildBlogPills();
  renderPosts();

  document.getElementById('blog-search').addEventListener('input', (e) => {
    postSearchTerm = e.target.value;
    renderPosts();
  });
}

document.addEventListener('DOMContentLoaded', initBlogPage);
