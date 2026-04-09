#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Git钩子安装脚本
帮助用户设置自动更新文章目录的Git钩子
"""

import os
import shutil
import stat
from pathlib import Path

def setup_git_hooks():
    """设置Git钩子"""
    
    # 检查是否在Git仓库中
    if not Path(".git").exists():
        print("❌ 错误：当前目录不是Git仓库")
        print("请先运行：git init")
        return False
    
    # Git钩子目录
    hooks_dir = Path(".git/hooks")
    source_hooks_dir = Path("git-hooks")
    
    # 检查源钩子目录是否存在
    if not source_hooks_dir.exists():
        print("❌ 错误：git-hooks目录不存在")
        return False
    
    # 确保Git钩子目录存在
    hooks_dir.mkdir(parents=True, exist_ok=True)
    
    # 安装钩子
    installed_hooks = []
    
    for hook_file in source_hooks_dir.glob("*"):
        if hook_file.is_file():
            hook_name = hook_file.name
            target_hook = hooks_dir / hook_name
            
            # 复制钩子文件
            shutil.copy2(hook_file, target_hook)
            
            # 设置执行权限
            target_hook.chmod(target_hook.stat().st_mode | stat.S_IEXEC)
            
            installed_hooks.append(hook_name)
            print(f"✅ 已安装钩子：{hook_name}")
    
    if installed_hooks:
        print(f"\n🎉 成功安装 {len(installed_hooks)} 个Git钩子")
        print("\n📋 已安装的钩子：")
        for hook in installed_hooks:
            print(f"  - {hook}")
        
        print("\n💡 使用说明：")
        print("  现在每次提交包含文章变化时，系统会自动更新文章目录")
        print("  无需手动运行 generate_toc.py")
        
        return True
    else:
        print("❌ 没有找到可安装的钩子文件")
        return False

def remove_git_hooks():
    """移除Git钩子"""
    
    hooks_dir = Path(".git/hooks")
    source_hooks_dir = Path("git-hooks")
    
    if not hooks_dir.exists():
        print("❌ 错误：Git钩子目录不存在")
        return False
    
    removed_hooks = []
    
    for hook_file in source_hooks_dir.glob("*"):
        if hook_file.is_file():
            hook_name = hook_file.name
            target_hook = hooks_dir / hook_name
            
            if target_hook.exists():
                target_hook.unlink()
                removed_hooks.append(hook_name)
                print(f"✅ 已移除钩子：{hook_name}")
    
    if removed_hooks:
        print(f"\n🗑️ 成功移除 {len(removed_hooks)} 个Git钩子")
        return True
    else:
        print("ℹ️ 没有找到需要移除的钩子")
        return False

def main():
    import argparse
    
    parser = argparse.ArgumentParser(description='Git钩子安装脚本')
    parser.add_argument('action', choices=['install', 'remove', 'status'], 
                       nargs='?', default='install',
                       help='操作：install（安装）, remove（移除）, status（状态）')
    
    args = parser.parse_args()
    
    if args.action == 'install':
        setup_git_hooks()
    elif args.action == 'remove':
        remove_git_hooks()
    elif args.action == 'status':
        check_git_hooks_status()

def check_git_hooks_status():
    """检查Git钩子状态"""
    
    hooks_dir = Path(".git/hooks")
    source_hooks_dir = Path("git-hooks")
    
    if not hooks_dir.exists():
        print("❌ 错误：Git钩子目录不存在")
        return
    
    print("📋 Git钩子状态检查：")
    print("-" * 50)
    
    for hook_file in source_hooks_dir.glob("*"):
        if hook_file.is_file():
            hook_name = hook_file.name
            target_hook = hooks_dir / hook_name
            
            if target_hook.exists():
                # 检查文件权限
                is_executable = os.access(target_hook, os.X_OK)
                status = "✅ 已安装" + ("（可执行）" if is_executable else "（不可执行）")
            else:
                status = "❌ 未安装"
            
            print(f"{hook_name}: {status}")
    
    print("-" * 50)

if __name__ == "__main__":
    main()