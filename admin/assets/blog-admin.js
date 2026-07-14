/* ============================================================
   DEVAFE Admin — Blog Posts CRUD
   ============================================================ */

let editingPostId = null;

function slugify(str){
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function openPostModal(post = null){
  editingPostId = post ? post.id : null;
  document.getElementById('modal-title').textContent = post ? 'Edit Post' : 'New Post';
  document.getElementById('bf-title').value = post?.title || '';
  document.getElementById('bf-slug').value = post?.slug || '';
  document.getElementById('bf-category').value = post?.category || 'Notes';
  document.getElementById('bf-excerpt').value = post?.excerpt || '';
  document.getElementById('bf-reading-time').value = post?.reading_time || 5;
  document.getElementById('bf-content').value = post?.content || '';
  document.getElementById('post-modal').classList.add('open');
}

function closePostModal(){ document.getElementById('post-modal').classList.remove('open'); }

async function loadPostsTable(){
  const { data, error } = await supabase.from('blog_posts').select('*').order('published_at', { ascending: false });
  const tbody = document.getElementById('posts-tbody');
  if(error){ tbody.innerHTML = `<tr><td colspan="4">Error: ${error.message}</td></tr>`; return; }
  if(!data.length){ tbody.innerHTML = '<tr><td colspan="4">No posts yet.</td></tr>'; return; }

  tbody.innerHTML = data.map(p => `
    <tr>
      <td>${p.title}</td>
      <td>${p.category || '—'}</td>
      <td>${p.published_at ? new Date(p.published_at).toLocaleDateString() : '—'}</td>
      <td>
        <div class="row-actions">
          <button data-edit="${p.id}">Edit</button>
          <button data-delete="${p.id}" class="danger">Delete</button>
        </div>
      </td>
    </tr>`).join('');

  tbody.querySelectorAll('[data-edit]').forEach(btn => {
    btn.addEventListener('click', () => openPostModal(data.find(p => p.id === btn.dataset.edit)));
  });
  tbody.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', () => deletePost(btn.dataset.delete));
  });
}

async function deletePost(id){
  if(!confirm('Delete this post?')) return;
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if(error){ showToast(error.message, 'error'); return; }
  showToast('Post deleted');
  loadPostsTable();
}

async function savePost(e){
  e.preventDefault();
  const title = document.getElementById('bf-title').value.trim();
  const slugInput = document.getElementById('bf-slug').value.trim();
  const payload = {
    title,
    slug: slugInput || slugify(title),
    category: document.getElementById('bf-category').value,
    excerpt: document.getElementById('bf-excerpt').value.trim(),
    reading_time: parseInt(document.getElementById('bf-reading-time').value) || 5,
    content: document.getElementById('bf-content').value
  };
  if(!editingPostId) payload.published_at = new Date().toISOString();

  const query = editingPostId
    ? supabase.from('blog_posts').update(payload).eq('id', editingPostId)
    : supabase.from('blog_posts').insert([payload]);

  const { error } = await query;
  if(error){ showToast(error.message, 'error'); return; }
  showToast(editingPostId ? 'Post updated' : 'Post published');
  closePostModal();
  loadPostsTable();
}

document.addEventListener('DOMContentLoaded', () => {
  loadPostsTable();
  document.getElementById('add-post-btn').addEventListener('click', () => openPostModal());
  document.getElementById('post-form').addEventListener('submit', savePost);
  document.getElementById('modal-cancel').addEventListener('click', closePostModal);
  document.getElementById('bf-title').addEventListener('blur', (e) => {
    const slugField = document.getElementById('bf-slug');
    if(!slugField.value.trim()) slugField.value = slugify(e.target.value);
  });
});
