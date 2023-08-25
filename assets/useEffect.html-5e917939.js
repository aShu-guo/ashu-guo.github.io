import{_ as n,o as s,c as a,b as e}from"./app-a46f6870.js";const t={},l=e(`<blockquote><p>useEffect 使用指南 🧭</p></blockquote><p>为纯函数添加副作用，又称为&quot;副作用函数&quot;（纯函数内部不能有状态）</p><blockquote><p>用法</p></blockquote><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">//  为组件添加副作用</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>1.参数</p><ul><li>第一个参数：callback，回调函数</li><li>第二个参数：[] 存放依赖，当依赖发生改变时，触发回调。 <ul><li>不传值时：每次重新渲染都会触发</li><li>依赖为空数组时：副作用函数只会在组件渲染时执行一次</li><li>传入值时：被传入的依赖发生改变时，会触发逻辑执行</li></ul></li></ul><p>2.执行时间</p><ul><li>组件重新渲染时</li><li>依赖发生改变时</li></ul>`,8),c=[l];function o(p,i){return s(),a("div",null,c)}const d=n(t,[["render",o],["__file","useEffect.html.vue"]]);export{d as default};