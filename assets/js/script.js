// 暗黑模式
const darkToggle = document.getElementById('darkToggle');
if (darkToggle) {
  if (localStorage.getItem('dark') === '1') document.body.classList.add('dark');
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('dark', document.body.classList.contains('dark') ? '1' : '0');
  });
}

// 返回顶部
const backBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backBtn.addEventListener('click', () => {
  window.scrollTo({ top:0, behavior: 'smooth' });
});

// 搜索
const input = document.getElementById('search-input');
const results = document.getElementById('search-results');
const postsList = document.getElementById('posts-list');
if (input) {
  input.addEventListener('input', async () => {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      results.innerHTML = '';
      postsList.style.display = 'block';
      return;
    }
    const res = await fetch('/search.json');
    const all = await res.json();
    const matched = all.filter(p =>
      p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q)
    );
    let html = '';
    matched.forEach(p => {
      html += `<div><a href="${p.url}">${p.title}</a> <small>${p.date}</small></div>`;
    });
    results.innerHTML = html;
    postsList.style.display = 'none';
  });
}