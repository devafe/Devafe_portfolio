/* ============================================================
   DEVAFE — Projects Page Behavior
   ============================================================ */

let allProjects = [];
let activeCategory = 'All';
let searchTerm = '';
let sortMode = 'newest';

function projectGridCardHTML(p){
  const tags = (p.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
  return `
    <a href="project-details.html?id=${encodeURIComponent(p.id)}" style="text-decoration:none;color:inherit;">
      <article class="card project-card">
        ${p.featured ? '<span class="featured-badge">Featured</span>' : ''}
        <h3>${p.title}</h3>
        <p>${p.summary}</p>
        <div class="tags">${tags}</div>
      </article>
    </a>`;
}

function applyFiltersAndRender(){
  let list = [...allProjects];

  if(activeCategory !== 'All'){
    list = list.filter(p => p.category === activeCategory);
  }
  if(searchTerm.trim()){
    const q = searchTerm.trim().toLowerCase();
    list = list.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.summary || '').toLowerCase().includes(q) ||
      (p.tags || []).some(t => t.toLowerCase().includes(q))
    );
  }

  list.sort((a, b) => {
    if(sortMode === 'az') return a.title.localeCompare(b.title);
    if(sortMode === 'oldest') return new Date(a.created_at) - new Date(b.created_at);
    return new Date(b.created_at) - new Date(a.created_at); // newest
  });

  const grid = document.getElementById('projects-grid');
  const count = document.getElementById('results-count');
  count.textContent = `${list.length} project${list.length === 1 ? '' : 's'}`;

  grid.innerHTML = list.length
    ? list.map(projectGridCardHTML).join('')
    : '<div class="empty-state">No projects match your filters. Try clearing the search or picking a different category.</div>';
}

function buildCategoryPills(){
  const row = document.getElementById('category-pills');
  row.innerHTML = PROJECT_CATEGORIES.map(cat =>
    `<button class="pill ${cat === activeCategory ? 'active' : ''}" data-cat="${cat}">${cat}</button>`
  ).join('');

  row.querySelectorAll('.pill').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat;
      buildCategoryPills();
      applyFiltersAndRender();
    });
  });
}

async function initProjectsPage(){
  let data = [];
  try{ data = await fetchAllProjects(); }catch(e){ /* supabase not configured yet */ }
  allProjects = data.length ? data : fallbackProjectsFull;

  buildCategoryPills();
  applyFiltersAndRender();

  document.getElementById('project-search').addEventListener('input', (e) => {
    searchTerm = e.target.value;
    applyFiltersAndRender();
  });

  document.getElementById('sort-select').addEventListener('change', (e) => {
    sortMode = e.target.value;
    applyFiltersAndRender();
  });
}

document.addEventListener('DOMContentLoaded', initProjectsPage);
