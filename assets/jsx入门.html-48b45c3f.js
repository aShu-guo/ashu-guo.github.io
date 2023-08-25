import{_ as s,o as n,c as a,b as p}from"./app-a46f6870.js";const t={},e=p(`<blockquote><p>JSX</p></blockquote><p>jsx本质上是一个语法糖，等价于</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>component<span class="token punctuation">,</span> props<span class="token punctuation">,</span> <span class="token operator">...</span>children<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在vue生态中，类似render函数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">render</span><span class="token punctuation">(</span>tag<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>注意事项：</code></p><ul><li>首字母必须大写</li><li>使用单层大括号<code>{}</code>包裹js表达式（vue使用<code>{{}}</code>）</li><li>标签名也支持Function类型的变量 🆕</li><li>React必须在jsx作用域内或者作为全局变量引入</li><li>可以使用点语法</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>Story<span class="token punctuation">.</span>Provide<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>Story<span class="token punctuation">.</span>Provide<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>不能是表达式，但是可以将变量首先赋值给一个首字母大写的变量（动态组件）</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>PhotoStory<span class="token punctuation">,</span> VideoStory<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./stories&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> components <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">photo</span><span class="token operator">:</span> PhotoStory<span class="token punctuation">,</span>
    <span class="token literal-property property">video</span><span class="token operator">:</span> VideoStory
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">Story</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 正确！JSX 类型可以是大写字母开头的变量。</span>
    <span class="token keyword">const</span> SpecificStory <span class="token operator">=</span> components<span class="token punctuation">[</span>props<span class="token punctuation">.</span>storyType<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;</span>SpecificStory story<span class="token operator">=</span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>story<span class="token punctuation">}</span><span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>props相关</code></p><ul><li>字符串字面量</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>TreeView title<span class="token operator">=</span><span class="token string">&#39;设备树&#39;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>TreeView<span class="token operator">&gt;</span>
<span class="token comment">// 等价于</span>
<span class="token operator">&lt;</span>TreeView title<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">&#39;设备树&#39;</span><span class="token punctuation">}</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>TreeView<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>boolean类型</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>TreeView is<span class="token operator">-</span><span class="token keyword">default</span><span class="token operator">-</span>expand<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>TreeView<span class="token operator">&gt;</span>
<span class="token comment">// 等价于</span>
<span class="token operator">&lt;</span>TreeView is<span class="token operator">-</span><span class="token keyword">default</span><span class="token operator">-</span>expand<span class="token operator">=</span><span class="token punctuation">{</span><span class="token boolean">true</span><span class="token punctuation">}</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>TreeView<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>支持表达式</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>TreeView is<span class="token operator">-</span><span class="token keyword">default</span><span class="token operator">-</span>expand<span class="token operator">=</span><span class="token punctuation">{</span><span class="token operator">!</span>isShow<span class="token punctuation">}</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>TreeView<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>支持es6展开（$listener、$attrs）</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> props <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">isDefaultExpand</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;设备树&#39;</span>
<span class="token punctuation">}</span>

<span class="token operator">&lt;</span>TreeView <span class="token punctuation">{</span><span class="token operator">...</span>props<span class="token punctuation">}</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>TreeView<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>子元素:props.children</code></p><p>被开始标签和结束标签包裹的为组件的子元素</p><ul><li>静态文本作为子元素等价于html标签</li><li>表达式作为子元素</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> uavList <span class="token operator">=</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span><span class="token literal-property property">uavNum</span><span class="token operator">:</span> <span class="token string">&#39;xxx1&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">uavName</span><span class="token operator">:</span> <span class="token string">&#39;大疆01&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span><span class="token literal-property property">uavNum</span><span class="token operator">:</span> <span class="token string">&#39;xxx2&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">uavName</span><span class="token operator">:</span> <span class="token string">&#39;大疆02&#39;</span><span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token operator">&lt;</span>div key<span class="token operator">=</span><span class="token punctuation">{</span>item<span class="token punctuation">.</span>uavNum<span class="token punctuation">}</span><span class="token operator">&gt;</span><span class="token punctuation">{</span>item<span class="token punctuation">.</span>uavName<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
            <span class="token punctuation">{</span>uavList<span class="token punctuation">}</span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>函数作为子元素 🆕</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Repeat</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> items <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> props<span class="token punctuation">.</span>numTimes<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        items<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span><span class="token function">children</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token operator">&lt;</span><span class="token operator">&gt;</span><span class="token punctuation">{</span>items<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span><span class="token operator">&gt;</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token operator">&lt;</span>Repeat numTimes<span class="token operator">=</span><span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>
            <span class="token punctuation">{</span><span class="token parameter">index</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token operator">&lt;</span>div key<span class="token operator">=</span><span class="token punctuation">{</span>index<span class="token punctuation">}</span><span class="token operator">&gt;</span>line<span class="token operator">+</span><span class="token punctuation">{</span>index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>Repeat<span class="token operator">&gt;</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,25),o=[e];function c(l,i){return n(),a("div",null,o)}const u=s(t,[["render",c],["__file","jsx入门.html.vue"]]);export{u as default};
