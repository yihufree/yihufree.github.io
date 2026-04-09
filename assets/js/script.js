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
const floatingNav = document.getElementById('floatingNav');
const prevBtn = document.getElementById('prevPost');
const homeBtn = document.getElementById('backToHome');
const nextBtn = document.getElementById('nextPost');

if (floatingNav && prevBtn && homeBtn && nextBtn) {
  // 获取所有文章数据
  let allPosts = [];
  
  // 尝试从搜索数据获取文章列表
  fetch('/search.json')
    .then(response => response.json())
    .then(posts => {
      allPosts = posts;
      updateNavigationButtons();
    })
    .catch(error => {
      console.error('获取文章列表失败:', error);
      // 如果搜索数据获取失败，尝试从页面元素获取
      updateNavigationButtons();
    });
  
  // 更新导航按钮状态
  function updateNavigationButtons() {
    const currentPath = window.location.pathname;
    
    // 如果是主页，隐藏浮动导航
    if (currentPath === '/' || currentPath === '/index.html') {
      floatingNav.style.display = 'none';
      return;
    }
    
    // 显示浮动导航
    floatingNav.style.display = 'flex';
    
    // 如果无法获取文章数据，禁用上一篇/下一篇按钮
    if (allPosts.length === 0) {
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }
    
    // 查找当前文章在列表中的位置
    const currentIndex = allPosts.findIndex(post => 
      post.url === currentPath || post.url === currentPath.replace('.html', '')
    );
    
    if (currentIndex === -1) {
      // 当前文章不在列表中，禁用导航按钮
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }
    
    // 更新上一篇按钮状态
    if (currentIndex > 0) {
      prevBtn.disabled = false;
      prevBtn.onclick = () => {
        window.location.href = allPosts[currentIndex - 1].url;
      };
    } else {
      prevBtn.disabled = true;
    }
    
    // 更新下一篇按钮状态
    if (currentIndex < allPosts.length - 1) {
      nextBtn.disabled = false;
      nextBtn.onclick = () => {
        window.location.href = allPosts[currentIndex + 1].url;
      };
    } else {
      nextBtn.disabled = true;
    }
  }
  
  // 返回主页按钮功能
  homeBtn.onclick = () => {
    window.location.href = '/';
  };
  
  // 监听页面变化（用于单页应用或动态加载）
  window.addEventListener('popstate', updateNavigationButtons);
}