import{_ as e,p as a,q as s,a1 as n}from"./framework-1443a5b1.js";const i={},c=n(`<h1 id="css单位辨析" tabindex="-1"><a class="header-anchor" href="#css单位辨析" aria-hidden="true">#</a> css单位辨析</h1><p>解释前端css涉及到的单位：px、vw、vh、rem、dpi等，以及设计图中的px表示的含义</p><h2 id="viewport" tabindex="-1"><a class="header-anchor" href="#viewport" aria-hidden="true">#</a> Viewport</h2><p>在浏览器范畴里，它代表的是浏览器中网站可见内容的部分。视口外的内容在被滚动进来前都是不可见的。</p><p>概括地说，视口基本上是当前文档的可见部分。</p><ul><li>可视视口：视口当前可见的部分</li><li>布局视口：<code>innerHeight</code> 和 <code>innerWidth</code> 所组成的区域</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 表示在浏览器y轴上，除视口之外的元素占位的像素值：包括但不仅限于收藏夹、地址栏、书签栏等</span>
<span class="token keyword">const</span> extraHeight <span class="token operator">=</span> window<span class="token punctuation">.</span>outerHeight <span class="token operator">-</span> window<span class="token punctuation">.</span>innerHeight

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>可视视口与布局视口之间的关系</code></p><p>布局视口总是大于或者等于可视视口区域，</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>可视视口 <span class="token operator">&gt;=</span> 布局视口
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>场景举例：</p><ul><li>键盘在手机上弹出的时候，可视视口变小，但是布局视口没有改变</li><li>之前隐藏的地址栏变得可见的时候，可视视口变小，但是布局视口没有改变</li></ul><blockquote><p>vh &amp;&amp; vw</p></blockquote><p>1vh 单位是 1% 布局视口的高度，vw 单位与此类似。</p>`,14),t=[c];function r(o,d){return a(),s("div",null,t)}const l=e(i,[["render",r],["__file","css单位辨析.html.vue"]]);export{l as default};
