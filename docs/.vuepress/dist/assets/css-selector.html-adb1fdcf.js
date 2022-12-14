import{_ as n,p as s,q as a,a1 as e}from"./framework-1443a5b1.js";const t={},l=e(`<p>1.lastchild</p><p>为class为main-box下的最后一个div标签添加样式</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.main-box div:last-child</span> 
<span class="token punctuation">{</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> 1/<span class="token atrule"><span class="token rule">@r</span><span class="token punctuation">;</span></span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 12/<span class="token atrule"><span class="token rule">@r</span><span class="token punctuation">;</span></span>
  <span class="token property">color</span><span class="token punctuation">:</span> #999999<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 17/<span class="token atrule"><span class="token rule">@r</span><span class="token punctuation">;</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h4 id="后代选择器-and-子选择器" tabindex="-1"><a class="header-anchor" href="#后代选择器-and-子选择器" aria-hidden="true">#</a> 后代选择器 and 子选择器</h4></blockquote><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">1.后代选择器（包含选择器）：空格  &#39;所有后代&#39;
.buttons button</span><span class="token punctuation">{</span>
  class为buttons的所有button标签
<span class="token punctuation">}</span>

<span class="token selector">2.子选择器：&gt;  class为buttons元素中的第一个button标签
.buttons &gt; button</span><span class="token punctuation">{</span>
  第一个class为buttons的所有button标签
<span class="token punctuation">}</span>

<span class="token selector">当class=buttons的元素只有一个时，作用是相同的


&amp; &gt; view:not(:last-child)</span> <span class="token punctuation">{</span>
    <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 21px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),i=[l];function c(p,o){return s(),a("div",null,i)}const d=n(t,[["render",c],["__file","css-selector.html.vue"]]);export{d as default};
