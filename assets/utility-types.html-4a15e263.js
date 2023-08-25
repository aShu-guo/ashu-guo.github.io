import{_ as n,o as s,c as a,b as e}from"./app-a46f6870.js";const t={},p=e(`<h1 id="实体类型" tabindex="-1"><a class="header-anchor" href="#实体类型" aria-hidden="true">#</a> 实体类型</h1><p>在ts中内置了许多实体类，简化声明类型</p><h2 id="partial" tabindex="-1"><a class="header-anchor" href="#partial" aria-hidden="true">#</a> Partial</h2><p>将对象中的属性都声明为<code>可选的</code></p><h2 id="required" tabindex="-1"><a class="header-anchor" href="#required" aria-hidden="true">#</a> Required</h2><p>将对象中的属性都声明为<code>必须的</code></p><h2 id="record" tabindex="-1"><a class="header-anchor" href="#record" aria-hidden="true">#</a> Record</h2><p>声明指定类型key和指定类型的value构成对象</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> obj<span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">number</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>xiaohua<span class="token operator">:</span> <span class="token number">23</span><span class="token punctuation">,</span> xiaoming<span class="token operator">:</span> <span class="token number">26</span><span class="token punctuation">}</span>
<span class="token comment">// 等价于</span>
<span class="token keyword">const</span> obj2<span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span>xiaohua<span class="token operator">:</span> <span class="token number">23</span><span class="token punctuation">,</span> xiaoming<span class="token operator">:</span> <span class="token number">26</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="omit" tabindex="-1"><a class="header-anchor" href="#omit" aria-hidden="true">#</a> Omit</h2><p>忽略对象的属性，第二个类型变量为<code>union type</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    location<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> a<span class="token operator">:</span> Omit<span class="token operator">&lt;</span>Person<span class="token punctuation">,</span> <span class="token string">&#39;age&#39;</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
    location<span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="pick" tabindex="-1"><a class="header-anchor" href="#pick" aria-hidden="true">#</a> Pick</h2><p>只取对象中指定属性，第二个类型变量与<code>Omit</code>相同为<code>union type</code></p><h2 id="exclude" tabindex="-1"><a class="header-anchor" href="#exclude" aria-hidden="true">#</a> Exclude</h2><p>去除union type的指定类型</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Primitive</span> <span class="token operator">=</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token builtin">boolean</span>
<span class="token keyword">const</span> value<span class="token operator">:</span> Exclude<span class="token operator">&lt;</span>Primitive<span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="returntype" tabindex="-1"><a class="header-anchor" href="#returntype" aria-hidden="true">#</a> ReturnType</h2><p>提取函数类型的返回值的类型</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">introduce</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">string</span>
<span class="token keyword">const</span> value<span class="token operator">:</span> ReturnType<span class="token operator">&lt;</span>introduce<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token string">&#39;123&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="parameters" tabindex="-1"><a class="header-anchor" href="#parameters" aria-hidden="true">#</a> Parameters</h2><p>提取参数列表的类型，并构成一个array</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">introduce</span> <span class="token operator">=</span> <span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span>

<span class="token keyword">const</span> nickName<span class="token operator">:</span> Parameters<span class="token operator">&lt;</span>introduce<span class="token operator">&gt;</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;123&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="readonly" tabindex="-1"><a class="header-anchor" href="#readonly" aria-hidden="true">#</a> Readonly</h2><p>基于现有类型创建一个属性只读的类型，一旦赋值便无法更改</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> person<span class="token operator">:</span> Readonly<span class="token operator">&lt;</span>Person<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">&quot;Dylan&quot;</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token number">35</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// TS2540: Cannot assign to &#39;name&#39; because it is a read-only property.</span>
<span class="token comment">// person.name = &#39;Israel&#39;; </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,26),o=[p];function r(c,i){return s(),a("div",null,o)}const d=n(t,[["render",r],["__file","utility-types.html.vue"]]);export{d as default};
