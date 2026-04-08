---
layout: default
title: 归档
---

# 笔记归档

{% assign postsByYear = site.posts | group_by_exp:"post", "post.date | date: '%Y'" %}
{% for year in postsByYear %}
## {{ year.name }} 年
<ul style="list-style:none;padding-left:0;">
  {% for post in year.items %}
  <li style="margin:5px 0;">
    <span>{{ post.date | date: "%m-%d" }}</span>
    <a href="{{ post.url }}">{{ post.title }}</a>
  </li>
  {% endfor %}
</ul>
{% endfor %}