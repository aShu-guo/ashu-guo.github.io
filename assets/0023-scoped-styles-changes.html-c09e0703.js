import{_ as s,o as e,c as n,b as a}from"./app-a46f6870.js";const c={},d=a(`<h1 id="变更scoped样式" tabindex="-1"><a class="header-anchor" href="#变更scoped样式" aria-hidden="true">#</a> 变更scoped样式</h1><h2 id="概览" tabindex="-1"><a class="header-anchor" href="#概览" aria-hidden="true">#</a> 概览</h2><p>为单文件组件提供一致的自定义css拓展</p><h2 id="基础用例" tabindex="-1"><a class="header-anchor" href="#基础用例" aria-hidden="true">#</a> 基础用例</h2><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token comment">/* deep selectors */</span>
<span class="token selector">::v-deep(.foo)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">/* shorthand */</span>
<span class="token selector">:deep(.foo)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">/* targeting slot content */</span>
<span class="token selector">::v-slotted(.foo)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">/* shorthand */</span>
<span class="token selector">:slotted(.foo)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">/* one-off global rule */</span>
<span class="token selector">::v-global(.foo)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">/* shorthand */</span>
<span class="token selector">:global(.foo)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="动机" tabindex="-1"><a class="header-anchor" href="#动机" aria-hidden="true">#</a> 动机</h2><p>vue SFC 的scoped标记的style只会作用于当前组件。可以改进许多用户遇到的情况。</p><h3 id="深度选择器" tabindex="-1"><a class="header-anchor" href="#深度选择器" aria-hidden="true">#</a> 深度选择器</h3><p>有时我们想要准确的作用子组件指定元素的样式。</p><p>最开始的时候，我们支持<code>&gt;&gt;&gt;</code>关系选择器来支持深度selector。但是，一些css预处理器类似SASS存在解析问题，因为它并不是官方的关系选择器。</p><p>后来我们专项了<code>/deep/</code>，之前作为提议添加到CSS中（甚至已经添加到了chrome中），但最终被废弃。这对一些用户造成了困惑，因为他们担心在Vue SFC中使用<code>/deep/</code>会使已经废弃这个功能的浏览器不支持他们的代码。但是，像<code>&gt;&gt;&gt;</code>、<code>/deep/</code>仅会在Vue SFC compiler编译时重写css时使用，并且会在最终的css中移除。</p><p>为了避免<code>/deep/</code>关系选择器废弃带来的困惑，我们介绍了另外一种自定义的关系选择器：<code>::v-deep</code> ，可以更加准确的知道这是vue独有的拓展，而且使用伪类语法以便预处理器可以解析它。</p><p>先前版本的深度关系选择器也会在当前的vue2 SFC compiler中继续支持，仍会继续对用户产生困惑。在vue3中，我们会废弃<code>&gt;&gt;&gt;</code>、<code>/deep/</code> 的支持。</p><p>在我们为vue3开发新的SFC compiler时，我们注意到从语义上来说css伪类元素并不是关系选择器。而是更多与接收参数的伪类选择器保持一致，因此我们使<code>::v-deep()</code> 按照这个方式工作。如果你不关心准确的<code>v-</code>前缀，你也可以使用更短的<code>:deep()</code>，它们工作原理完全相同。</p><p>目前使用<code>::v-deep</code>作为关系选择器仍然会继续支持，但是我们考虑将它废弃并且抛出警告。</p><h3 id="影响或忽略指定slot内容样式" tabindex="-1"><a class="header-anchor" href="#影响或忽略指定slot内容样式" aria-hidden="true">#</a> 影响或忽略指定slot内容样式</h3><p>目前，从父组件中传递过来的插槽内容会同时受父组件的scoped样式和子组件的scoped样式同时影响。并没有方式准确的影响插槽内容，或者不影响它。</p><p>在vue3中，我们试图让子组件的scoped样式默认不影响插槽内容。并且提供了<code>::v-slotted()</code>（可以简写为<code>::slotted()</code>）准确的影响插槽内容样式。</p><h3 id="一次性的全局样式" tabindex="-1"><a class="header-anchor" href="#一次性的全局样式" aria-hidden="true">#</a> 一次性的全局样式</h3><p>目前添加全局样式时，我们必须要再声明一个非scoped的style标签。为此，我们介绍一个新的<code>::v-global()</code>（简写为<code>::global()</code> ）伪类元素来添加一次性的全局样式。</p><blockquote><p>我们意思到有些用户想要在单页面组件的style中使用props或者state，我们计划支持这项功能，但是不在当前RFC中。</p></blockquote><h2 id="详细设计" tabindex="-1"><a class="header-anchor" href="#详细设计" aria-hidden="true">#</a> 详细设计</h2><ul><li>废弃<code>&gt;&gt;&gt;</code> <code>/deep/</code></li><li><code>::v-deep</code>作为关系选择器使用方式被废弃</li></ul><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/* DEPRECATED */</span>
<span class="token selector">::v-deep .bar</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>取而代之，提供一个接收其他选择器作为参数的伪类元素来实现：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">::v-deep(.bar)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>被编译成：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">[v-data-xxxxxxx] .bar</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>从父组件中传递到子组件的插槽内容不再默认受子组件的scoped样式影响。而是，子组件需要使用新的伪类<code>::v-slotted()</code>作用于指定的元素：</li></ul><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">::v-slotted(.foo)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>被编译成：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.foo[v-data-xxxxxxx-s]</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注意<code>-s</code>后缀，意味着它只会被作用于插槽内容</p><ul><li>新的伪类元素<code>::v-global()</code>可以被用来在scoped样式中添加全局样式：</li></ul><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">::v-global(.foo)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.foo</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>@vue/compiler-sfc</code>的测试用例提供了很多编译转换细节</li></ul><h2 id="采取的策略" tabindex="-1"><a class="header-anchor" href="#采取的策略" aria-hidden="true">#</a> 采取的策略</h2><p>所有之前的深度选择器都会被支持，而且会抛出废弃警告。在大多数用户完成迁移之后，我们将会在未来的某个版本移除它们。</p><p>插槽内容行为的更改在技术上应该会让父组件和子组件之间的样式更加解耦，但是该行为确实会破坏依赖于应用于插槽内容的子样式的现有样式。我们可能需要提供一个选项来保留旧的行为。</p><h2 id="未解决的问题" tabindex="-1"><a class="header-anchor" href="#未解决的问题" aria-hidden="true">#</a> 未解决的问题</h2><p>我们不确定插槽内容行为的更改会影响多少现有的组件 - 对于任何反馈，我们都表示感谢。</p>`,42),l=[d];function i(o,t){return e(),n("div",null,l)}const r=s(c,[["render",i],["__file","0023-scoped-styles-changes.html.vue"]]);export{r as default};
