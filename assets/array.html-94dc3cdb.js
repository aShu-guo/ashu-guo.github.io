import{_ as n,o as a,c as s,b as p}from"./app-a46f6870.js";const t={},e=p(`<blockquote><p>array api</p></blockquote><ol><li>reduce</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">]</span>
arr<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">pre<span class="token punctuation">,</span> cur</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> pre<span class="token punctuation">.</span>value <span class="token operator">+</span> cur<span class="token punctuation">.</span>value<span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * 如果给了默认值，会把initValue作为pre传入reducer函数
 * 此时从initValut中取value属性为undefined
 *
 * 最终输出为NaN
 */</span>
arr<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">pre<span class="token punctuation">,</span> cur</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> pre<span class="token punctuation">.</span>value <span class="token operator">+</span> cur<span class="token punctuation">.</span>value<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * 如果与数组中元素结构保持一致，回调函数中的返回结果为一个number类型的值
 *
 * 输出仍为NaN
 */</span>
arr<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">pre<span class="token punctuation">,</span> cur</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> pre<span class="token punctuation">.</span>value <span class="token operator">+</span> cur<span class="token punctuation">.</span>value<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * 如果reduce需要处理的数组是一个对象时，
 *      1. 初始值结构与回调返回值的结构需要与数组中的元素结构保持一致
 *      2. 也可以先使用map返回出对应的值，再去reduce
 */</span>
arr<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">pre<span class="token punctuation">,</span> cur</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">value</span><span class="token operator">:</span> pre<span class="token punctuation">.</span>value <span class="token operator">+</span> cur<span class="token punctuation">.</span>value<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value
arr<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> item<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">pre<span class="token punctuation">,</span> cur</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> pre <span class="token operator">+</span> cur<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),c=[e];function o(u,l){return a(),s("div",null,c)}const r=n(t,[["render",o],["__file","array.html.vue"]]);export{r as default};