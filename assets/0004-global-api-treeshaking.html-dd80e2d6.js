import{_ as n,o as a,c as s,b as e}from"./app-a46f6870.js";const t={},p=e(`<h1 id="全局api-tree-shaking" tabindex="-1"><a class="header-anchor" href="#全局api-tree-shaking" aria-hidden="true">#</a> 全局API tree-shaking</h1><h2 id="概要" tabindex="-1"><a class="header-anchor" href="#概要" aria-hidden="true">#</a> 概要</h2><p>尽可能通过具名导出，使Vue运行时被tree-shaking</p><h2 id="基本示例" tabindex="-1"><a class="header-anchor" href="#基本示例" aria-hidden="true">#</a> 基本示例</h2><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>import { nextTick, observable } from &#39;vue&#39;

nextTick(() =&gt; {})

const obj = observable({})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="动机" tabindex="-1"><a class="header-anchor" href="#动机" aria-hidden="true">#</a> 动机</h2><p>随着Vue的api新增，我们需要时刻平衡新功能和打包大小。我们想尽可能的使Vue足够小，但是也不能因为打包大小而限制性能。（译者注：要追求性能和打包大小之间的平衡）</p><p>借助ES module静态分析的友好设计、现代bundler和minifier相结合，可以消除未在bundle中导出的es modules。我们可以利用这个优点来重构Vue的全局API和内置的API，以便用户只消费他们使用的功能。</p><p>另外，对于不使用可选功能的用户而言，这并不会增加最终bundle的大小，因此我们有更多的空间来提供可选的功能。</p><h2 id="详细设计" tabindex="-1"><a class="header-anchor" href="#详细设计" aria-hidden="true">#</a> 详细设计</h2><p>在2.x版本，所有的全局API通过单一的Vue对象对外暴露：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

Vue<span class="token punctuation">.</span><span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> obj <span class="token operator">=</span> Vue<span class="token punctuation">.</span><span class="token function">observable</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在3.x版本中，他们只能通过具名导出：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Vue<span class="token punctuation">,</span> <span class="token punctuation">{</span>nextTick<span class="token punctuation">,</span> observable<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

Vue<span class="token punctuation">.</span>nextTick <span class="token comment">// undefined</span>

<span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token function">observable</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过不再默认导出Vue上挂载所有API，任何未使用的API都会被支持tree-shaking的打包器丢弃，并不会打包到最终的bundle中。</p><h2 id="受影响的2-x版本的api" tabindex="-1"><a class="header-anchor" href="#受影响的2-x版本的api" aria-hidden="true">#</a> 受影响的2.x版本的API</h2><ul><li><code>Vue.nextTick</code></li><li><code>Vue.observable</code></li><li><code>Vue.version</code></li><li><code>Vue.compile</code>(仅存在完整版本中)</li><li><code>Vue.set</code>(仅存在兼容版本中)</li><li><code>Vue.delete</code>(仅存在兼容版本中)</li></ul><h2 id="内置的helper" tabindex="-1"><a class="header-anchor" href="#内置的helper" aria-hidden="true">#</a> 内置的helper</h2><p>除了公共API，一些其他的内置组件或者helper也要具名导出。编译器才会只导出用到的API，例如：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>transition</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-show</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ok<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>hello<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>transition</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译结果如下（只是处于解释目的，并不是实际输出）：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>h<span class="token punctuation">,</span> Transition<span class="token punctuation">,</span> applyDirectives<span class="token punctuation">,</span> vShow<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>Transition<span class="token punctuation">,</span> <span class="token punctuation">[</span>
        <span class="token function">applyDirectives</span><span class="token punctuation">(</span><span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;hello&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>vShow<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ok<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这意味着，<code>Transition</code>组件只会在被实际使用时才会被导出。</p><p><strong>需要注意以上只适用于支持tree-shaking的打包器（bundler）构建出的ES模块产物，- UMD产物仍会包含所有API并且导出Vue的所有全局变量（并且编译器将会输出适当的产物）</strong></p><h2 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点" aria-hidden="true">#</a> 缺点</h2><p>用户不能再单独导出Vue变量来使用API。然而，这对于打包体积而言是有价值的。</p><h3 id="在插件中使用全局api" tabindex="-1"><a class="header-anchor" href="#在插件中使用全局api" aria-hidden="true">#</a> 在插件中使用全局API</h3><p>一些插件可能依赖原有暴露在Vue上的全局API：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> plugin <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">install</span><span class="token operator">:</span> <span class="token parameter">Vue</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        Vue<span class="token punctuation">.</span><span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token comment">// ...</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在3.0版本，插件开发者必须直接导出要使用的API：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>nextTick<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token keyword">const</span> plugin <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">install</span><span class="token operator">:</span> <span class="token parameter">app</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token comment">// ...</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将会造成一些负担，因为要求库开发者需要合理配置Vue相关的打包配置：</p><ul><li>Vue不应该被打包进库中；</li><li>对于ES模块构建，应该保留导出的API并最终交给打包器处理；</li><li>对于UMD/browser构建，应该先尝试<code>Vue.h</code>然后再降级<code>require</code>处理。</li></ul><p>这是React的常见做法，而且也可能存在webpack、rollup中。一些Vue的库也是如此做的。我们仅需要提供合适的文档以及工具支持。</p><h2 id="可替代方案" tabindex="-1"><a class="header-anchor" href="#可替代方案" aria-hidden="true">#</a> 可替代方案</h2><p>N/A</p><h2 id="采取的策略" tabindex="-1"><a class="header-anchor" href="#采取的策略" aria-hidden="true">#</a> 采取的策略</h2><p>应该提供一个code模版作为迁移工具的一部分。</p>`,38),i=[p];function c(o,l){return a(),s("div",null,i)}const d=n(t,[["render",c],["__file","0004-global-api-treeshaking.html.vue"]]);export{d as default};