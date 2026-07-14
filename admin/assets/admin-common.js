/* ============================================================
   DEVAFE Admin — Shared helpers
   ============================================================ */

function showToast(msg, type = 'success'){
  const toast = document.getElementById('toast');
  if(!toast) return;
  toast.textContent = msg;
  toast.className = `toast show ${type}`;
  setTimeout(() => toast.classList.remove('show'), 2500);
}
