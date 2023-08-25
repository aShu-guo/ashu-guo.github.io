import{_ as a,o as n,c as s,b as e}from"./app-a46f6870.js";const t={},p=e(`<h1 id="移除inline-template" tabindex="-1"><a class="header-anchor" href="#移除inline-template" aria-hidden="true">#</a> 移除inline-template</h1><h2 id="概要" tabindex="-1"><a class="header-anchor" href="#概要" aria-hidden="true">#</a> 概要</h2><p>移除inline-template支持</p><h2 id="动机" tabindex="-1"><a class="header-anchor" href="#动机" aria-hidden="true">#</a> 动机</h2><p><code>inline-template</code>最初引入到Vue中的目的是解决使用Vue逐步增强传统服务端渲染的程序的情况（例如使用 Rails、Django 或 Laravel）。允许用户直接在父组件模板中直接定义子组件。</p><p>这最大的问题是<code>inline-template</code>使作用域变得很难理解。在没有使用<code>inline-template</code> 时，一个简单的假设是任何出现在template中的变量都是由它自身提供（译者注：暂时不考虑mixin），或者通过指令引入作用域变量（例如：v-for或者v-slot）。使用<code>inline-template</code> 会造成多个作用域混合在一个template来打破这个假设。</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
{{ parentMsg }}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>child-comp</span> <span class="token attr-name">inline-template</span><span class="token punctuation">&gt;</span></span>
  {{ parentMsg }}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>child-comp</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个包含slot的组件，<code>{{ parentMsg }}</code>应该会被放置在默认slot的位置。但是使用了<code>inline-template</code> 之后，便不会像预想的那样运行。类似的使用<code>v-for</code>+<code>inline-template</code>也不会像预期那样运行：</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>child-comp</span> <span class="token attr-name">inline-template</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item in list<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
{{ item.msg }}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>child-comp</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个行内模板中的<code>item</code>并不指向父作用域，而是指向的是子组件作用域中的<code>this.item</code>。</p><h2 id="采取的策略" tabindex="-1"><a class="header-anchor" href="#采取的策略" aria-hidden="true">#</a> 采取的策略</h2><h3 id="替换方式1-script-标签" tabindex="-1"><a class="header-anchor" href="#替换方式1-script-标签" aria-hidden="true">#</a> 替换方式1：<code>&lt;script&gt;</code>标签</h3><p><code>inline-template</code>的大多用例假设是没有构建步骤的，所有的template直接写在HTML页面。这种情况下应该使用<code>&lt;script&gt;</code>标签作为一个可选择类型：</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text/html<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>my-comp-template<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> hello <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并且在组件中，使用id选择器指向这个模板：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> MyComp <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;#my-comp-template&#39;</span><span class="token punctuation">,</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这不需要任何构建步骤，可以在所有浏览器中运行，而且不受 DOM 内 HTML 解析警告的约束（例如：你可以使用camelCase命名方法），大多数IDE都可以提供合适的语法高亮。在传统的服务端渲染框架中，这些模板可以拆分成服务器模板部分（包含在主 HTML 模板中）以实现更好的可维护性。</p><h3 id="替换方式2-默认slot" tabindex="-1"><a class="header-anchor" href="#替换方式2-默认slot" aria-hidden="true">#</a> 替换方式2：默认slot</h3><p>先前使用<code>inline-template</code>的组件可以转换为使用默认slot，这样不仅保留内联编写子内容的便利性而且data的作用域也更加精确。</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token comment">&lt;!-- before --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-comp</span> <span class="token attr-name">inline-template</span> <span class="token attr-name">:msg</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>parentMsg<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
{{ msg }} {{ childState }}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-comp</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- after --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-comp</span> <span class="token attr-name">v-slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{ childState }<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
{{ parentMsg }} {{ childState }}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-comp</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>子组件无需提供template便可以渲染在默认slot上（注意在v3中，由于支持了代码片段，所以可以在template中无需根结点也可以写slot）</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token comment">&lt;!--
  in child template, render default slot while passing
  in necessary private state of child.
--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span class="token attr-name">:childState</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>childState<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22),l=[p];function c(i,o){return n(),s("div",null,l)}const d=a(t,[["render",c],["__file","0016-remove-inline-templates.html.vue"]]);export{d as default};
