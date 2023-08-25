import{_ as e,o as a,c as n,b as s}from"./app-a46f6870.js";const i="/imgs/base/git-rebase.gif",d={},r=s('<h1 id="分支进阶操作" tabindex="-1"><a class="header-anchor" href="#分支进阶操作" aria-hidden="true">#</a> 分支进阶操作</h1><h2 id="git-rebase" tabindex="-1"><a class="header-anchor" href="#git-rebase" aria-hidden="true">#</a> git rebase</h2><p>rebase可译为变基，指在一个分支上所有提交应用指定分支的最新节点上</p><p><img src="'+i+`" alt="img.png"></p><h3 id="标准模式" tabindex="-1"><a class="header-anchor" href="#标准模式" aria-hidden="true">#</a> 标准模式</h3><p>假设有分支feature以及分支master，并且当前分支为feature</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>          A---B---C feature
         /
    D---E---F---G master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> rebase master
<span class="token comment"># 或者</span>
<span class="token function">git</span> rebase master feature
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将A、B、C对应的提交变基到master分支上</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>                  A&#39;--B&#39;--C&#39; feature
                 /
    D---E---F---G master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果分支feature上存在与master分支上有相同的改动</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>          A---B---C feature
         /
    D---E---A&#39;---G master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么变基之后的提交记录变为</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>                  B---C feature
                 /
    D---E---A&#39;---G master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="onto-参数" tabindex="-1"><a class="header-anchor" href="#onto-参数" aria-hidden="true">#</a> --onto 参数</h3><p>将一系列提交变基到指定分支上（只会保证在指定分支上，并不会放置在最新的节点上）</p><blockquote><p>用于处理基于其他分支开发的功能分支（feature/A分支需求较多还没有开发完成，而feature/B分支是基于feature/A开发的，但是已经开发完），希望合并到主分支</p></blockquote><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>    o---o---o---o---o  master
         \\
          o---o---o---o---o---o  feature/A
                           \\
                            o---o---o  feature/B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> rebase <span class="token parameter variable">--onto</span> master feature/A feature/B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因为feature/A分支是从master分支上切出的，所以它并不会改变。而feature/B是从feature/A分支上切出，执行变基之后，会将feature/B变为从master上切出。</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>    o---o---o---o---o  master
         \\          \\
          \\          o---o---o  feature/B
           \\
            o---o---o---o---o---o  feature/A

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，rebase不仅可以变基多个分支，也可以操作一个分支来删除commit（删除不连续的commit）</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>    E---F---G---H---I---J  feature/A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> rebase <span class="token parameter variable">--onto</span> feature/A~5 feature/A~3 feature/A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中feature/A~5表示E，feature/A~3表示E、F、G，此时feature/A还剩H、I、J提交。变基之后H、I、J提交覆盖了F、G提交，最终分支变为：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>    E---H&#39;---I&#39;---J&#39; feature/A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="交互模式" tabindex="-1"><a class="header-anchor" href="#交互模式" aria-hidden="true">#</a> 交互模式</h3><p>以上是标准模式的变基操作，即只会将一系列commit集成到指定分支的最新修改。开启交互模式只需要添加参数：-i | --interactive。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 假设有以下提交</span>
commit 936e658ab28704455fd10d5a480b5b0fa0e43625 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master, origin/v1.2-1110, origin/master, v1.2-1110<span class="token punctuation">)</span>
commit 12d5aae891d92b94cc601c9777dfca6d951ee8c4 feat:<span class="token string">&#39;生产环境修改ws配置&#39;</span>
commit fba7386ff9a4d0524e26a817e2a06cd17caa7541 fix:<span class="token string">&#39;样式调整&#39;</span>
commit ae3321e4c0833be2cec233f3eb2e3e3a1bb15662 feat:<span class="token string">&#39;新增部门概念、模块拆分&#39;</span>
commit ebe56a451bdb560135042f8a0bc43d2a6ffb416e feat:<span class="token string">&#39;修改生产环境变量&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设在上述commit中删除掉ae3321e4c0833be2cec233f3eb2e3e3a1bb15662</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># rebase操作的logId必须在ae3321e4c0833be2cec233f3eb2e3e3a1bb15662之前</span>
<span class="token function">git</span> rebase <span class="token parameter variable">-i</span> ebe56a451bdb560135042f8a0bc43d2a6ffb416e
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pick ae3321e feat:<span class="token string">&#39;修改生产环境变量&#39;</span>
pick fba7386 feat:<span class="token string">&#39;上云API新增部门概念、模块拆分&#39;</span>
pick 12d5aae fix:<span class="token string">&#39;样式调整&#39;</span>
pick 936e658 feat:<span class="token string">&#39;生产环境修改ws配置&#39;</span>

<span class="token comment"># Rebase ebe56a4..936e658 onto ebe56a4 (4 commands)</span>
<span class="token comment">#</span>
<span class="token comment"># Commands:</span>
<span class="token comment"># p, pick &lt;commit&gt; = 保留</span>
<span class="token comment"># r, reword &lt;commit&gt; = 保留，但是修改提交信息</span>
<span class="token comment"># e, edit &lt;commit&gt; = 保留但停止修改</span>
<span class="token comment"># s, squash &lt;commit&gt; = 保留，但合并到前一个提交</span>
<span class="token comment"># f, fixup [-C | -c] &lt;commit&gt; = 类似&quot;squash&quot;，但只保留前一个提交的提交信息,。指定参数-c时，仅保留当前提交信息</span>
<span class="token comment"># x, exec &lt;command&gt; = 使用 shell 运行命令</span>
<span class="token comment"># b, break = 在此处停止（使用 &#39;git rebase --continue&#39; 继续变基）</span>
<span class="token comment"># d, drop &lt;commit&gt; = 移除</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将ae3321e修改为drop后并保存退出，</p><h2 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点" aria-hidden="true">#</a> 缺点</h2><ol><li>commit log会变得与实际情况不一致，部分log会丢失,导致排查错误时更困难。</li><li>上手成本较高，新手不建议使用，容易造成commit丢失。</li></ol><h2 id="优点" tabindex="-1"><a class="header-anchor" href="#优点" aria-hidden="true">#</a> 优点</h2><ol><li>commit日志更加清晰明了，而且rebase后的分支比merge更直观</li><li>相对于merge更加灵活，可以胜任复杂的操作。</li></ol>`,40),l=[r];function c(t,m){return a(),n("div",null,l)}const u=e(d,[["render",c],["__file","branch-opt-advance.html.vue"]]);export{u as default};
