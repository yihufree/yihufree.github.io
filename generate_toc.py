#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
文章目录自动生成脚本
自动从 _posts 文件夹生成静态的文章目录
支持三种更新方案：手动运行、Git钩子、GitHub Actions

使用方法：
1. 直接运行：python generate_toc.py
2. 或使用参数：python generate_toc.py --output github

三种更新方案：
方案一：手动运行脚本（默认方案）
方案二：Git提交钩子（推荐本地开发）
方案三：GitHub Actions（推荐生产环境）
"""

import os
import re
import yaml
import argparse
from datetime import datetime
from pathlib import Path

class ArticleTocGenerator:
    def __init__(self, posts_dir="_posts", output_file="文章目录.md"):
        self.posts_dir = Path(posts_dir)
        self.output_file = Path(output_file)
        self.articles = []
        
    def parse_article(self, file_path):
        """解析单篇文章的YAML front matter"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 提取YAML front matter
            yaml_match = re.match(r'^---\n(.+?)\n---\n', content, re.DOTALL)
            if not yaml_match:
                return None
                
            yaml_content = yaml_match.group(1)
            metadata = yaml.safe_load(yaml_content)
            
            # 获取文章基本信息
            title = metadata.get('title', '无标题')
            date = metadata.get('date', '')
            tags = metadata.get('tags', [])
            
            # 将标题中的英文方括号替换为中文括号，防止破坏 Markdown 链接语法
            title = title.replace('[', '（').replace(']', '）')

            # 2026-04-17 10:45:00 修改：将日期统一转为字符串，避免datetime对象与字符串混用导致切片错误
            if hasattr(date, 'strftime'):
                date = date.strftime('%Y-%m-%d')
            
            # 生成文章URL（指向_posts目录下的MD文件，便于在GitHub仓库中直接浏览）
            filename = file_path.stem
            url = f"_posts/{file_path.name}"
            
            return {
                'title': title,
                'date': date,
                'tags': tags if isinstance(tags, list) else [tags] if tags else [],
                'url': url,
                'filename': filename
            }
            
        except Exception as e:
            print(f"解析文章 {file_path} 时出错: {e}")
            return None
    
    def scan_articles(self):
        """扫描_posts文件夹中的所有文章"""
        if not self.posts_dir.exists():
            print(f"错误：{self.posts_dir} 文件夹不存在")
            return
            
        articles = []
        for file_path in self.posts_dir.glob("*.md"):
            article = self.parse_article(file_path)
            if article:
                articles.append(article)
        
        # 按日期排序（最新的在前）
        # 2026-04-17 10:30:00 修改：将日期统一转为字符串比较，避免datetime.datetime与datetime.date类型不兼容问题
        self.articles = sorted(articles, key=lambda x: str(x['date']) if x['date'] else '', reverse=True)
        print(f"找到 {len(self.articles)} 篇文章")
    
    def generate_github_toc(self):
        """生成GitHub显示的静态版本"""
        if not self.articles:
            return "# 文章目录\n\n暂无文章"
        
        # 统计信息
        all_tags = set()
        for article in self.articles:
            all_tags.update(article['tags'])
        
        # 按年份分组
        articles_by_year = {}
        for article in self.articles:
            if article['date']:
                year = article['date'][:4] if len(article['date']) >= 4 else '未知'
            else:
                year = '未知'
            
            if year not in articles_by_year:
                articles_by_year[year] = []
            articles_by_year[year].append(article)
        
        # 按标签分组
        articles_by_tag = {}
        for article in self.articles:
            for tag in article['tags']:
                if tag not in articles_by_tag:
                    articles_by_tag[tag] = []
                articles_by_tag[tag].append(article)
        
        toc_content = ["# 文章目录", "",
                      "本文档列出了本仓库中的所有笔记文章，方便在 GitHub 上直接浏览。", "",
                      "> **提示**：访问 [https://yifree.github.io](https://yifree.github.io) 可以获得更好的阅读体验，包括目录导航、搜索功能、暗黑模式等。", "",
                      "---", "",
                      "## 📊 统计信息", "",
                      "| 指标 | 数量 |",
                      "|------|------|",
                      f"| **文章总数** | {len(self.articles)} 篇 |",
                      f"| **标签总数** | {len(all_tags)} 个 |",
                      f"| **最新更新** | {self.articles[0]['date'][:10] if self.articles[0]['date'] else '未知'} |", "",
                      "---", "",
                      "## 🗓️ 年度导航", ""]
        
        # 年度导航
        years = sorted(articles_by_year.keys(), reverse=True)
        year_links = [f"[{year} 年](#{year}-年)" for year in years]
        toc_content.append(" ".join(year_links))
        toc_content.extend(["", "---", "", "## 🏷️ 热门标签", ""])
        
        # 热门标签（按文章数量排序）
        tag_counts = {tag: len(articles) for tag, articles in articles_by_tag.items()}
        popular_tags = sorted(tag_counts.items(), key=lambda x: x[1], reverse=True)[:10]
        tag_links = [f"[{tag}](#{tag})" for tag, _ in popular_tags]
        toc_content.append(" ".join(tag_links))
        toc_content.extend(["", "---", "", "## 📖 最新文章", "",
                          "| 序号 | 标题 | 日期 | 标签 |",
                          "|------|------|------|------|"])
        
        # 最新文章表格
        for i, article in enumerate(self.articles[:10], 1):
            tags_str = " ".join([f"`{tag}`" for tag in article['tags']])
            toc_content.append(f"| {i} | [{article['title']}]({article['url']}) | {article['date'][:10] if article['date'] else '未知'} | {tags_str} |")
        
        toc_content.extend(["", "---", "", "## 📚 所有文章", ""])
        
        # 按年份显示所有文章
        for year in years:
            toc_content.extend([f"### {year} 年", ""])
            for article in articles_by_year[year]:
                toc_content.append(f"- **{article['date'][:10] if article['date'] else '未知'}** - [{article['title']}]({article['url']})")
                if article['tags']:
                    tags_str = " ".join([f"`{tag}`" for tag in article['tags']])
                    toc_content.append(f"  - 标签：{tags_str}")
            toc_content.append("")
        
        toc_content.extend(["---", "", "## 🏷️ 按标签分类", ""])
        
        # 按标签分类
        for tag in sorted(articles_by_tag.keys()):
            toc_content.extend([f"### {tag}", ""])
            for article in articles_by_tag[tag]:
                toc_content.append(f"- [{article['title']}]({article['url']}) - {article['date'][:10] if article['date'] else '未知'}")
            toc_content.append("")
        
        toc_content.extend(["---", "", "## 📝 写作规范", "",
                          "### 文件命名",
                          "- 格式：`YYYY-MM-DD-文章标题.md`",
                          "- 示例：`2026-04-08-我的第一篇笔记.md`", "",
                          "### 文章格式", "",
                          "```markdown",
                          "---",
                          "layout: post",
                          "title: 文章标题",
                          "date: YYYY-MM-DD",
                          "tags: [标签1, 标签2, 标签3]",
                          "---", "",
                          "# 文章主标题", "",
                          "## 一、一级标题", "",
                          "### 1.1 二级标题", "",
                          "#### 1.1.1 三级标题", "",
                          "正文内容...",
                          "```", "",
                          "### 标题层级",
                          "- `#` - 文章主标题（一级标题）",
                          "- `##` - 章节标题（二级标题）",
                          "- `###` - 小节标题（三级标题）",
                          "- `####` - 细节标题（四级标题）",
                          "- `#####` - 最小标题（五级标题）", "",
                          "---", "",
                          "## 🔗 快速链接", "",
                          "- [🏠 首页](https://yifree.github.io/)",
                          "- [📂 归档](https://yifree.github.io/archive.html)",
                          "- [🏷️ 标签](https://yifree.github.io/tags.html)",
                          "- [🔍 搜索](https://yifree.github.io/)",
                          "- [📡 RSS 订阅](https://yifree.github.io/feed.xml)", "",
                          "---", "",
                          "> 💡 **提示**：本文档在 GitHub 上显示时可能无法完全渲染 Jekyll 模板语法，建议访问网站获得最佳体验。", "",
                          f"> *最后更新：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*", ""])
        
        return '\n'.join(toc_content)
    
    def generate_jekyll_toc(self):
        """生成Jekyll使用的动态版本"""
        # 这里可以生成包含Jekyll模板语法的版本
        # 但根据需求，我们主要使用静态版本
        return self.generate_github_toc()
    
    def save_toc(self, content, output_path=None):
        """保存生成的目录"""
        if output_path is None:
            output_path = self.output_file
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"文章目录已生成：{output_path}")
    
    def run(self, output_type="github"):
        """运行生成器"""
        print("开始扫描文章...")
        self.scan_articles()
        
        if output_type == "github":
            print("生成GitHub静态版本...")
            content = self.generate_github_toc()
        else:
            print("生成Jekyll动态版本...")
            content = self.generate_jekyll_toc()
        
        self.save_toc(content)
        print("生成完成！")

def main():
    parser = argparse.ArgumentParser(description='文章目录自动生成脚本')
    parser.add_argument('--output', choices=['github', 'jekyll'], default='github',
                       help='输出类型：github（静态）或 jekyll（动态）')
    parser.add_argument('--posts-dir', default='_posts', help='文章目录路径')
    parser.add_argument('--output-file', default='文章目录.md', help='输出文件路径')
    
    args = parser.parse_args()
    
    generator = ArticleTocGenerator(args.posts_dir, args.output_file)
    generator.run(args.output)

if __name__ == "__main__":
    main()