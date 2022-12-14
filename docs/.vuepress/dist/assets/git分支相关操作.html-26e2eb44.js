import{_ as a,p as s,q as n,a1 as e}from"./framework-1443a5b1.js";const i={},t=e(`<h3 id="一、常见操作" tabindex="-1"><a class="header-anchor" href="#一、常见操作" aria-hidden="true">#</a> 一、常见操作</h3><blockquote><h4 id="删除分支" tabindex="-1"><a class="header-anchor" href="#删除分支" aria-hidden="true">#</a> 删除分支</h4></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>首先切到其他分支，并删除本地分支：git branch <span class="token parameter variable">-d</span> 分支名

删除远程分支：git push origin <span class="token parameter variable">--delete</span> 分支名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h4 id="回滚" tabindex="-1"><a class="header-anchor" href="#回滚" aria-hidden="true">#</a> 回滚</h4></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>查看日志，获取需要回滚的logid

<span class="token function">git</span> rebase <span class="token parameter variable">-i</span> logid

将commit中需要删除的“pick”修改为“drop”，然后保存
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h4 id="暂存区回退到工作区" tabindex="-1"><a class="header-anchor" href="#暂存区回退到工作区" aria-hidden="true">#</a> 暂存区回退到工作区</h4></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> reset filename <span class="token comment"># 回退指定文件到工作区</span>
<span class="token function">git</span> reset <span class="token builtin class-name">.</span> <span class="token comment"># 回去所有暂存区文件到工作区</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h4 id="删除本地所有更改" tabindex="-1"><a class="header-anchor" href="#删除本地所有更改" aria-hidden="true">#</a> 删除本地所有更改</h4></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> checkout <span class="token parameter variable">-f</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><h4 id="回滚到上一提交" tabindex="-1"><a class="header-anchor" href="#回滚到上一提交" aria-hidden="true">#</a> 回滚到上一提交</h4></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> HEAD^ 

<span class="token function">git</span> push origin HEAD <span class="token parameter variable">--force</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h4 id="回滚到指定版本" tabindex="-1"><a class="header-anchor" href="#回滚到指定版本" aria-hidden="true">#</a> 回滚到指定版本</h4></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> logid
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><h4 id="查看、修改远程跟踪分支" tabindex="-1"><a class="header-anchor" href="#查看、修改远程跟踪分支" aria-hidden="true">#</a> 查看、修改远程跟踪分支</h4></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> branch <span class="token parameter variable">-vv</span>

<span class="token function">git</span> branch --set-upstream-to<span class="token operator">=</span>远程origin名称/远程分支名 本地分支名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h4 id="暂存" tabindex="-1"><a class="header-anchor" href="#暂存" aria-hidden="true">#</a> 暂存</h4></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> stash

<span class="token function">git</span> stash list 

<span class="token function">git</span> stash pop <span class="token operator">=</span> <span class="token function">git</span> stash apply + <span class="token function">git</span> stash drop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h4 id="合并时出现偏离" tabindex="-1"><a class="header-anchor" href="#合并时出现偏离" aria-hidden="true">#</a> 合并时出现偏离</h4></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> fetch

<span class="token function">git</span> merge FETCH_HEAD
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h4 id="添加子模块" tabindex="-1"><a class="header-anchor" href="#添加子模块" aria-hidden="true">#</a> 添加子模块</h4></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> submodule <span class="token function">add</span> <span class="token operator">&lt;</span>url<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>path<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><h4 id="子模块" tabindex="-1"><a class="header-anchor" href="#子模块" aria-hidden="true">#</a> 子模块</h4></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>.先更新子模块，更新之后切到主项目再次提交更新子模块
<span class="token function">git</span> submodule foreach <span class="token function">git</span> checkout release-test/v1.0.0
<span class="token function">git</span> submodule foreach <span class="token function">git</span> pull
<span class="token number">2</span>.在每个主项目中，即使每个子模块的分支相同，在其他主项目更新完子模块也不会影响其他主项目中的子模块，仍然需要做操作<span class="token string">&#39;1&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h4 id="更新-gitignore" tabindex="-1"><a class="header-anchor" href="#更新-gitignore" aria-hidden="true">#</a> 更新.gitignore</h4></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> <span class="token function">rm</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">--cached</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h4 id="新建git仓库-上传文件" tabindex="-1"><a class="header-anchor" href="#新建git仓库-上传文件" aria-hidden="true">#</a> 新建git仓库 上传文件</h4></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> existing_folder
<span class="token function">git</span> init
<span class="token function">git</span> remote <span class="token function">add</span> origin git@gitlab.com:zxpo/test.git
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit
<span class="token function">git</span> push <span class="token parameter variable">-u</span> origin master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h4 id="找回git-stash丢弃的改动" tabindex="-1"><a class="header-anchor" href="#找回git-stash丢弃的改动" aria-hidden="true">#</a> 找回git stash丢弃的改动</h4></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> <span class="token function">fsck</span> --lost-found（只关注commit的logid）
<span class="token function">git</span> show commitLogId
<span class="token function">git</span> merge commitLogId
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h4 id="设置alias" tabindex="-1"><a class="header-anchor" href="#设置alias" aria-hidden="true">#</a> 设置alias</h4></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.ck checkout
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><h4 id="设置remote" tabindex="-1"><a class="header-anchor" href="#设置remote" aria-hidden="true">#</a> 设置remote</h4></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> remote <span class="token function">add</span> origin https://github.com/GuoChengLi-A/uview-input-bug.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><h4 id="revert-撤销指定的版本" tabindex="-1"><a class="header-anchor" href="#revert-撤销指定的版本" aria-hidden="true">#</a> revert 撤销指定的版本</h4></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>revert 普通提交
<span class="token function">git</span> revert logId
revert merge操作：必须要带-m参数，告诉git保留哪个分支的修改 <span class="token number">1</span>-保存当前分支的修改 <span class="token number">2</span>-保留其他分支的修改
<span class="token function">git</span> revert mergeLogId <span class="token parameter variable">-m</span> <span class="token number">1</span> 

<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;&quot;</span>
<span class="token function">git</span> push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwNDE0MjA1ODE2MTg4" alt="revert 操作流程"></p><h3 id="二、预发布过程" tabindex="-1"><a class="header-anchor" href="#二、预发布过程" aria-hidden="true">#</a> 二、预发布过程</h3><p>首先派生fork一个分支</p><p>git remote add myorigin https://gitlab.ifugle.com/GuoChengli/mobile-apps.git</p><p>git remote -v</p><p>git push -u myorigin pre分支</p><p>后新建合并请求 myorigin pre分支 到 origin pre分支</p><h3 id="三、发布流程" tabindex="-1"><a class="header-anchor" href="#三、发布流程" aria-hidden="true">#</a> 三、发布流程</h3><p>测试环境 -&gt; 预发布环境</p><p>1.如果开发中有大于50k的图片，需要上传到CDN并替换路径；</p><p>2.把对应的流水线名称以及分支给产品</p><p>例如：CX_rap-web_PROD_FRONT release/pre</p><p>-&gt; 生产环境</p><p>发布之后，pre -&gt; master</p><blockquote><p>ifugle 分支规范</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>命名规范：
分支规则：
	开发分支：feature<span class="token operator">/</span>xxxxx 例：feature<span class="token operator">/</span>bigData<span class="token operator">-</span>v4<span class="token punctuation">.</span><span class="token number">1</span>
	bug修改分支：hotfix<span class="token operator">/</span>xxxxx 例：hotfix<span class="token operator">/</span>cloud<span class="token operator">-</span>tax<span class="token operator">-</span>fix

提交comment：新增 、 修改、 删除 <span class="token operator">+</span> ：


假设你分支为feature<span class="token operator">/</span>yk<span class="token operator">-</span>eTax

接到需求找到对应的项目之后

<span class="token operator">-</span><span class="token operator">&gt;</span>从pre拉出一个分支作为开发分支

<span class="token operator">-</span><span class="token operator">&gt;</span>在开发分支上做需求

<span class="token operator">-</span><span class="token operator">&gt;</span>开发完毕

<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>测试阶段<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>

<span class="token operator">-</span><span class="token operator">&gt;</span>推送feature<span class="token operator">/</span>yk<span class="token operator">-</span>eTax到派生仓库feature<span class="token operator">/</span>yk<span class="token operator">-</span>eTax，提交合并申请到主仓库；后合并feature<span class="token operator">/</span>yk<span class="token operator">-</span>eTax到主仓库的test分支，并且发布到测试环境

<span class="token operator">-</span><span class="token operator">&gt;</span>如果有bug，在你的开发分支修改之后，重复上一步骤

<span class="token operator">-</span><span class="token operator">&gt;</span>测试完毕

<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>预发布阶段<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>

<span class="token operator">-</span><span class="token operator">&gt;</span>推送feature<span class="token operator">/</span>yk<span class="token operator">-</span>eTax到派生仓库feature<span class="token operator">/</span>yk<span class="token operator">-</span>eTax，提交合并申请到主仓库；后合并feature<span class="token operator">/</span>yk<span class="token operator">-</span>eTax到派生仓库的pre分支，提交合并申请到主仓库pre，并且发布到预发布环境

<span class="token operator">-</span><span class="token operator">&gt;</span>如果有bug，在你的开发分支修改之后，重复上一步骤

<span class="token operator">-</span><span class="token operator">&gt;</span>预发布测试完毕

<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>生产环境发布阶段<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>

<span class="token operator">-</span><span class="token operator">&gt;</span>发布到生产环境

<span class="token operator">-</span><span class="token operator">&gt;</span>发起派生仓库pre到主仓库master的合并申请
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>发布手册</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token number">1.</span>切出一个新分支，开发完之后合并到test分支；联系测试发测试环境

<span class="token number">2.</span>测试通过之后，fork一个新的仓库，在新仓库中合并到pre分支，提交新仓库的pre分支合并到原始仓库的pre分支的合并申请。合并之后，自行发预发布环境

<span class="token number">3.</span>预发布完成，测试通过之后。告知产品云效流水线名称，由产品发起审批
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,53),r=[t];function o(l,c){return s(),n("div",null,r)}const d=a(i,[["render",o],["__file","git分支相关操作.html.vue"]]);export{d as default};
