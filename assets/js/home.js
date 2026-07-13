/* ============================================================
   DEVAFE — Home Page Behavior
   ============================================================ */

/* --- Typing effect for the hero subline --- */
const typedPhrases = [
  'Data Scientist.',
  'Machine Learning Engineer.',
  'Web Developer.',
  'Problem Solver.'
];

function typeLoop(el){
  let phraseIndex = 0, charIndex = 0, deleting = false;

  function tick(){
    const phrase = typedPhrases[phraseIndex];
    el.textContent = deleting ? phrase.slice(0, charIndex--) : phrase.slice(0, charIndex++);

    let delay = deleting ? 40 : 70;

    if(!deleting && charIndex === phrase.length + 1){
      deleting = true;
      delay = 1400; // pause at full phrase
    } else if(deleting && charIndex === 0){
      deleting = false;
      phraseIndex = (phraseIndex + 1) % typedPhrases.length;
      delay = 300;
    }
    setTimeout(tick, delay);
  }
  tick();
}

/* --- Render a project card --- */
function projectCardHTML(p){
  const tags = (p.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
  return `
    <article class="card project-card">
      <h3>${p.title}</h3>
      <p>${p.summary}</p>
      <div class="tags">${tags}</div>
      <div class="links">
        ${p.github_url ? `<a href="${p.github_url}" target="_blank" rel="noopener">GitHub</a>` : ''}
        ${p.live_url ? `<a href="${p.live_url}" target="_blank" rel="noopener">Live Demo</a>` : ''}
      </div>
    </article>`;
}

/* --- Fallback static content, shown until Supabase is connected --- */
const fallbackProjects = [
  { title: 'Sample Project One', summary: 'Replace this with your real featured projects once Supabase is connected.', tags: ['Python', 'ML'] },
  { title: 'Sample Project Two', summary: 'Add rows to the "projects" table with featured = true to populate this.', tags: ['Data Analysis'] },
  { title: 'Sample Project Three', summary: 'See README.md for the Supabase table schema.', tags: ['Web Dev'] }
];

async function renderFeaturedProjects(){
  const grid = document.getElementById('featured-projects');
  if(!grid) return;
  let projects = [];
  try{ projects = await fetchFeaturedProjects(3); }catch(e){ /* supabase not configured yet */ }
  const list = projects.length ? projects : fallbackProjects;
  grid.innerHTML = list.map(projectCardHTML).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const typedEl = document.getElementById('hero-typed-text');
  if(typedEl) typeLoop(typedEl);
  renderFeaturedProjects();
});
