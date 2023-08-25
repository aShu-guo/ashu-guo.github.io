import{_ as a,o as s,c as n,b as e}from"./app-a46f6870.js";const i={},l=e(`<h1 id="常见操作" tabindex="-1"><a class="header-anchor" href="#常见操作" aria-hidden="true">#</a> 常见操作</h1><blockquote><p>删除分支</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>首先切到其他分支，并删除本地分支：git branch <span class="token parameter variable">-d</span> 分支名

删除远程分支：git push origin <span class="token parameter variable">--delete</span> 分支名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h4 id="回滚" tabindex="-1"><a class="header-anchor" href="#回滚" aria-hidden="true">#</a> 回滚</h4></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>查看日志，获取需要回滚的logid

<span class="token function">git</span> rebase <span class="token parameter variable">-i</span> logid

将commit中需要删除的“pick”修改为“drop”，然后保存
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h4 id="回滚到上一提交" tabindex="-1"><a class="header-anchor" href="#回滚到上一提交" aria-hidden="true">#</a> 回滚到上一提交</h4></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> HEAD^ 

<span class="token function">git</span> push origin HEAD <span class="token parameter variable">--force</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>tag</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> tag <span class="token parameter variable">-a</span> v1.2
<span class="token function">git</span> tag v1.2 <span class="token parameter variable">-d</span>
<span class="token function">git</span> push origin v1.2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,29),t=[l];function d(c,r){return s(),n("div",null,t)}const u=a(i,[["render",d],["__file","git分支相关操作.html.vue"]]);export{u as default};
