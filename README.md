# GitHub 博客网站模板

这是一个基于 GitHub Pages + Jekyll 构建的个人博客网站模板，设计简洁、实用、美观，适合技术爱好者记录学习笔记、分享技术心得。

## 功能特点

- ✅ **简洁美观**：现代化的卡片式设计，支持暗黑模式
- ✅ **功能完善**：文章列表、分页、搜索、标签分类、相关文章推荐
- ✅ **易于部署**：基于 GitHub Pages，一键部署
- ✅ **易于使用**：支持 Markdown 写作，自动生成目录
- ✅ **易于维护**：代码结构清晰，注释完善
- ✅ **完全自动化**：只需添加文章，系统自动更新所有页面
- ✅ **响应式设计**：适配 PC 端和移动端
- ✅ **浮动导航**：右侧固定导航按钮，方便快速操作
- ✅ **优化的 RSS 订阅**：美观的 RSS feed 页面
- ✅ **紧凑的文章卡片**：优化的布局，显示更多内容

## 快速开始

### 1. 部署到 GitHub Pages

1. **Fork 本仓库**：点击右上角的 "Fork" 按钮，将本仓库复制到你的 GitHub 账号
2. **修改仓库名称**：在你的仓库设置中，将仓库名称改为 `your-username.github.io`（将 `your-username` 替换为你的 GitHub 用户名）
3. **启用 GitHub Pages**：在仓库设置的 "Pages" 选项卡中，选择 "main" 分支作为源，点击 "Save"
4. **等待部署**：GitHub Pages 会自动构建并部署你的网站，通常需要 1-2 分钟
5. **访问网站**：打开浏览器，访问 `https://your-username.github.io`（将 `your-username` 替换为你的 GitHub 用户名）

### 2. 个性化配置（必须修改）

**⚠️ 重要提示**：在部署完成后，必须修改以下文件中的个性化信息，特别是将 `yifree` 替换为你自己的 GitHub 用户名。

#### 2.1 修改 `_config.yml` 文件

编辑 `_config.yml` 文件，修改以下配置：

```yaml
# 网站基本信息（必须修改）
title: 你的博客标题
description: 你的博客描述
url: "https://your-username.github.io/"  # ⚠️ 将 your-username 替换为你的 GitHub 用户名

# Gitalk 评论系统配置（可选，但建议配置）
gitalk:
  clientID: YOUR_CLIENT_ID  # 在 GitHub 开发者设置中创建 OAuth 应用获取
  clientSecret: YOUR_CLIENT_SECRET  # 在 GitHub 开发者设置中创建 OAuth 应用获取
  repo: your-username.github.io  # ⚠️ 将 your-username 替换为你的 GitHub 用户名
  owner: your-username  # ⚠️ 将 your-username 替换为你的 GitHub 用户名
  admin: [your-username]  # ⚠️ 将 your-username 替换为你的 GitHub 用户名
  distractionFreeMode: true
```

#### 2.2 修改 `文章目录.md` 文件

编辑 `文章目录.md` 文件，将所有 `yifree.github.io` 替换为你的网站地址：

```markdown
# 文章目录

> **提示**：访问 [https://your-username.github.io](https://your-username.github.io) 可以获得更好的阅读体验...

## 🔗 快速链接

- [🏠 首页](https://your-username.github.io/)
- [📂 归档](https://your-username.github.io/archive.html)
- [🏷️ 标签](https://your-username.github.io/tags.html)
- [🔍 搜索](https://your-username.github.io/)
- [📡 RSS 订阅](https://your-username.github.io/feed.xml)
```

#### 2.3 修改首页信息（可选）

编辑 `index.md` 文件，修改首页显示的信息：

```markdown
<div class="home-header">
  <img src="/assets/images/avatar.jpg" alt="头像" class="avatar">
  <h1>你的博客名称</h1>  <!-- 修改这里 -->
  <p>你的博客副标题</p>  <!-- 修改这里 -->
</div>
```

#### 2.4 替换头像图片（可选）

将你的头像图片命名为 `avatar.jpg`，替换 `assets/images/avatar.jpg` 文件。

### 3. 发布文章

在 `_posts` 目录中创建 Markdown 文件，文件名格式为 `YYYY-MM-DD-title.md`，例如 `2026-04-08-my-first-post.md`。

**⚠️ 重要提示**：
- 文件名中的日期必须与文件内容中的 `date` 字段一致
- 文件必须使用 `.md` 扩展名
- 文件必须放在 `_posts` 目录下

文章格式示例：

```markdown
---
layout: post
title: 我的第一篇文章
date: 2026-04-08
tags: [技术, 学习, 分享]
---

# 我的第一篇文章

这是我的第一篇博客文章。

## 二级标题

内容...
```

### 4. 自动化更新说明

**好消息**：系统会自动处理以下更新，你无需手动干预：

- ✅ **首页文章列表**：自动显示所有文章，按日期排序
- ✅ **文章目录页**：自动生成文章列表和标签分类
- ✅ **标签页面**：自动收集所有标签并分类显示
- ✅ **归档页面**：自动按年份分组显示文章
- ✅ **搜索功能**：自动索引所有文章内容
- ✅ **相关文章推荐**：自动根据标签匹配推荐相关文章
- ✅ **RSS 订阅**：自动生成 RSS  feed

**你只需做一件事**：将写好的 Markdown 文件放入 `_posts` 目录，GitHub Pages 会自动构建并更新网站。

### 5. 本地开发环境设置

如果你想在本地测试和调试网站，可以按照以下步骤设置本地开发环境：

#### 5.1 安装 Ruby 和 Jekyll

1. **安装 Ruby**：
   - Windows 用户：访问 [RubyInstaller](https://rubyinstaller.org/) 下载并安装 Ruby + Devkit
   - macOS 用户：使用 Homebrew 安装 `brew install ruby`
   - Linux 用户：使用包管理器安装，例如 `sudo apt-get install ruby-full`

2. **安装 Jekyll 和 Bundler**：
   ```bash
   gem install jekyll bundler
   ```

#### 5.2 克隆仓库并安装依赖

1. **克隆仓库**：
   ```bash
   git clone https://github.com/your-username/your-username.github.io.git
   cd your-username.github.io
   ```

2. **安装依赖**：
   ```bash
   bundle install
   ```

#### 5.3 启动本地开发服务器

```bash
bundle exec jekyll serve
```

启动成功后，打开浏览器访问 `http://localhost:4000` 即可查看本地网站。

#### 5.4 本地开发说明

- 本地服务器会自动监控文件变化，当你修改文件后，页面会自动刷新
- 本地开发环境与 GitHub Pages 环境完全一致，确保你的修改在部署后能正常显示
- 如果你需要停止本地服务器，按 `Ctrl+C` 即可

## 目录结构

```
.
├── _includes/          # 可重用的组件
│   ├── gitalk.html     # Gitalk 评论系统
│   ├── toc.html        # 文章目录
│   └── umami.html      # Umami 分析（可选）
├── _layouts/           # 页面布局
│   └── default.html    # 默认布局
├── _posts/             # 文章目录（你只需操作这个目录）
│   └── ...             # 文章文件
├── assets/             # 静态资源
│   ├── css/            # CSS 文件
│   ├── images/         # 图片文件
│   └── js/             # JavaScript 文件
├── _config.yml         # 网站配置（需要修改）
├── index.md            # 首页（可选修改）
├── archive.md          # 归档页（自动生成）
├── tags.md             # 标签页（自动生成）
├── 文章目录.md          # 文章目录（需要修改 URL）
├── 404.md              # 404 页面
├── search.json         # 搜索数据（自动生成）
├── feed.xml            # RSS 订阅文件
├── feed.xsl            # RSS 样式表
└── README.md           # 说明文档
```

## 文章模板

为了统一格式，我们提供了一个标准的文章模板。请参考 `_posts/2026-04-08-笔记文档模板.md` 文件。

### 模板使用说明

1. **复制模板**：复制 `_posts/2026-04-08-笔记文档模板.md` 文件
2. **修改文件名**：按照 `YYYY-MM-DD-文章标题.md` 格式重命名
3. **修改 front matter**：
   - `title`：修改为你的文章标题
   - `date`：修改为文章发布日期（必须与文件名中的日期一致）
   - `tags`：修改为适合文章的标签
4. **编写内容**：删除模板中的示例内容，编写你自己的文章

### 标题层级规范

- `#` - 文章主标题（一级标题）
- `##` - 章节标题（二级标题）
- `###` - 小节标题（三级标题）
- `####` - 细节标题（四级标题）
- `#####` - 最小标题（五级标题）

### 文章示例

```markdown
---
layout: post
title: 我的学习笔记
date: 2026-04-08
tags: [学习, 笔记, 技术]
---

# 我的学习笔记

**前言**：本文记录了我学习某个技术的过程和心得。

---

## 一、背景介绍

### 1.1 为什么要学习这个技术

在这里阐述学习这个技术的原因和背景。

### 1.2 学习目标

- 掌握基本概念
- 学会实际应用
- 能够解决实际问题

---

## 二、核心内容

### 2.1 基本概念

在这里介绍核心概念。

```python
# 代码示例
print("Hello, World!")
```

### 2.2 实践应用

在这里介绍实际应用场景。

---

## 三、总结

### 3.1 学习收获

总结本次学习的主要收获。

### 3.2 后续计划

列出后续的学习计划。

---

**最后更新时间**：2026-04-08  
**标签**：学习, 笔记, 技术
```

## 文章目录

为了方便在 GitHub 上直接浏览文章，我们提供了 `文章目录.md` 文件。这个文件会显示所有文章的列表和标签分类。

> **提示**：访问网站可以获得更好的阅读体验，包括目录导航、搜索功能、暗黑模式等。

## 个性化配置检查清单

部署完成后，请检查以下配置是否已修改：

- [ ] `_config.yml` 中的 `url` 已改为你的地址
- [ ] `_config.yml` 中的 Gitalk 配置已改为你的信息
- [ ] `文章目录.md` 中的链接已改为你的地址
- [ ] `index.md` 中的博客名称和副标题已修改（可选）
- [ ] `assets/images/avatar.jpg` 已替换为你的头像（可选）

## 常见问题

### Q: 如何添加新的页面？
A: 在根目录创建 Markdown 文件，添加 front matter 即可。

### Q: 如何修改网站的配色方案？
A: 编辑 `assets/css/style.css` 文件中的 CSS 变量。

### Q: 如何添加新的功能？
A: 可以在 `_includes` 目录中添加新的组件，然后在布局文件中引用。

### Q: 如何配置评论系统？
A: 在 GitHub 开发者设置中创建 OAuth 应用，获取 clientID 和 clientSecret，然后在 `_config.yml` 中配置。

### Q: 文章中的图片应该放在哪里？
A: 图片应该放在 `assets/images/` 目录下，然后在文章中用相对路径引用，例如：`![图片描述](/assets/images/图片名.jpg)`

### Q: 如何添加标签？
A: 在文章的 front matter 中添加 `tags` 字段，例如：`tags: [标签1, 标签2, 标签3]`

### Q: 为什么我添加了文章但网站没有更新？
A: 
1. 检查文件名格式是否正确（`YYYY-MM-DD-标题.md`）
2. 检查文件是否放在 `_posts` 目录下
3. 检查文件中的 `date` 字段是否与文件名中的日期一致
4. 等待 1-2 分钟，GitHub Pages 构建需要一定时间
5. 清除浏览器缓存后刷新页面

### Q: 文章目录中的链接显示为纯文本怎么办？
A: 
1. 检查文章标题中是否包含英文方括号 `[]`，这会破坏 Markdown 链接语法
2. 检查文章标题中是否包含竖线 `|`，这会破坏 Markdown 表格结构
3. 运行 `python generate_toc.py` 重新生成文章目录

### Q: GitHub Actions 无法自动更新文章目录怎么办？
A: 
1. 进入仓库设置：Settings -> Actions -> General
2. 在 Workflow permissions 中选择 "Read and write permissions"
3. 点击 Save 保存配置

## ⚠️ 重要注意事项

### 1. 文件名格式要求

**必须严格遵循** `YYYY-MM-DD-标题.md` 格式：
- 日期格式：`YYYY-MM-DD`（年-月-日）
- 日期和标题之间**必须有连字符 `-`**
- 错误示例：`2026-04-08标题.md`（缺少连字符）
- 正确示例：`2026-04-08-标题.md`（日期和标题之间有连字符）

### 2. 文章标题特殊字符处理

文章标题中**不要使用**以下字符：
- 英文方括号：`[` `]`（会破坏 Markdown 链接语法）
- 竖线：`|`（会破坏 Markdown 表格结构）

**推荐做法**：
- 使用中文括号代替英文方括号：`（）`
- 避免在标题中使用竖线

### 3. GitHub Actions 权限配置

为了让系统自动更新文章目录，需要配置正确的权限：

1. 访问仓库：`https://github.com/your-username/your-username.github.io`
2. 点击 Settings -> Actions -> General
3. 在 Workflow permissions 中选择 "Read and write permissions"
4. 点击 Save 保存

### 4. 文章目录生成

文章目录会自动生成，但如果需要手动更新，可以运行：

```bash
python generate_toc.py
```

### 5. 本地开发提示

在本地开发时，如果遇到文章不显示的问题：
- 检查 `_posts` 目录下的文件名格式
- 确保文件名符合 `YYYY-MM-DD-标题.md` 格式
- 运行 `bundle exec jekyll serve` 重新启动服务器

### Q: 网站显示 404 错误怎么办？
A:
1. 检查仓库名称是否为 `your-username.github.io` 格式
2. 检查 GitHub Pages 是否已启用（Settings -> Pages）
3. 检查 `_config.yml` 中的 `baseurl` 是否为空（`baseurl: ""`）

## 示例网站

- 演示地址：https://yifree.github.io/

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个模板！

## 许可证

MIT License
