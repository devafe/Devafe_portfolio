/* ============================================================
   DEVAFE Admin — Certificates CRUD
   ============================================================ */

let editingCertId = null;

function openCertModal(cert = null){
  editingCertId = cert ? cert.id : null;
  document.getElementById('modal-title').textContent = cert ? 'Edit Certificate' : 'Add Certificate';
  document.getElementById('cf-title').value = cert?.title || '';
  document.getElementById('cf-issuer').value = cert?.issuer || '';
  document.getElementById('cf-date').value = cert?.issued_date || '';
  document.getElementById('cf-credential').value = cert?.credential_id || '';
  document.getElementById('cf-verify').value = cert?.verify_url || '';
  document.getElementById('cf-image').value = cert?.image_url || '';
  document.getElementById('cf-featured').checked = !!cert?.featured;
  document.getElementById('cert-modal').classList.add('open');
}

function closeCertModal(){ document.getElementById('cert-modal').classList.remove('open'); }

async function loadCertsTable(){
  const { data, error } = await supabase.from('certificates').select('*').order('issued_date', { ascending: false });
  const tbody = document.getElementById('certs-tbody');
  if(error){ tbody.innerHTML = `<tr><td colspan="4">Error: ${error.message}</td></tr>`; return; }
  if(!data.length){ tbody.innerHTML = '<tr><td colspan="4">No certificates yet.</td></tr>'; return; }

  tbody.innerHTML = data.map(c => `
    <tr>
      <td>${c.title} ${c.featured ? '<span class="badge on">Featured</span>' : ''}</td>
      <td>${c.issuer || '—'}</td>
      <td>${c.issued_date ? new Date(c.issued_date).toLocaleDateString() : '—'}</td>
      <td>
        <div class="row-actions">
          <button data-edit="${c.id}">Edit</button>
          <button data-delete="${c.id}" class="danger">Delete</button>
        </div>
      </td>
    </tr>`).join('');

  tbody.querySelectorAll('[data-edit]').forEach(btn => {
    btn.addEventListener('click', () => openCertModal(data.find(c => c.id === btn.dataset.edit)));
  });
  tbody.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', () => deleteCert(btn.dataset.delete));
  });
}

async function deleteCert(id){
  if(!confirm('Delete this certificate?')) return;
  const { error } = await supabase.from('certificates').delete().eq('id', id);
  if(error){ showToast(error.message, 'error'); return; }
  showToast('Certificate deleted');
  loadCertsTable();
}

async function saveCert(e){
  e.preventDefault();
  const payload = {
    title: document.getElementById('cf-title').value.trim(),
    issuer: document.getElementById('cf-issuer').value.trim(),
    issued_date: document.getElementById('cf-date').value || null,
    credential_id: document.getElementById('cf-credential').value.trim(),
    verify_url: document.getElementById('cf-verify').value.trim(),
    image_url: document.getElementById('cf-image').value.trim(),
    featured: document.getElementById('cf-featured').checked
  };

  const query = editingCertId
    ? supabase.from('certificates').update(payload).eq('id', editingCertId)
    : supabase.from('certificates').insert([payload]);

  const { error } = await query;
  if(error){ showToast(error.message, 'error'); return; }
  showToast(editingCertId ? 'Certificate updated' : 'Certificate added');
  closeCertModal();
  loadCertsTable();
}

document.addEventListener('DOMContentLoaded', () => {
  loadCertsTable();
  document.getElementById('add-cert-btn').addEventListener('click', () => openCertModal());
  document.getElementById('cert-form').addEventListener('submit', saveCert);
  document.getElementById('modal-cancel').addEventListener('click', closeCertModal);
});
