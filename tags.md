---
layout: default
title: 标签
---

<h1>标签</h1>

{% assign tags = site.tags | sort %}

<div class="tags-cloud">
  {% for tag in tags %}
  <div class="tag-item">
    <a href="#{{ tag[0] }}" class="tag-link">
      {{ tag[0] }} <span class="tag-count">({{ tag[1].size }})</span>
    </a>
  </div>
  {% endfor %}
</div>

<div class="tags-list">
  {% for tag in tags %}
  <div id="{{ tag[0] }}" class="tag-section">
    <h2>{{ tag[0] }}</h2>
    <ul class="tag-posts">
      {% for post in tag[1] %}
      <li>
        <a href="{{ post.url }}">{{ post.title }}</a>
        <span class="post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
      </li>
      {% endfor %}
    </ul>
  </div>
  {% endfor %}
</div>