import{_ as n,o as a,c as s,b as e}from"./app-a46f6870.js";const i="/imgs/base/git-checkout-b.png",c="/imgs/base/merge-animation.gif",l={},t=e(`<h1 id="分支基础操作" tabindex="-1"><a class="header-anchor" href="#分支基础操作" aria-hidden="true">#</a> 分支基础操作</h1><p>切记：在进行分支操作之前都必须保持分支上的代码是最新的，意味着每次操作分支之前都必须pull一次</p><h2 id="查看分支" tabindex="-1"><a class="header-anchor" href="#查看分支" aria-hidden="true">#</a> 查看分支</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看所有远程分支</span>
<span class="token function">git</span> branch <span class="token parameter variable">-vv</span>
<span class="token comment"># 查看所有本地分支</span>
<span class="token function">git</span> branch 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="新增分支" tabindex="-1"><a class="header-anchor" href="#新增分支" aria-hidden="true">#</a> 新增分支</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 假设从master分支切出一个新分支：feature/add-branch</span>

<span class="token comment"># 首先切到mater分支</span>
<span class="token function">git</span> checkout master
<span class="token comment"># 拉取master分支最新代码</span>
<span class="token function">git</span> pull
<span class="token comment"># 切出新分支</span>
<span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature/add-branch
<span class="token comment"># 将本地分支与远程分支关联</span>
<span class="token function">git</span> push --set-upstream origin feature/add-branch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+i+`" alt="img.png"></p><h2 id="删除分支" tabindex="-1"><a class="header-anchor" href="#删除分支" aria-hidden="true">#</a> 删除分支</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 假设删除分支：feature/add-branch</span>

<span class="token comment"># 首先切到另外一个分支master</span>
<span class="token function">git</span> checkout master
<span class="token comment"># 删除本地分支</span>
<span class="token function">git</span> branch <span class="token parameter variable">-d</span> feature/add-branch
<span class="token comment"># 删除远程分支</span>
<span class="token function">git</span> push <span class="token parameter variable">--delete</span> origin feature/add-branch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="更改分支名称" tabindex="-1"><a class="header-anchor" href="#更改分支名称" aria-hidden="true">#</a> 更改分支名称</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 假设重命名分支：feature/add-branch -&gt; feature/rename-branch</span>

<span class="token comment"># 首先重命名本地分支</span>
<span class="token function">git</span> branch <span class="token parameter variable">-m</span> feature/add-branch feature/rename-branch
<span class="token comment"># 删除远程分支</span>
<span class="token function">git</span> push <span class="token parameter variable">--delete</span> origin feature/add-branch
<span class="token comment"># 推送最新本地分支到远程</span>
<span class="token function">git</span> push origin feature/rename-branch
<span class="token comment"># 将本地分支与远程分支关联</span>
<span class="token function">git</span> push --set-upstream origin feature/rename-branch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="合并分支" tabindex="-1"><a class="header-anchor" href="#合并分支" aria-hidden="true">#</a> 合并分支</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 在协同开发同一版本需求时，开发者A开发功能A，在开发完功能之后需要合并到同一分支</span>
<span class="token comment"># 开发者A 在分支：feature 上开发</span>

<span class="token comment"># 切换到需要合并的分支并保持代码最新</span>
<span class="token function">git</span> chekcout feature
<span class="token comment"># 拉取最新代码</span>
<span class="token function">git</span> pull
<span class="token comment"># 切换到最终分支</span>
<span class="token function">git</span> checkout master
<span class="token comment"># 拉取最新代码</span>
<span class="token function">git</span> pull
<span class="token comment"># 合并分支feature</span>
<span class="token function">git</span> merge feature
<span class="token comment"># 解决冲突之后提交</span>
<span class="token function">git</span> push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+c+'" alt="img.png"></p>',14),d=[t];function r(m,o){return a(),s("div",null,d)}const u=n(l,[["render",r],["__file","branch-opt-base.html.vue"]]);export{u as default};
