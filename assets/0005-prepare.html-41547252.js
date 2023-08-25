import{_ as t,r as c,o as p,c as o,a,d as n,e as l,b as e}from"./app-a46f6870.js";const i={},d=e(`<h1 id="准备篇" tabindex="-1"><a class="header-anchor" href="#准备篇" aria-hidden="true">#</a> 准备篇</h1><h2 id="sync使用" tabindex="-1"><a class="header-anchor" href="#sync使用" aria-hidden="true">#</a> sync使用</h2><p>本质一个props/event模式的语法糖</p><p>假设props变量名为title，那么要求抛出的事件名必须是为<code>update:title</code>格式，事件抛出的值必须是新值。 那么这意味着：<code>sync修饰符</code> 是不支持表达式的。</p><p>假如支持表达式，变量名为<code>name + &#39;1&#39;</code>，抛出事件名为<code>update:name + &#39;1&#39;</code>是不合理的。</p><p>综上，使用sync时，只支持具体的property，这边于<code>v-model</code>类似。</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>text-document</span>
    <span class="token attr-name">:title.sync</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>doc.title<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>text-document</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>等价于</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">&#39;update:title&#39;</span><span class="token punctuation">,</span> newTitle<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>text-document</span>
    <span class="token attr-name">:title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>doc.title<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name"><span class="token namespace">@update:</span>title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>doc.title = $event<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>text-document</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="为什么要在vue中删除sync修饰符-2-0版本" tabindex="-1"><a class="header-anchor" href="#为什么要在vue中删除sync修饰符-2-0版本" aria-hidden="true">#</a> 为什么要在Vue中删除sync修饰符（2.0版本）</h2><p>防止子组件隐式的影响父组件的state</p><h2 id="为什么要在vue中再次引入sync修饰符" tabindex="-1"><a class="header-anchor" href="#为什么要在vue中再次引入sync修饰符" aria-hidden="true">#</a> 为什么要在Vue中再次引入sync修饰符</h2>`,13),u={href:"https://github.com/vuejs/vue/issues/4946",target:"_blank",rel:"nofollow noopener noreferrer"},r=e(`<p>对于管理多个值同步的复杂组件（非输入组件），props/event是合适的解决方案。但是在开发过程中，开发者更多的是将v-model作为sync的受限版本来使用，这偏离了Vue的设计初衷。</p><p>对此，如果能确保父组件的state是通过props/event来改变的（通过封装<code>$emit</code>逻辑到子组件中），那么引入<code>sync</code>修饰符似乎更好点。</p><h2 id="为什么引入之后又要在vue3中使用v-model代替sync" tabindex="-1"><a class="header-anchor" href="#为什么引入之后又要在vue3中使用v-model代替sync" aria-hidden="true">#</a> 为什么引入之后又要在Vue3中使用v-model代替sync？</h2><p>在vue2.x中<code>v-bind.sync</code>造成了困惑，因为用户希望像使用<code>v-bind</code> 一样使用它。虽然在文档中告诉开发者不要有这样的想法，但是这又引入了另外一个问题：既然告诉用户不要像<code>v-bind</code> 那样使用<code>v-bind.sync</code>，又告诉用户用法类似<code>v-model</code>，那么为什么不能成为<code>v-model</code>的一部分呢？</p><p>所以希望通过合并sync修饰符到v-model中来解决上述困惑。（既然两者并没有本质的区别，而且还存在功能上的重叠，为什么不将两者合并暴露出一个API呢？既减少了用户的学习成本，也可以减少打包体积）</p><h1 id="拓展" tabindex="-1"><a class="header-anchor" href="#拓展" aria-hidden="true">#</a> 拓展</h1><h2 id="表单元素与事件" tabindex="-1"><a class="header-anchor" href="#表单元素与事件" aria-hidden="true">#</a> 表单元素与事件</h2><ul><li>text 和 textarea 元素使用 value property 和 input 事件；</li><li>checkbox 和 radio 使用 checked property 和 change 事件；</li><li>select 字段将 value 作为 prop 并将 change 作为事件。</li></ul><h2 id="原生input事件与change事件之间的区别" tabindex="-1"><a class="header-anchor" href="#原生input事件与change事件之间的区别" aria-hidden="true">#</a> 原生input事件与change事件之间的区别</h2><h3 id="input事件" tabindex="-1"><a class="header-anchor" href="#input事件" aria-hidden="true">#</a> input事件</h3><p>当一个 <code>&lt;input&gt;</code>, <code>&lt;select&gt;</code>, 或 <code>&lt;textarea&gt;</code> 元素的 value 被修改时，会触发 input 事件。</p><ul><li>值只要发生改变便会触发input事件</li></ul><h3 id="change事件" tabindex="-1"><a class="header-anchor" href="#change事件" aria-hidden="true">#</a> change事件</h3><p>当用户更改 <code>&lt;input&gt;</code>、<code>&lt;select&gt;</code> 和 <code>&lt;textarea&gt;</code> 元素的值时，会触发change事件，但是并不是每次值改变都会触发<code>change</code>事件</p><ul><li>可输入<code>&lt;input&gt;</code>元素的值发生改变并且失去焦点后，才会触发<code>change</code>事件( 例如：编辑了input的值之后，鼠标点击除input之外的位置，此时input失去焦点)</li><li>可选的<code>&lt;input&gt;</code>、<code>&lt;select&gt;</code>以及<code>&lt;input type=&#39;file&#39;&gt;</code>、<code>&lt;input type=&#39;date&#39;&gt;</code>的值发生改变时，触发<code>change</code>事件</li></ul><p>Vue提供了v-model的lazy修饰符来区分change事件以及input事件</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text<span class="token punctuation">&quot;</span></span> <span class="token attr-name">v-model.lazy</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>onChange<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17);function v(h,k){const s=c("ExternalLinkIcon");return p(),o("div",null,[d,a("p",null,[a("a",u,[n("Feature: multiple v-model bindings"),l(s)]),n("希望v-model支持多个变量，但是v-model最初是为单值输入组件设计的。")]),r])}const m=t(i,[["render",v],["__file","0005-prepare.html.vue"]]);export{m as default};