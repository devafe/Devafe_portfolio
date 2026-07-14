/* ============================================================
   DEVAFE — Project Details Page Behavior
   Reads the ?id= query param and renders that project.
   ============================================================ */

function getProjectIdFromURL(){
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function renderProject(p){
  document.title = `${p.title} — DEVAFE`;

  document.getElementById('detail-category').textContent = p.category || 'Project';
  document.getElementById('detail-title').textContent = p.title;
  document.getElementById('detail-summary').textContent = p.summary || '';

  const links = document.getElementById('detail-links');
  links.innerHTML = `
    ${p.github_url ? `<a href="${p.github_url}" target="_blank" rel="noopener" class="btn btn-ghost">GitHub &rarr;</a>` : ''}
    ${p.live_url ? `<a href="${p.live_url}" target="_blank" rel="noopener" class="btn btn-primary">Live Demo &rarr;</a>` : ''}
  `;

  const img = document.getElementById('detail-image');
  if(p.image_url){
    img.src = p.image_url;
    img.parentElement.style.display = 'block';
  } else {
    img.parentElement.style.display = 'none';
  }

  document.getElementById('detail-problem').textContent = p.problem || 'Not documented yet.';
  document.getElementById('detail-solution').textContent = p.solution || 'Not documented yet.';

  document.getElementById('detail-features').innerHTML =
    (p.features || []).map(f => `<li>${f}</li>`).join('') || '<li>Not documented yet.</li>';

  document.getElementById('detail-tech').innerHTML =
    (p.technologies || []).map(t => `<span class="tag">${t}</span>`).join('');

  const shotGrid = document.getElementById('detail-screenshots');
  const shotBlock = document.getElementById('detail-screenshots-block');
  if(p.screenshots && p.screenshots.length){
    shotGrid.innerHTML = p.screenshots.map(src => `<img src="${src}" alt="${p.title} screenshot">`).join('');
    shotBlock.style.display = 'block';
  } else {
    shotBlock.style.display = 'none';
  }

  document.getElementById('detail-lessons').textContent = p.lessons_learned || 'Not documented yet.';
  document.getElementById('detail-future').textContent = p.future_improvements || 'Not documented yet.';
}

async function initProjectDetails(){
  const id = getProjectIdFromURL();
  const notFound = document.getElementById('not-found-state');
  const content = document.getElementById('detail-content');

  if(!id){ notFound.style.display = 'block'; content.style.display = 'none'; return; }

  let project = null;
  try{ project = await fetchProjectById(id); }catch(e){ /* supabase not configured yet */ }

  if(!project){
    project = fallbackProjectsFull.find(p => p.id === id) || null;
  }

  if(!project){ notFound.style.display = 'block'; content.style.display = 'none'; return; }

  renderProject(project);
}

document.addEventListener('DOMContentLoaded', initProjectDetails);
