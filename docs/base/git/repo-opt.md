# 仓库相关操作

## 基础操作

### 变动代码提交

> git仓库分为4个部分：工作区 -> 暂存区 -> 本地仓库 -> 远程仓库

```shell
# 将变动代码提交到暂存区
git add .
# 将变动代码提交到本地仓库
git commit -m "feat:提交测试"
# 拉取最新代码
git pull
# 如果有冲突，则解决冲突，解决完之后提交代码到远程仓库
git push origin feature/rename-branch
# 可选的简写：前提是远程分支对应的是origin
git push
```

![img.png](/imgs/base/git-commit.gif)

### 丢弃代码

```shell
# 改动了工作区的文件，但是希望丢弃掉

# 丢弃工作区指定文件的代码
git checkout file_path
# 丢弃所有工作区的代码
git checkout .

# 已经提交到暂存区的文件希望回退变动文件到工作区中

# 回退暂存区指定文件的代码到工作区
git reset file_path
# 回退所有暂存区的代码
git reset .

# 已经提交到本地仓库的改动希望丢弃代码

# 回滚代码到上一个版本
git reset --head HEAD^
# 回滚代码到n个版本
git reset --head HEAD~n

# 已经提交到远程仓库的改动希望丢弃代码

# 首先查看logId
git log
# 回退本地仓库到指定logId
git reset --hard logId
# 强推到远程仓库
git push --force origin HEAD
```

![img.png](/imgs/base/git-reset.gif)

### 代码暂存

```shell
# 在开发需求时，需要修改其他分支的bug时，可以先暂存工作区的改动

# 暂存当前工作区代码
git stash
# 改完bug之后再恢复工作区改动代码
git stash pop
```
