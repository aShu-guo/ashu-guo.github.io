import{_ as a,o as n,c as s,b as e}from"./app-a46f6870.js";const t={},c=e(`<h1 id="用v-model参数替换v-bind-sync修饰符" tabindex="-1"><a class="header-anchor" href="#用v-model参数替换v-bind-sync修饰符" aria-hidden="true">#</a> 用v-model参数替换v-bind sync修饰符</h1><h2 id="概要" tabindex="-1"><a class="header-anchor" href="#概要" aria-hidden="true">#</a> 概要</h2><p>移除<code>v-bind</code>的<code>sync</code>修饰符，并用<code>v-model</code>替换</p><h2 id="基本示例" tabindex="-1"><a class="header-anchor" href="#基本示例" aria-hidden="true">#</a> 基本示例</h2><p>而不是：</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>MyComponent</span> <span class="token attr-name"><span class="token namespace">v-bind:</span>title.sync</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>title<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>应该是：</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>MyComponent</span> <span class="token attr-name"><span class="token namespace">v-model:</span>title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>title<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="动机" tabindex="-1"><a class="header-anchor" href="#动机" aria-hidden="true">#</a> 动机</h2><p><code>v-bind.sync</code>在Vue2中造成了相当多的困惑，因为用户希望像<code>v-bind</code>那样使用它：</p><p>将<code>v-bind.sync</code>视为具有额外行为的普通绑定是错误的，因为这与双向绑定有本质上的不同。<code>.sync</code> 修饰符的工作原理像v-model，它是Vue中另外一个支持双向绑定的语法糖。<code>sync</code>与<code>v-model</code>主要的不同是前者支持双向绑定多个变量。</p><p>这不仅让我思考：既然告诉用户不要像<code>v-bind</code>那样思考<code>v-bind.sync</code>，又告诉用户它的原理像<code>v-model</code> ，那么为什么不使它成为<code>v-model</code>的一部分呢？</p><h2 id="详细设计" tabindex="-1"><a class="header-anchor" href="#详细设计" aria-hidden="true">#</a> 详细设计</h2><p>注意：虽然这不是提案的异步，但是<code>v-model</code>的实现细节可能会在Vue3中改变，使透明包裹组件更容易实现。当你看到<code>modelValue</code> 属性和<code>update:modelValue</code>事件时，应该意识到这是支持表单元素上特殊行为的占位符。这并不在该RFC中。</p><h3 id="在一个元素上" tabindex="-1"><a class="header-anchor" href="#在一个元素上" aria-hidden="true">#</a> 在一个元素上</h3><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>xxx<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- 是下面的简写 --&gt;</span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span>
    <span class="token attr-name">:model-value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>xxx<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name"><span class="token namespace">@update:</span>model-value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>newValue =&gt; { xxx = newValue }<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name"><span class="token namespace">v-model:</span>aaa</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>xxx<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>需要注意的是在当前版本使用<code>v-bind:aaa.sync=&quot;xxx&quot;</code>并不会抛出一个编译时异常。</p><h3 id="在一个组件上" tabindex="-1"><a class="header-anchor" href="#在一个组件上" aria-hidden="true">#</a> 在一个组件上</h3><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>MyComponent</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>xxx<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>

<span class="token comment">&lt;!-- 是下面的简写 --&gt;</span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>MyComponent</span>
    <span class="token attr-name">:model-value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>xxx<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name"><span class="token namespace">@update:</span>model-value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>newValue =&gt; { xxx = newValue }<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>MyComponent</span> <span class="token attr-name"><span class="token namespace">v-model:</span>aaa</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>xxx<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>

<span class="token comment">&lt;!-- 是下面的简写 --&gt;</span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>MyComponent</span>
    <span class="token attr-name">:aaa</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>xxx<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name"><span class="token namespace">@update:</span>aaa</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>newValue =&gt; { xxx = newValue }<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="复制v-bind-sync-xxx-传递对象的行为" tabindex="-1"><a class="header-anchor" href="#复制v-bind-sync-xxx-传递对象的行为" aria-hidden="true">#</a> 复制<code>v-bind.sync=&quot;xxx&quot;</code>传递对象的行为</h3><p>其他两个带参数的指令是<code>v-bind</code>和<code>v-on</code>，它们都支持传递对象给无参数版本，但是<code>v-model</code> 的无参数版本已经作为<code>v-model:model-value=&quot;xxx&quot;</code>的简写。我认为有以下几种方案：</p><ol><li>改变<code>v-model=&quot;xxx&quot;</code>的行为（不再作为简写），强制要求用户通过<code>v-model:model-value=&quot;xxx&quot;</code> 支持旧的行为。这可以与<code>v-bind</code>和<code>v-on</code>的行为保持一致，但是也会造成另外一个重大改变，而且也会使经常使用的场景变得冗余和复杂。</li><li>为<code>v-model</code>新增一个修饰符（例如：<code>.spread</code>）。这是影响较小的变更，但是与另外两个指令的无参数版本传递对象的行为不一致，会隐式的造成困惑并且提高框架的复杂度。</li><li>监听传入的值，如果是对象则改变对应的行为。这也是影响较小的变更，但是可以与另外两个指令的行为保持一致，因为与<code>v-bind=&quot;{ ...xxx }&quot;</code>具有相同的效果。</li><li>简化并且不允许传递对象到<code>v-model</code>。这可以避免上面提议中的问题，但是缺点是让一些用户更难迁移到Vue3（尽管可能是很小的一部分）。从<code>v-bind.sync</code> 中受益的Templates或者JSX变得编写和维护起来更加乏味（使用 createElement/h 强制重构渲染函数）。</li></ol><p>并没有一个最好的观点，但是我更支持观点2，我也很想听听可能错过的其他解决方案。</p><h2 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点" aria-hidden="true">#</a> 缺点</h2><p>除了重大变更造成的不可避免的痛苦外，我认为这个语法造成痛苦相对较小 - 部分原因是<code>.sync</code>并没有被广泛使用，也正因如此迁移起来相对容易。</p><h2 id="采取的策略" tabindex="-1"><a class="header-anchor" href="#采取的策略" aria-hidden="true">#</a> 采取的策略</h2><p>作为一个重大变更，这只能在Vue3发布。然而，我认为我们可以做一些事件来使迁移更加容易：</p><ul><li>当检测到v-bind上的<code>.sync</code>修饰符时抛出一个警告，链接到迁移指南。</li><li>使用一个新的迁移助手，我们应该尽可能的检测并且自动覆盖100%的<code>v-bind.sync</code>使用场景。</li></ul><p>这些结合起来，学习以及迁移涉及到<code>.sync</code>的大型代码库应该只会花费几分钟。</p>`,31),o=[c];function l(p,d){return n(),s("div",null,o)}const i=a(t,[["render",l],["__file","0005-replace-v-bind-sync-with-v-model-argument.html.vue"]]);export{i as default};