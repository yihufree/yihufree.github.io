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

// 搜索功能
const input = document.getElementById('search-input');
const results = document.getElementById('search-results');
const postsList = document.getElementById('posts-list');

if (input && results && postsList) {
  // 输入事件监听
  input.addEventListener('input', async () => {
    const query = input.value.trim().toLowerCase();
    
    // 清空搜索结果，显示原始列表
    if (!query) {
      results.innerHTML = '';
      postsList.style.display = 'block';
      return;
    }
    
    try {
      // 获取搜索数据
      const response = await fetch('/search.json');
      const allPosts = await response.json();
      
      // 过滤匹配的文章
      const matchedPosts = allPosts.filter(post =>
        post.title.toLowerCase().includes(query) || 
        post.content.toLowerCase().includes(query)
      );
      
      // 生成搜索结果 HTML
      let html = '';
      matchedPosts.forEach(post => {
        html += `<div class="search-result-item"><a href="${post.url}">${post.title}</a> <small>${post.date}</small></div>`;
      });
      
      // 显示搜索结果
      results.innerHTML = html;
      postsList.style.display = 'none';
    } catch (error) {
      console.error('搜索失败:', error);
      results.innerHTML = '<div>搜索失败，请稍后重试</div>';
    }
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

// 浮动导航按钮功能
document.addEventListener('DOMContentLoaded', function() {
  const floatingNav = document.getElementById('floatingNav');
  const prevBtn = document.getElementById('prevPost');
  const homeBtn = document.getElementById('backToHome');
  const nextBtn = document.getElementById('nextPost');

  if (floatingNav && prevBtn && homeBtn && nextBtn) {
    // 如果是主页，隐藏浮动导航
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath === '/index.html' || currentPath === '/index') {
      floatingNav.style.display = 'none';
    } else {
      // 显示浮动导航
      floatingNav.style.display = 'flex';
      
      // 返回主页按钮功能
      homeBtn.addEventListener('click', () => {
        window.location.href = '/';
      });
      
      // 上一篇/下一篇按钮暂时禁用（简化实现）
      prevBtn.disabled = true;
      nextBtn.disabled = true;
    }
  }
});