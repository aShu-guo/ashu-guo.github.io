import{_ as n,p as s,q as a,a1 as e}from"./framework-1443a5b1.js";const t={},l=e(`<blockquote><p>vue3 指南 next</p></blockquote><ol><li>响应式基础</li></ol><ul><li><p>基本数据类型：ref</p><ul><li>修改变量时需要使用.value （注意：还可以通过ref为引用数据类型添加响应式）</li><li>在template中可以直接引用</li></ul></li><li><p>引用数据类型：reactive</p><ul><li>声明是建议通过const，可以直接修改变量，不能直接修改变量的引用(这也是建议使用const声明的原因)</li><li>在template中可以直接引用</li><li>如果没有使用setup语法糖，如果希望在template中不使用obj.name，可以通过toRefs()解包，得到对象中的响应式属性；即使不这样做，obj.name也是响应式的</li></ul></li><li><p>联动reactive对象与ref对象：toRef</p><ul><li>基于reactive对象中某一个属性新建一个ref对象，两者响应性</li></ul></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> student <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">23</span><span class="token punctuation">,</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;xiaoming&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 此时student.name的改动也会同步到name上</span>
<span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token function">toRef</span><span class="token punctuation">(</span>student<span class="token punctuation">,</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> student2 <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">23</span><span class="token punctuation">,</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;xiaohuang&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 并不会同步到name2上，仅仅是拿个一个值</span>
<span class="token keyword">const</span> name2 <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span>student2<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>解构reactive对象并且不会丢失响应性：toRefs</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> student <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">23</span><span class="token punctuation">,</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;xiaoming&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// refs中每个属性都是ref对象</span>
<span class="token keyword">const</span> refs <span class="token operator">=</span> <span class="token function">toRefs</span><span class="token punctuation">(</span>student<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>浅响应性：shallowRef、shallowReactive <ul><li>只对顶层添加响应性，减少响应性能损耗</li><li>触发响应性是需要替换整个根状态（修改整个对象的引用）</li></ul></li></ul><ol start="2"><li>组件传值</li></ol><ul><li>父子组件传值 <ul><li>父组件通过传值到子组件，子组件通过props接下，再emit出来，父组件监听变化</li><li>也可以通过provide inject传值，但是vue2中的provide的属性是不具备响应性的；vue3中是具有响应性的，所以建议只在provide处修改值，可以通过readonly强制约束子组件不可修改 provide(&#39;location&#39;, readonly(location))</li></ul></li></ul><blockquote><p>术语</p></blockquote><ul><li>解包：ref解包，取值时不用.value调用 <ul><li>自动解包的情况 <ul><li>在template中调用</li><li>赋值给reactive对象中的一个属性</li></ul></li><li>不会自动解包的情况 <ul><li>作为map或者array中的一个元素时</li></ul></li></ul></li></ul><blockquote><p>watchEffect、watch、computed区别</p></blockquote><p>watchEffect:立刻执行一个副作用函数，并响应式的追踪函数体中的依赖 watch:默认懒执行，追踪一个或多个响应式变量，可以知道变量的新值和旧值 computed:追踪函数体中的依赖，可以自定义getter和setter</p><blockquote><p>Q&amp;A</p></blockquote><ul><li>reactive对象解包后失效的原因 <ul><li>解包后是局部变量，无法触发reactive对象中属性的get和set方法</li></ul></li></ul>`,15),p=[l];function i(o,c){return s(),a("div",null,p)}const u=n(t,[["render",i],["__file","操作手册.html.vue"]]);export{u as default};
