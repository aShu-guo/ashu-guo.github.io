import{_ as n,o as s,c as a,b as e}from"./app-a46f6870.js";const i="/imgs/base/git-commit.gif",l="/imgs/base/git-reset.gif",c={},t=e(`<h1 id="仓库相关操作" tabindex="-1"><a class="header-anchor" href="#仓库相关操作" aria-hidden="true">#</a> 仓库相关操作</h1><h2 id="基础操作" tabindex="-1"><a class="header-anchor" href="#基础操作" aria-hidden="true">#</a> 基础操作</h2><h3 id="变动代码提交" tabindex="-1"><a class="header-anchor" href="#变动代码提交" aria-hidden="true">#</a> 变动代码提交</h3><blockquote><p>git仓库分为4个部分：工作区 -&gt; 暂存区 -&gt; 本地仓库 -&gt; 远程仓库</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 将变动代码提交到暂存区</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token comment"># 将变动代码提交到本地仓库</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;feat:提交测试&quot;</span>
<span class="token comment"># 拉取最新代码</span>
<span class="token function">git</span> pull
<span class="token comment"># 如果有冲突，则解决冲突，解决完之后提交代码到远程仓库</span>
<span class="token function">git</span> push origin feature/rename-branch
<span class="token comment"># 可选的简写：前提是远程分支对应的是origin</span>
<span class="token function">git</span> push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+i+`" alt="img.png"></p><h3 id="丢弃代码" tabindex="-1"><a class="header-anchor" href="#丢弃代码" aria-hidden="true">#</a> 丢弃代码</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 改动了工作区的文件，但是希望丢弃掉</span>

<span class="token comment"># 丢弃工作区指定文件的代码</span>
<span class="token function">git</span> checkout file_path
<span class="token comment"># 丢弃所有工作区的代码</span>
<span class="token function">git</span> checkout <span class="token builtin class-name">.</span>

<span class="token comment"># 已经提交到暂存区的文件希望回退变动文件到工作区中</span>

<span class="token comment"># 回退暂存区指定文件的代码到工作区</span>
<span class="token function">git</span> reset file_path
<span class="token comment"># 回退所有暂存区的代码</span>
<span class="token function">git</span> reset <span class="token builtin class-name">.</span>

<span class="token comment"># 已经提交到本地仓库的改动希望丢弃代码</span>

<span class="token comment"># 回滚代码到上一个版本</span>
<span class="token function">git</span> reset <span class="token parameter variable">--head</span> HEAD^
<span class="token comment"># 回滚代码到n个版本</span>
<span class="token function">git</span> reset <span class="token parameter variable">--head</span> HEAD~n

<span class="token comment"># 已经提交到远程仓库的改动希望丢弃代码</span>

<span class="token comment"># 首先查看logId</span>
<span class="token function">git</span> log
<span class="token comment"># 回退本地仓库到指定logId</span>
<span class="token function">git</span> reset <span class="token parameter variable">--hard</span> logId
<span class="token comment"># 强推到远程仓库</span>
<span class="token function">git</span> push <span class="token parameter variable">--force</span> origin HEAD
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+l+`" alt="img.png"></p><h3 id="代码暂存" tabindex="-1"><a class="header-anchor" href="#代码暂存" aria-hidden="true">#</a> 代码暂存</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 在开发需求时，需要修改其他分支的bug时，可以先暂存工作区的改动</span>

<span class="token comment"># 暂存当前工作区代码</span>
<span class="token function">git</span> stash
<span class="token comment"># 改完bug之后再恢复工作区改动代码</span>
<span class="token function">git</span> stash pop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),d=[t];function o(r,p){return s(),a("div",null,d)}const v=n(c,[["render",o],["__file","repo-opt.html.vue"]]);export{v as default};
