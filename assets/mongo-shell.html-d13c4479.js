import{_ as n,o as s,c as e,b as a}from"./app-a46f6870.js";const o={},l=a(`<h1 id="mongo-shell-常用命令" tabindex="-1"><a class="header-anchor" href="#mongo-shell-常用命令" aria-hidden="true">#</a> mongo shell 常用命令</h1><p>database -&gt; collection -&gt; document</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 连接mongodb</span>
mongosh <span class="token string">&quot;mongodb 地址&quot;</span>
<span class="token comment"># 使用A database</span>
use A
<span class="token comment"># 查看database A下的所有collections</span>
show collections
<span class="token comment"># 重命名A1 collection为A2</span>
db.A1.renameCollection<span class="token punctuation">(</span><span class="token string">&#39;A2&#39;</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),c=[l];function i(t,d){return s(),e("div",null,c)}const r=n(o,[["render",i],["__file","mongo-shell.html.vue"]]);export{r as default};
