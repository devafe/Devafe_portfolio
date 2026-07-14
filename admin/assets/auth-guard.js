/* ============================================================
   DEVAFE — Admin Auth Guard
   Include this on EVERY admin page except login.html.
   Redirects to login if there's no active session.
   ============================================================ */

async function requireAuth(){
  const { data: { session } } = await supabase.auth.getSession();
  if(!session){
    window.location.href = 'login.html';
    return null;
  }
  const emailEl = document.getElementById('admin-user-email');
  if(emailEl) emailEl.textContent = session.user.email;
  return session;
}

async function adminLogout(){
  await supabase.auth.signOut();
  window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
  requireAuth();
  const logoutBtn = document.getElementById('logout-btn');
  if(logoutBtn) logoutBtn.addEventListener('click', adminLogout);
});
