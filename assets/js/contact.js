/* ============================================================
   DEVAFE — Contact Page Behavior
   Submits the form into Supabase's "contact_messages" table.
   Falls back to a mailto link if Supabase isn't configured yet.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if(!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    if(!name || !email || !message){
      status.textContent = 'Please fill in all fields.';
      status.className = 'form-status error';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try{
      await submitContactMessage({ name, email, message });
      status.textContent = "Message sent — I'll get back to you soon.";
      status.className = 'form-status success';
      form.reset();
    }catch(err){
      console.error(err);
      status.innerHTML = `Couldn't send right now. Email me directly instead: <a href="mailto:YOUR_EMAIL@example.com">YOUR_EMAIL@example.com</a>`;
      status.className = 'form-status error';
    }finally{
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
});
