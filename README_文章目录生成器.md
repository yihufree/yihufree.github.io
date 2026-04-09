# 文章目录自动生成器使用说明

## 功能概述

这个Python脚本可以自动从 `_posts` 文件夹生成静态的文章目录，解决GitHub显示Jekyll模板语法的问题。

**支持三种更新方案，用户可根据需求选择：**
- 🎯 **方案一：手动运行脚本**（默认方案，简单可靠）
- 🔄 **方案二：Git提交钩子**（推荐本地开发，自动化程度高）
- ☁️ **方案三：GitHub Actions**（推荐生产环境，云端自动化）

## 🎯 方案一：手动运行脚本（默认方案）

### 使用方法

```bash
# 在项目根目录运行
python generate_toc.py
```

### 使用参数
```bash
# 指定输出类型
python generate_toc.py --output github    # GitHub静态版本（默认）
python generate_toc.py --output jekyll    # Jekyll动态版本

# 指定文章目录和输出文件
python generate_toc.py --posts-dir _posts --output-file 文章目录.md
```

### 优点
- ✅ **简单直接**：无需额外配置
- ✅ **完全可控**：手动决定何时更新
- ✅ **适合所有用户**：无需Git或GitHub知识

### 缺点
- ❌ **需要手动操作**：每次添加文章后要记得运行

## 🔄 方案二：Git提交钩子（推荐本地开发）

### 安装方法

```bash
# 安装Git钩子
python setup-git-hooks.py install

# 检查安装状态
python setup-git-hooks.py status

# 卸载Git钩子
python setup-git-hooks.py remove
```

### 工作原理
- 当您提交包含 `_posts` 文件夹变化的代码时
- Git会自动运行钩子脚本
- 脚本检测到文章变化后自动更新目录
- 更新的目录会自动添加到本次提交中

### 优点
- ✅ **自动化程度高**：无需手动操作
- ✅ **本地运行**：不依赖云端服务
- ✅ **实时更新**：提交时自动完成

### 缺点
- ❌ **需要Git知识**：需要了解基本的Git操作
- ❌ **仅限本地**：其他协作者需要单独安装

## ☁️ 方案三：GitHub Actions（推荐生产环境）

### 设置方法

#### 第一步：创建工作流文件
将 `.github/workflows/update-toc.yml` 文件推送到仓库

#### 第二步：配置权限
在GitHub仓库设置中：
1. 进入 **Settings** -> **Actions** -> **General**
2. 找到 **Workflow permissions** 部分
3. 选择 **Read and write permissions**
4. 点击 **Save**

#### 第三步：测试工作流
1. 推送包含文章变化的代码
2. 进入 **Actions** 标签页查看运行状态
3. 工作流会自动更新文章目录并提交

### 工作原理
- 当您推送包含 `_posts` 文件夹变化的代码到GitHub
- GitHub Actions自动检测变化并运行工作流
- 工作流生成新的文章目录
- 自动提交更新的目录文件

### 优点
- ✅ **云端自动化**：无需本地配置
- ✅ **团队协作友好**：所有协作者共享同一配置
- ✅ **生产环境推荐**：适合正式发布的博客

### 缺点
- ❌ **需要手动设置**：克隆仓库后需要配置工作流
- ❌ **依赖GitHub**：需要GitHub账户和仓库

## 方案对比

| 特性 | 方案一：手动运行 | 方案二：Git钩子 | 方案三：GitHub Actions |
|------|----------------|----------------|-----------------------|
| 自动化程度 | 低 | 高 | 最高 |
| 配置复杂度 | 无 | 中等 | 中等 |
| 团队协作 | 一般 | 较差 | 优秀 |
| 适用场景 | 个人简单使用 | 本地开发 | 生产环境 |
| 推荐指数 | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

## 脚本功能

### 自动扫描功能
- 扫描 `_posts` 文件夹中的所有 `.md` 文件
- 解析YAML front matter获取文章信息
- 自动按日期排序（最新的在前）

### 生成内容
- 📊 **统计信息**：文章总数、标签总数、最新更新
- 🗓️ **年度导航**：按年份分类导航
- 🏷️ **热门标签**：按标签使用频率排序
- 📖 **最新文章**：前10篇文章表格
- 📚 **所有文章**：按年份详细列表
- 🏷️ **按标签分类**：标签索引
- 📝 **写作规范**：Markdown写作指南

## 文件结构

```
项目根目录/
├── generate_toc.py          # 主脚本
├── setup-git-hooks.py       # Git钩子安装脚本
├── git-hooks/               # Git钩子文件
│   └── pre-commit          # 提交前钩子
├── .github/workflows/       # GitHub Actions工作流
│   └── update-toc.yml      # 自动更新工作流
├── 文章目录.md              # 生成的静态目录
└── README_文章目录生成器.md  # 本说明文档
```

## 快速开始指南

### 新手推荐：方案一
1. 添加新文章到 `_posts` 文件夹
2. 运行：`python generate_toc.py`
3. 提交更新的文件

### 开发者推荐：方案二
1. 运行：`python setup-git-hooks.py install`
2. 添加新文章到 `_posts` 文件夹
3. 正常提交代码，系统会自动更新目录

### 团队项目推荐：方案三
1. 确保 `.github/workflows/update-toc.yml` 存在
2. 配置GitHub仓库的Actions权限
3. 推送代码，GitHub会自动处理

## 依赖要求

```bash
pip install pyyaml
```

## 注意事项

1. **文章格式要求**：文章必须包含正确的YAML front matter
2. **文件命名**：建议使用 `YYYY-MM-DD-标题.md` 格式
3. **编码**：确保文件使用UTF-8编码
4. **备份**：脚本会覆盖现有的 `文章目录.md` 文件

## 故障排除

### 常见问题

1. **找不到_posts文件夹**
   ```bash
   # 检查路径
   ls _posts/
   ```

2. **Python模块缺失**
   ```bash
   # 安装依赖
   pip install pyyaml
   ```

3. **Git钩子不工作**
   ```bash
   # 检查钩子状态
   python setup-git-hooks.py status
   # 重新安装
   python setup-git-hooks.py install
   ```

4. **GitHub Actions失败**
   - 检查仓库的Actions权限设置
   - 查看Actions日志了解具体错误

### 调试模式
```bash
# 添加调试信息
python generate_toc.py --verbose
```

## 更新日志

- **v1.1** (2026-04-09): 支持三种更新方案
  - 添加Git提交钩子支持
  - 添加GitHub Actions工作流
  - 完善使用说明文档
- **v1.0** (2026-04-09): 初始版本，支持基本功能
  - 自动扫描_posts文件夹
  - 生成静态GitHub版本
  - 支持参数配置

---

**最后更新：** 2026-04-09