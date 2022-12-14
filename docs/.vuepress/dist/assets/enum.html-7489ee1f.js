import{_ as n,p as s,q as a,a1 as t}from"./framework-1443a5b1.js";const p={},e=t(`<blockquote><p>enum</p></blockquote><blockquote><p>const enum 与 enum区别</p></blockquote><blockquote><p>enum 与 as const 区别</p></blockquote><blockquote><p>遍历enum</p></blockquote><ol><li>for...in...</li></ol><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// number enum</span>
<span class="token keyword">enum</span> <span class="token constant">AA</span><span class="token punctuation">{</span>
  aa<span class="token punctuation">,</span>
  bb<span class="token punctuation">,</span>
  cc
<span class="token punctuation">}</span>

<span class="token comment">// output: {&#39;aa&#39;:0,0:&#39;aa&#39;,&#39;bb&#39;:1,1:&#39;bb&#39;,&#39;cc&#39;:2,2:&#39;cc&#39;}</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">AA</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> item <span class="token keyword">in</span> <span class="token constant">AA</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">isNaN</span><span class="token punctuation">(</span><span class="token function">Number</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>Object.keys(obj)</li></ol><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// string enum</span>
<span class="token keyword">enum</span> <span class="token constant">BB</span> <span class="token punctuation">{</span>
  aa <span class="token operator">=</span> <span class="token string">&#39;aa&#39;</span><span class="token punctuation">,</span>
  bb <span class="token operator">=</span> <span class="token string">&#39;bb&#39;</span>
<span class="token punctuation">}</span>

<span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token constant">BB</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token keyword">keyof</span> <span class="token keyword">typeof</span> <span class="token constant">BB</span><span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>key <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">BB</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","enum.html.vue"]]);export{k as default};
