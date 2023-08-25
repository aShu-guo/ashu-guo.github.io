import{_ as e,o as t,c as a,b as i}from"./app-a46f6870.js";const r={},s=i('<h1 id="api行为记录" tabindex="-1"><a class="header-anchor" href="#api行为记录" aria-hidden="true">#</a> api行为记录</h1><p>记录下在业务开发过程中不常用的api，但是这在库开发中比较常用。</p><h2 id="listener-attrs" tabindex="-1"><a class="header-anchor" href="#listener-attrs" aria-hidden="true">#</a> $listener &amp; $attrs</h2><ul><li><code>$listener</code><ul><li>在vue-2.x版本中，是包含传入当前组件所有非native事件的对象。</li><li>在vue-3.x版本中废弃了。合并到<code>$attrs</code>中了</li></ul></li><li><code>$attrs</code><ul><li>在vue-2.x版本中，包含了父组件传递给当前组件，但是在当前组件没有声明的所有<code>props</code>，不包括<code>listener</code>、<code>class</code>、<code>style</code></li><li>在vue-3.x版本中，包含当前组件没有声明的所有<code>props</code>，而且包括<code>listener</code></li></ul></li></ul><h3 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景</h3><ol><li><p>使用场景，存在这样一个逻辑：爷组件 -&gt; 父组件 -&gt; 子组件。从爷组件传递props到子组件，爷组件监听子组件事件爷组件希望传递props到子组件，爷组件希望监听子组件事件</p></li><li><p>对组件二次封装，不希望传递多个props。这在高等级的组件中很有效。但是这需要足够的文档说明包含哪些<code>props</code>，否则维护起来非常麻烦。</p></li></ol><h2 id="inheritattrs" tabindex="-1"><a class="header-anchor" href="#inheritattrs" aria-hidden="true">#</a> inheritAttrs</h2><p><code>attrs：未定义的props以及html的属性构成的并集</code></p><ul><li><p>true：传入attrs会绑定到template的根节点上；重名则覆盖，class、styles则合并</p></li><li><p>false：传入attrs不会绑定到template的根节点上；重名不会覆盖，class、styles则合并</p></li></ul><p><strong>确定未定义的attrs的行为</strong></p><p><code>但是$attrs可以突破 inheritAttrs:false 的限制，将未定义的attrs通过v-bind绑定在非根元素上 </code></p><h2 id="watch" tabindex="-1"><a class="header-anchor" href="#watch" aria-hidden="true">#</a> watch</h2><p>设置为立即执行时，被设置了<code>v-if</code>和<code>v-show</code>组件中的watch执行顺序不同</p><p>v-if：符合条件后重新挂载，后执行watch中的逻辑</p><p>v-show：符合条件后visible设置为可见，但是watch立执行的逻辑是在挂载父组件时便执行了</p>',15),c=[s];function l(o,d){return t(),a("div",null,c)}const h=e(r,[["render",l],["__file","api.html.vue"]]);export{h as default};