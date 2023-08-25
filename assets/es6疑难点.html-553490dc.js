import{_ as n,o as s,c as a,b as e}from"./app-a46f6870.js";const t={},p=e(`<p>1.module的导入和导出</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//export.js</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;hello&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function">readme</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;README.md&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token comment">//import.js</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> fun <span class="token keyword">from</span> <span class="token string">&#39;./export&#39;</span>
<span class="token keyword">import</span> mod <span class="token keyword">from</span> <span class="token string">&#39;./export&#39;</span>
fun<span class="token punctuation">.</span><span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
mod<span class="token punctuation">.</span><span class="token function">readme</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将一个大的程序拆分成多个小的模块，使用的时候可以方便的组装起来；</p><p>export default 配合import xxxx使用</p><p>export function|class|let|const|var|{xxx,xxx}| 配合import xxx|{xxx,xxx}|* as xxx| 使用</p>`,5),o=[p];function c(l,i){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","es6疑难点.html.vue"]]);export{r as default};
