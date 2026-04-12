// 暗黑模式
const darkToggle = document.getElementById('darkToggle');
if (darkToggle) {
  // 初始化暗黑模式状态
  if (localStorage.getItem('dark') === '1') {
    document.body.classList.add('dark');
  }
  
  // 切换暗黑模式
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('dark', document.body.classList.contains('dark') ? '1' : '0');
  });
}

// 返回顶部
const backBtn = document.getElementById('backToTop');
if (backBtn) {
  // 滚动事件监听
  window.addEventListener('scroll', () => {
    backBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  
  // 点击返回顶部
  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 搜索功能 - 双重数据源方案
const input = document.getElementById('search-input');
const results = document.getElementById('search-results');
const postsList = document.getElementById('posts-list');

if (input && results && postsList) {
  // 从页面提取文章数据
  const extractPostsFromPage = () => {
    const posts = [];
    document.querySelectorAll('.post-item').forEach(item => {
      const titleEl = item.querySelector('.post-title a');
      const dateEl = item.querySelector('.post-date');
      if (titleEl) {
        posts.push({
          title: titleEl.textContent.trim(),
          url: titleEl.getAttribute('href'),
          date: dateEl ? dateEl.textContent.trim() : ''
        });
      }
    });
    return posts;
  };
  
  let allPosts = extractPostsFromPage();
  let useLocalData = allPosts.length > 0;
  
  // 如果页面没有数据，尝试从search.json获取（备用方案）
  if (!useLocalData) {
    fetch('/search.json')
      .then(response => response.json())
      .then(data => {
        allPosts = data;
        useLocalData = true;
      })
      .catch(error => {
        console.warn('无法加载search.json:', error);
      });
  }
  
  // 输入事件监听
  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    
    // 清空搜索结果，显示原始列表
    if (!query) {
      results.innerHTML = '';
      postsList.style.display = 'block';
      return;
    }
    
    // 等待数据加载完成
    if (!useLocalData || allPosts.length === 0) {
      results.innerHTML = '<div>正在加载数据...</div>';
      return;
    }
    
    // 过滤匹配的文章
    const matchedPosts = allPosts.filter(post =>
      post.title.toLowerCase().includes(query)
    );
    
    // 生成搜索结果 HTML
    let html = `<div style="margin-bottom: 16px; color: var(--muted); font-size: 14px;">找到 ${matchedPosts.length} 条结果</div>`;
    matchedPosts.forEach(post => {
      html += `<div class="search-result-item"><a href="${post.url}">${post.title}</a> <small>${post.date}</small></div>`;
    });
    
    // 显示搜索结果
    results.innerHTML = html;
    postsList.style.display = 'none';
  });
}

// 目录滚动跟踪
const tocItems = document.querySelectorAll('.toc a');
if (tocItems.length > 0) {
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    
    document.querySelectorAll('h1, h2, h3').forEach(heading => {
      const headingTop = heading.offsetTop;
      const headingBottom = headingTop + heading.offsetHeight;
      
      if (scrollPosition >= headingTop && scrollPosition < headingBottom) {
        const id = heading.id || heading.getAttribute('id');
        if (id) {
          tocItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${id}`) {
              item.classList.add('active');
            }
          });
        }
      }
    });
  });
}

