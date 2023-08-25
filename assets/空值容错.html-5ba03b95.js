import{_ as n,o as s,c as a,b as e}from"./app-a46f6870.js";const l={},o=e(`<blockquote><h4 id="三目表达式" tabindex="-1"><a class="header-anchor" href="#三目表达式" aria-hidden="true">#</a> 三目表达式</h4></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> a
<span class="token keyword">let</span> b <span class="token operator">=</span> a <span class="token operator">?</span> <span class="token string">&#39;1&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;2&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h4 id="链式判断-需要babel支持" tabindex="-1"><a class="header-anchor" href="#链式判断-需要babel支持" aria-hidden="true">#</a> 链式判断----需要babel支持</h4></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// &#39;?.&#39;--可选链</span>
<span class="token keyword">let</span> a
<span class="token keyword">let</span> b <span class="token operator">=</span> a<span class="token operator">?.</span>name <span class="token comment">// 当a非undefined而且非null时，将对象a的name属性值赋值给b</span>

<span class="token comment">// &#39;??&#39;--空值合并运算符</span>
<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">let</span> c
<span class="token keyword">let</span> b <span class="token operator">=</span> a <span class="token operator">??</span> c <span class="token comment">// 当a非undefined而且非null时，b=a否则b=c</span>

<span class="token comment">// &#39;??=&#39;--空值赋值运算符</span>
<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">let</span> c <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span> b
b <span class="token operator">??=</span> a <span class="token comment">// b为null或者undefined时，将右侧值赋值给左侧；反之不赋值</span>
c <span class="token operator">??=</span> a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>&#39;babel支持链式判断符&#39;</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;plugins&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;@babel/plugin-proposal-optional-chaining&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),t=[o];function i(c,p){return s(),a("div",null,t)}const d=n(l,[["render",i],["__file","空值容错.html.vue"]]);export{d as default};
