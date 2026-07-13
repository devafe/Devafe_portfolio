/* ============================================================
   DEVAFE — Shared site behavior
   Loads the nav + footer partials into every page so you only
   ever edit them in ONE place: assets/partials/nav.html and
   assets/partials/footer.html
   ============================================================ */

async function loadPartial(id, url){
  const host = document.getElementById(id);
  if(!host) return;
  try{
    const res = await fetch(url);
    host.innerHTML = await res.text();
  }catch(err){
    console.error('Could not load partial:', url, err);
  }
}

function markActiveNavLink(){
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if(href === path) a.classList.add('active');
  });
}

function initMobileNav(){
  const toggle = document.querySelector('.nav-toggle');
  const mobile = document.querySelector('.nav-mobile');
  if(!toggle || !mobile) return;
  toggle.addEventListener('click', () => {
    mobile.classList.toggle('open');
    const expanded = mobile.classList.contains('open');
    toggle.setAttribute('aria-expanded', expanded);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadPartial('site-nav', 'assets/partials/nav.html');
  await loadPartial('site-footer', 'assets/partials/footer.html');
  markActiveNavLink();
  initMobileNav();
});
