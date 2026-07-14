/* ============================================================
   DEVAFE Admin — Projects CRUD
   ============================================================ */

let editingProjectId = null;

function showToast(msg, type = 'success'){
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `toast show ${type}`;
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function openProjectModal(project = null){
  editingProjectId = project ? project.id : null;
  document.getElementById('modal-title').textContent = project ? 'Edit Project' : 'Add Project';
  document.getElementById('pf-title').value = project?.title || '';
  document.getElementById('pf-summary').value = project?.summary || '';
  document.getElementById('pf-category').value = project?.category || 'Other';
  document.getElementById('pf-tags').value = (project?.tags || []).join(', ');
  document.getElementById('pf-github').value = project?.github_url || '';
  document.getElementById('pf-live').value = project?.live_url || '';
  document.getElementById('pf-image').value = project?.image_url || '';
  document.getElementById('pf-problem').value = project?.problem || '';
  document.getElementById('pf-solution').value = project?.solution || '';
  document.getElementById('pf-features').value = (project?.features || []).join('\n');
  document.getElementById('pf-tech').value = (project?.technologies || []).join(', ');
  document.getElementById('pf-lessons').value = project?.lessons_learned || '';
  document.getElementById('pf-future').value = project?.future_improvements || '';
  document.getElementById('pf-featured').checked = !!project?.featured;
  document.getElementById('project-modal').classList.add('open');
}

function closeProjectModal(){
  document.getElementById('project-modal').classList.remove('open');
}

async function loadProjectsTable(){
  const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
  const tbody = document.getElementById('projects-tbody');
  if(error){ tbody.innerHTML = `<tr><td colspan="4">Error loading: ${error.message}</td></tr>`; return; }

  if(!data.length){
    tbody.innerHTML = '<tr><td colspan="4">No projects yet — add your first one.</td></tr>';
    return;
  }

  tbody.innerHTML = data.map(p => `
    <tr>
      <td>${p.title} ${p.featured ? '<span class="badge on">Featured</span>' : ''}</td>
      <td>${p.category || '—'}</td>
      <td>${p.created_at ? new Date(p.created_at).toLocaleDateString() : '—'}</td>
      <td>
        <div class="row-actions">
          <button data-edit="${p.id}">Edit</button>
          <button data-delete="${p.id}" class="danger">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('[data-edit]').forEach(btn => {
    btn.addEventListener('click', () => {
      const project = data.find(p => p.id === btn.dataset.edit);
      openProjectModal(project);
    });
  });
  tbody.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', () => deleteProject(btn.dataset.delete));
  });
}

async function deleteProject(id){
  if(!confirm('Delete this project? This cannot be undone.')) return;
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if(error){ showToast(error.message, 'error'); return; }
  showToast('Project deleted');
  loadProjectsTable();
}

async function saveProject(e){
  e.preventDefault();
  const payload = {
    title: document.getElementById('pf-title').value.trim(),
    summary: document.getElementById('pf-summary').value.trim(),
    category: document.getElementById('pf-category').value,
    tags: document.getElementById('pf-tags').value.split(',').map(s => s.trim()).filter(Boolean),
    github_url: document.getElementById('pf-github').value.trim(),
    live_url: document.getElementById('pf-live').value.trim(),
    image_url: document.getElementById('pf-image').value.trim(),
    problem: document.getElementById('pf-problem').value.trim(),
    solution: document.getElementById('pf-solution').value.trim(),
    features: document.getElementById('pf-features').value.split('\n').map(s => s.trim()).filter(Boolean),
    technologies: document.getElementById('pf-tech').value.split(',').map(s => s.trim()).filter(Boolean),
    lessons_learned: document.getElementById('pf-lessons').value.trim(),
    future_improvements: document.getElementById('pf-future').value.trim(),
    featured: document.getElementById('pf-featured').checked
  };

  const query = editingProjectId
    ? supabase.from('projects').update(payload).eq('id', editingProjectId)
    : supabase.from('projects').insert([payload]);

  const { error } = await query;
  if(error){ showToast(error.message, 'error'); return; }

  showToast(editingProjectId ? 'Project updated' : 'Project added');
  closeProjectModal();
  loadProjectsTable();
}

document.addEventListener('DOMContentLoaded', () => {
  loadProjectsTable();
  document.getElementById('add-project-btn').addEventListener('click', () => openProjectModal());
  document.getElementById('project-form').addEventListener('submit', saveProject);
  document.getElementById('modal-cancel').addEventListener('click', closeProjectModal);
});
