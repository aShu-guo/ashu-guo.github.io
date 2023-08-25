import{_ as n,o as a,c as s,b as e}from"./app-a46f6870.js";const p={},t=e(`<h1 id="合并router的meta对象" tabindex="-1"><a class="header-anchor" href="#合并router的meta对象" aria-hidden="true">#</a> 合并router的meta对象</h1><h2 id="概览" tabindex="-1"><a class="header-anchor" href="#概览" aria-hidden="true">#</a> 概览</h2><p>当创建routes时，我们可以通过meta属性关联一些额外的数据：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span><span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/profile&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">meta</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">requiresAuth</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在路由守卫中和<code>$route</code>中访问：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>router<span class="token punctuation">.</span><span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>to<span class="token punctuation">.</span>meta<span class="token punctuation">.</span>requiresAuth <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>auth<span class="token punctuation">.</span><span class="token function">loggedIn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token string">&#39;/login&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">else</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，当处理内嵌的<code>routes</code>对象时，需要遍历<code>matched</code>数组中的所有对象的<code>meta</code>：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>router<span class="token punctuation">.</span><span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>to<span class="token punctuation">.</span>matched<span class="token punctuation">.</span><span class="token function">some</span><span class="token punctuation">(</span><span class="token parameter">record</span> <span class="token operator">=&gt;</span> record<span class="token punctuation">.</span>meta<span class="token punctuation">.</span>requiresAuth<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个RFC的提议是合并所有<code>matched</code>中路由对象的<code>meta</code>，从父路由到子路由，以便我们可以直接从<code>to.meta.requiresAuth</code> 访问。我认为<code>Nuxt</code>也是这样做的，但是我没有从文档中发现。</p><h2 id="基础用例" tabindex="-1"><a class="header-anchor" href="#基础用例" aria-hidden="true">#</a> 基础用例</h2><p>一个内嵌的路由：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/parent&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">meta</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">requiresAuth</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token literal-property property">isChild</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;child&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">meta</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">isChild</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>导航到<code>/parent/child</code>时，应该构造出一个合并的meta属性为：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>to<span class="token punctuation">.</span>meta <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">requiresAuth</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token literal-property property">isChild</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="动机" tabindex="-1"><a class="header-anchor" href="#动机" aria-hidden="true">#</a> 动机</h2><p>大多数时候，合并<code>meta</code>属性才是我们需要的。我从来没有见过需要始终内嵌最深的那个路由的<code>meta</code>属性。</p><p>这也会移除<code>to.matched.some</code>来检查<code>meta</code>是否存在的的需求，将只需要检查重重载后的<code>meta</code>属性。</p><h2 id="详细设计" tabindex="-1"><a class="header-anchor" href="#详细设计" aria-hidden="true">#</a> 详细设计</h2><p><code>meta</code>属性只会合并第一层级，像<code>Object.assign</code>和<code>...</code>操作符：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/parent&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">meta</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">nested</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;child&#39;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">meta</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">nested</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>/parent/child</code>路由下的meta属性值：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> meta <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">nested</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点" aria-hidden="true">#</a> 缺点</h2><ul><li>这是技术上的重大变更</li></ul>`,24),o=[t];function c(r,l){return a(),s("div",null,o)}const u=n(p,[["render",c],["__file","0022-router-merge-meta-routelocation.html.vue"]]);export{u as default};
