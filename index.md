---
layout: default
title: 首页
home: true
---

<div class="home-layout">
  <!-- 左侧栏：个人信息区域 + 目录侧边栏（上下排列） -->
  <aside class="home-left-column">
    <!-- 个人信息区域 -->
    <div class="home-header">
      <img src="/assets/images/avatar.jpg" alt="头像" class="avatar">
      <h1>学习笔记</h1>
      <p>持续学习，持续记录</p>
    </div>
    
    <!-- 目录侧边栏 -->
    <nav class="sidebar">
      <div class="toc">
        <strong>目录</strong>
        {% include toc.html html=content %}
      </div>
    </nav>
  </aside>
  
  <!-- 右侧栏：内容区域 -->
  <main class="home-content">
    <input type="text" id="search-input" placeholder="搜索笔记..." style="width:100%;padding:10px;margin-bottom:20px;font-size:16px;border-radius:6px;border:1px solid #ddd;">
    <div id="search-results"></div>
    
    <div id="posts-list">

{% for post in site.posts %}

<article class="post-item">
  <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
  <h2 class="post-title"><a href="{{ post.url }}">{{ post.title }}</a></h2>
  {% if post.tags %}
  <div class="post-tags">
    {% for tag in post.tags %}
    <a href="/tags.html#{{ tag }}" class="post-tag">{{ tag }}</a>
    {% endfor %}
  </div>
  {% endif %}
</article>
{% endfor %}
</div>

<div class="pagination">
  {% if paginator.previous_page %}
  <a href="{{ paginator.previous_page_path }}">上一页</a>
  {% endif %}
  {% if paginator.next_page %}
  <a href="{{ paginator.next_page_path }}">下一页</a>
  {% endif %}
</div>
    </main>
</div>

<nav class="site-nav" style="margin-top:30px;">
  <a href="/archive.html">笔记归档</a> |
  <a href="/tags.html">标签分类</a> |
  <a href="/feed.xml">RSS 订阅</a>
</nav>