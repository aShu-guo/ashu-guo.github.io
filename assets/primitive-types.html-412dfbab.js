import{_ as e,o as a,c as s,b as n}from"./app-a46f6870.js";const i={},t=n(`<h1 id="原始数据类型" tabindex="-1"><a class="header-anchor" href="#原始数据类型" aria-hidden="true">#</a> 原始数据类型</h1><p>ts中的原始数据类型只包含了js中一部分（null、undefined除外），分为：</p><ul><li>number：包含浮点型、整数型</li><li>boolean：true、false</li><li>string：字符串</li><li>symbol：用于创建一个全局唯一的标识</li><li>bigint：包含浮点型、整数型，但是可以保存比number更大的正值或者更小的负值</li></ul><h2 id="类型分配" tabindex="-1"><a class="header-anchor" href="#类型分配" aria-hidden="true">#</a> 类型分配</h2><p>创建一个变量时，ts有两种方式来为它分配类型：</p><ul><li>显式分配：写出的代码易于阅读，但代码冗余</li><li>隐式分配：代码简洁，但不易于阅读</li></ul><h3 id="显示分配" tabindex="-1"><a class="header-anchor" href="#显示分配" aria-hidden="true">#</a> 显示分配</h3><p>明确变量类型，无需ts介入</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> name<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&#39;xiaoming&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="隐式分配" tabindex="-1"><a class="header-anchor" href="#隐式分配" aria-hidden="true">#</a> 隐式分配</h3><p>ts根据变量的值<code>猜测</code>变量的类型，也称为<code>infer</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token string">&#39;xiaoming&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>ts也并不是每次都可以合适的根据变量的值&quot;猜测&quot;出类型，例如：<code>JSON.parse</code></p></div>`,13),r=[t];function l(c,d){return a(),s("div",null,r)}const p=e(i,[["render",l],["__file","primitive-types.html.vue"]]);export{p as default};