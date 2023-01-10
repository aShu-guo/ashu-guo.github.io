import{_ as n,p as s,q as a,a1 as e}from"./framework-96b046e1.js";const t={},p=e(`<blockquote><p>stylesheet树 🌲</p></blockquote><p>| DOM树 | ---&gt; | stylesheet树 | ---&gt; | renderObject树 |</p><p>发生在在DOM树构建之后，renderObject树之前</p><p>css的主要来源：浏览器默认样式、行内样式、外联样式以及放在网页中的样式</p><blockquote><p>规则匹配</p></blockquote><p>为可视节点匹配样式（display属性不为none的节点）</p><blockquote><p>布局计算</p></blockquote><p>每个类型的元素都有自己特定的算法（layout）来计算布局信息</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">FrameView</span> <span class="token punctuation">{</span>
    needsLayout <span class="token operator">=</span> <span class="token boolean">false</span>

    <span class="token function">layout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 计算布局位置、元素大小</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>存在子女节点<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">layout</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> frameview <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FrameView</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>frameview<span class="token punctuation">.</span>needsLayout<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 先去计算子女节点的位置以及大小，后去计算当前节点的位置大小（类似vue的生命周期钩子执行顺序）</span>
    frameview<span class="token punctuation">.</span><span class="token function">layout</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>设置了宽高 <span class="token operator">&amp;&amp;</span> 元素宽高超出了给定的值 <span class="token operator">&amp;&amp;</span> overflow的值为visible或者auto<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果被包含元素的宽高超出了给定的值，添加滚动条</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>@开头的css属性</p></blockquote><ul><li>@import 串行导入css</li><li>@font-face 自定义字体名</li><li>@keyframe 定义关键帧</li><li>@media 媒体查询，用于定义不同屏幕的展示样式</li><li>@page 定义打印机样式</li></ul>`,11),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(t,[["render",c],["__file","stylesheet树🌲.html.vue"]]);export{d as default};
