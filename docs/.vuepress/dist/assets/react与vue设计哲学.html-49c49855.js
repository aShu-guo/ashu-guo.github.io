import{_ as s,p as e,q as a,a1 as n}from"./framework-1443a5b1.js";const t={},o=n(`<blockquote><p>react</p></blockquote><p>react全部all in js</p><p>react只是提供了一个纯粹的框架，里面的工具套件需要开发者自己开发，这也意味这react的上手难度高于vue</p><p>vue提供了是一站式解决方案，官方不仅提供了vuex状态管理工具，也提供了路由解析，</p><ol><li>取二次封装组件props的逻辑</li></ol><ul><li>vue对外隐藏了目标组件的props，如果需要对外暴露只能通过$attrs，$listener</li><li>react可以更加便利的传递props</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 把剩余props传递给被二次封装的组件</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>type<span class="token punctuation">,</span> range<span class="token punctuation">,</span> <span class="token operator">...</span>rest<span class="token punctuation">}</span> <span class="token operator">=</span> props
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li></li></ol>`,8),p=[o];function c(l,r){return e(),a("div",null,p)}const u=s(t,[["render",c],["__file","react与vue设计哲学.html.vue"]]);export{u as default};
