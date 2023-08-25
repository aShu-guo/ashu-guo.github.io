import{_ as n,o as a,c as e,b as s}from"./app-a46f6870.js";const i={},c=s(`<h1 id="transition组件类名变更" tabindex="-1"><a class="header-anchor" href="#transition组件类名变更" aria-hidden="true">#</a> Transition组件类名变更</h1><h2 id="概要" tabindex="-1"><a class="header-anchor" href="#概要" aria-hidden="true">#</a> 概要</h2><ul><li>重命名v-enter为v-enter-from</li><li>重命名v-leave为v-leave-from</li><li>重命名v-appear为v-appear-from</li></ul><h2 id="基础用例" tabindex="-1"><a class="header-anchor" href="#基础用例" aria-hidden="true">#</a> 基础用例</h2><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/* before */</span>
<span class="token selector">.v-enter, .v-leave-to</span> <span class="token punctuation">{</span>
    <span class="token property">opacity</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* after */</span>
<span class="token selector">.v-enter-from, .v-leave-to</span> <span class="token punctuation">{</span>
    <span class="token property">opacity</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="动机" tabindex="-1"><a class="header-anchor" href="#动机" aria-hidden="true">#</a> 动机</h2><p>在2.1.8之前，每个过渡方向我们只有两个过渡类名。例如对于进入过渡，我们有<code>v-enter</code>和<code>v-enter-active</code> 。在v2.1.8，我们引入了v-enter-to来解决进入下一个过渡状态间隔过渡的问题，但是为了向后兼容，v-enter 名称未受影响：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.v-enter, .v-leave-to</span> <span class="token punctuation">{</span>
    <span class="token property">opacity</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.v-leave, .v-enter-to</span> <span class="token punctuation">{</span>
    <span class="token property">opacity</span><span class="token punctuation">:</span> 1
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>.v-enter</code>和<code>.v-leave</code>的不同步和模糊导致很难阅读和理解。这也是我们想要对他更名的原因：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.v-enter-from, .v-leave-to</span> <span class="token punctuation">{</span>
    <span class="token property">opacity</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.v-leave-from, .v-enter-to</span> <span class="token punctuation">{</span>
    <span class="token property">opacity</span><span class="token punctuation">:</span> 1
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样更好的指示了这些类名是如何作用的。</p><h2 id="详细设计" tabindex="-1"><a class="header-anchor" href="#详细设计" aria-hidden="true">#</a> 详细设计</h2><ul><li>重命名v-enter为v-enter-from</li><li>重命名v-leave为v-leave-from</li><li>重命名v-appear为v-appear-from</li><li><code>&lt;Transition&gt;</code>相关的props也需要变更： <ul><li><code>leave-class</code>更名为<code>leave-from-class</code> (在渲染函数和JSX中会被重写为leaveFromClass)</li><li><code>enter-class</code>更名为<code>enter-from-class</code> (在渲染函数和JSX中会被重写为enterFromClass)</li><li><code>appear-class</code>更名为<code>appear-from-class</code> (在渲染函数和JSX中会被重写为appearFromClass)</li></ul></li></ul><h2 id="采取的策略" tabindex="-1"><a class="header-anchor" href="#采取的策略" aria-hidden="true">#</a> 采取的策略</h2><p>在兼容版本中，旧类名很容易被支持，并且抛出警告引导迁移。</p>`,15),t=[c];function l(o,r){return a(),e("div",null,t)}const d=n(i,[["render",l],["__file","0018-transition-class-change.html.vue"]]);export{d as default};
