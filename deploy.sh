#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 定义要删除的目录的路径（把.git目录删掉）
DIRECTORY_TO_DELETE=".git"

# 检查目录是否存在
if [ -d "$DIRECTORY_TO_DELETE" ]; then
  # 如果目录存在，则删除它
  rm -rf "$DIRECTORY_TO_DELETE"
  echo "目录 $DIRECTORY_TO_DELETE 已被删除"
else
  echo "目录 $DIRECTORY_TO_DELETE 不存在"
fi

git init
git add -A
# 设置本地项目的 git 用户名
git config user.name "NeverYu"
git config user.email "never_yu@qq.com"
echo "Git 仓库配置已更新"

echo -n "请输入你的commit msg"

# 设置默认值
default_msg="first init and commit"
read msg
# 检查用户是否输入了内容
if [ -z "$msg" ]; then
  # 如果用户没有输入内容，使用默认值
  echo "使用默认值: $default_msg"
  # 可以在这里将 user_input 设置为默认值，用于后续脚本逻辑
  msg=$default_msg
else
  # 如果用户输入了内容，则使用用户输入的值
  echo "您输入的值是: $msg"
fi

git commit -m "$msg"

git push -f git@github.com:Neveryu/web-bookmarks.git master:master
# git push -f http://github.com/Neveryu/web-bookmarks.git master:master

cd -
