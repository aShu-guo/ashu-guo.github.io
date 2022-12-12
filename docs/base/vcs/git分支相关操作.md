

### 一、常见操作

> #### 删除分支

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



> #### 暂存区回退到工作区

```shell
git reset filename # 回退指定文件到工作区
git reset . # 回去所有暂存区文件到工作区
```



> #### 删除本地所有更改

```shell
git checkout -f
```



> #### 回滚到上一提交

```shell
git reset --hard HEAD^ 

git push origin HEAD --force
```



> #### 回滚到指定版本

```shell
git reset --hard logid
```



> #### 查看、修改远程跟踪分支

```shell
git branch -vv

git branch --set-upstream-to=远程origin名称/远程分支名 本地分支名
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



![revert 操作流程](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwNDE0MjA1ODE2MTg4)

### 二、预发布过程

首先派生fork一个分支

git remote add myorigin https://gitlab.ifugle.com/GuoChengli/mobile-apps.git

git remote -v

git push -u myorigin pre分支

后新建合并请求 myorigin pre分支 到 origin pre分支

### 三、发布流程

测试环境 -> 预发布环境

1.如果开发中有大于50k的图片，需要上传到CDN并替换路径；

2.把对应的流水线名称以及分支给产品

例如：CX_rap-web_PROD_FRONT release/pre

 -> 生产环境

发布之后，pre -> master



>ifugle 分支规范

```js
命名规范：
分支规则：
	开发分支：feature/xxxxx 例：feature/bigData-v4.1
	bug修改分支：hotfix/xxxxx 例：hotfix/cloud-tax-fix

提交comment：新增 、 修改、 删除 + ：


假设你分支为feature/yk-eTax

接到需求找到对应的项目之后

->从pre拉出一个分支作为开发分支

->在开发分支上做需求

->开发完毕

------------测试阶段------------

->推送feature/yk-eTax到派生仓库feature/yk-eTax，提交合并申请到主仓库；后合并feature/yk-eTax到主仓库的test分支，并且发布到测试环境

->如果有bug，在你的开发分支修改之后，重复上一步骤

->测试完毕

------------预发布阶段------------

->推送feature/yk-eTax到派生仓库feature/yk-eTax，提交合并申请到主仓库；后合并feature/yk-eTax到派生仓库的pre分支，提交合并申请到主仓库pre，并且发布到预发布环境

->如果有bug，在你的开发分支修改之后，重复上一步骤

->预发布测试完毕

------------生产环境发布阶段------------

->发布到生产环境

->发起派生仓库pre到主仓库master的合并申请
```



> 发布手册

```js
1.切出一个新分支，开发完之后合并到test分支；联系测试发测试环境

2.测试通过之后，fork一个新的仓库，在新仓库中合并到pre分支，提交新仓库的pre分支合并到原始仓库的pre分支的合并申请。合并之后，自行发预发布环境

3.预发布完成，测试通过之后。告知产品云效流水线名称，由产品发起审批
```



