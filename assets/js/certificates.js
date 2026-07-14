/* ============================================================
   DEVAFE — Certificates Page Behavior
   ============================================================ */

function certCardHTML(c){
  return `
    <article class="card cert-card">
      ${c.featured ? '<span class="featured-badge">Featured</span>' : ''}
      <h3>${c.title}</h3>
      <p class="cert-issuer">${c.issuer || ''}</p>
      <div class="cert-meta">
        <span>${formatDate(c.issued_date)}</span>
        ${c.credential_id ? `<span>ID: ${c.credential_id}</span>` : ''}
      </div>
      ${c.verify_url ? `<a href="${c.verify_url}" target="_blank" rel="noopener" class="btn btn-ghost">Verify &rarr;</a>` : ''}
    </article>`;
}

async function initCertificatesPage(){
  let data = [];
  try{ data = await fetchAllCertificates(); }catch(e){ /* supabase not configured yet */ }
  const list = data.length ? data : fallbackCertificates;

  const grid = document.getElementById('cert-grid');
  grid.innerHTML = list.length
    ? list.map(certCardHTML).join('')
    : '<div class="empty-state">No certificates added yet.</div>';
}

document.addEventListener('DOMContentLoaded', initCertificatesPage);
