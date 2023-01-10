# 常见操作

> 删除分支

```shell
首先切到其他分支，并删除本地分支：git branch -d 分支名

删除远程分支：git push origin --delete 分支名
```

> #### 回滚

```shell
查看日志，获取需要回滚的logid

git rebase -i logid

将commit中需要删除的“pick”修改为“drop”，然后保存
```

> #### 回滚到上一提交

```shell
git reset --hard HEAD^ 

git push origin HEAD --force
```

> #### 暂存

```shell
git stash

git stash list 

git stash pop = git stash apply + git stash drop
```

> #### 合并时出现偏离

```shell
git fetch

git merge FETCH_HEAD
```

> #### 添加子模块

```shell
git submodule add <url> <path>
```

> #### 子模块

```shell
1.先更新子模块，更新之后切到主项目再次提交更新子模块
git submodule foreach git checkout release-test/v1.0.0
git submodule foreach git pull
2.在每个主项目中，即使每个子模块的分支相同，在其他主项目更新完子模块也不会影响其他主项目中的子模块，仍然需要做操作'1'
```

> #### 更新.gitignore

```shell
git rm -r --cached .
git add .
git commit
```

> #### 新建git仓库 上传文件

```shell
cd existing_folder
git init
git remote add origin git@gitlab.com:zxpo/test.git
git add .
git commit
git push -u origin master
```

> #### 找回git stash丢弃的改动

```shell
git fsck --lost-found（只关注commit的logid）
git show commitLogId
git merge commitLogId
```

> #### 设置alias

```shell
git config --global alias.ck checkout
```

> #### 设置remote

```shell
git remote add origin https://github.com/GuoChengLi-A/uview-input-bug.git
```

> #### revert  撤销指定的版本

```shell
revert 普通提交
git revert logId
revert merge操作：必须要带-m参数，告诉git保留哪个分支的修改 1-保存当前分支的修改 2-保留其他分支的修改
git revert mergeLogId -m 1 

git commit -m ""
git push
```

tag

```shell
git tag -a v1.2
git tag v1.2 -d
git push origin v1.2
```



