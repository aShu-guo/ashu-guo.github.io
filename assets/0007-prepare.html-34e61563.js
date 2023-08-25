import{_ as a,o as n,c as s,b as e}from"./app-a46f6870.js";const t={},l=e(`<h1 id="准备篇" tabindex="-1"><a class="header-anchor" href="#准备篇" aria-hidden="true">#</a> 准备篇</h1><h2 id="什么是函数式组件" tabindex="-1"><a class="header-anchor" href="#什么是函数式组件" aria-hidden="true">#</a> 什么是函数式组件？</h2><p>函数式组件是Vue提供的一个无状态（没有<code>data</code>选项）、没有this上下文的组件形式，用户可以通过两种方式标记组件为函数式组件</p><ol><li>标记在template上</li></ol><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">functional</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>标记在选项上</li></ol><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">functional</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="函数式组件与普通组件有什么区别" tabindex="-1"><a class="header-anchor" href="#函数式组件与普通组件有什么区别" aria-hidden="true">#</a> 函数式组件与普通组件有什么区别？</h2><p>函数式组件是以纯函数的形式存在，即输入可知、结果必然可知，内部没有状态，且不会在内部更改外部状态。而且函数式组件的性能相对更好，因为它仅仅是一个函数。</p><h2 id="在什么情况下应该使用函数式组件" tabindex="-1"><a class="header-anchor" href="#在什么情况下应该使用函数式组件" aria-hidden="true">#</a> 在什么情况下应该使用函数式组件？</h2><p>根据函数式组件的概念可知，它是无状态和this引用的。那么它的使用场景必须满足这两种限制。</p>`,11),i=[l];function p(c,o){return n(),s("div",null,i)}const d=a(t,[["render",p],["__file","0007-prepare.html.vue"]]);export{d as default};