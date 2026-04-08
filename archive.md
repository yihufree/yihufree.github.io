---
layout: default
title: 归档
---

# 笔记归档

{% assign postsByYear = site.posts | group_by_exp:"post", "post.date | date: '%Y'" %}
{% for year in postsByYear %}
## {{ year.name }} 年
<ul class="archive-list">
  {% for post in year.items %}
  <li>
    <span class="archive-date">{{ post.date | date: "%m-%d" }}</span>
    <a href="{{ post.url }}">{{ post.title }}</a>
  </li>
  {% endfor %}
</ul>
{% endfor %}