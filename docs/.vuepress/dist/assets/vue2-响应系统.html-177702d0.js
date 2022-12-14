import{_ as n,p as s,q as a,a1 as e}from"./framework-1443a5b1.js";const p="/imgs/observe影响-1.png",t="/imgs/observe影响-2.png",c={},o=e(`<blockquote><p>响应式原理（数据拦截、依赖收集、派发更新）</p></blockquote><p>三个组成部分：</p><ul><li>Observer（生产方）: 数据拦截</li><li>Dep（消息中心）: 保存生产者以及消费者的引用、依赖收集</li><li>Watcher（消费方）: 派发更新</li></ul><hr><h2 id="涉及到的重要function" tabindex="-1"><a class="header-anchor" href="#涉及到的重要function" aria-hidden="true">#</a> 涉及到的重要function：</h2><ul><li>defineReactive() <code>为每个属性添加数据拦截</code></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code> <span class="token function">defineReactive</span><span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span>
    key<span class="token punctuation">,</span>
    val<span class="token punctuation">,</span>
    customSetter</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token doc-comment comment">/**
     * 用于为子对象添加响应性，并且子对象也进行依赖收集
     *
     * 如果父对象被整体替换，也需要通知子对象的所有订阅方
     */</span>
    <span class="token keyword">let</span> childOb <span class="token operator">=</span> <span class="token function">observe</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
    Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">reactiveGetter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> value <span class="token operator">=</span> getter <span class="token operator">?</span> <span class="token function">getter</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">:</span> val
            <span class="token keyword">if</span> <span class="token punctuation">(</span>Dep<span class="token punctuation">.</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                dep<span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>childOb<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    childOb<span class="token punctuation">.</span>dep<span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// ...</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> value
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">reactiveSetter</span><span class="token punctuation">(</span><span class="token parameter">newVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> value <span class="token operator">=</span> getter <span class="token operator">?</span> <span class="token function">getter</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">:</span> val
            <span class="token comment">/* eslint-disable no-self-compare */</span>
            <span class="token doc-comment comment">/**
             * 值为引用数据类型的属性只要引用没有改变，会直接return掉
             * 此处通知订阅方的方式只适用于：
             *    1.值类型属性更新值
             *    2.引用数据类型（普通对象）被整体替换
             *
             * 但是无法拦截
             *    普通对象：新增属性、删除属性
             *    数组对象：反转、push等对原有引用有影响的api
             * 所以引用数据类型的属性是通过另外一种方式通知订阅者
             */</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>newVal <span class="token operator">===</span> value <span class="token operator">||</span> <span class="token punctuation">(</span>newVal <span class="token operator">!==</span> newVal <span class="token operator">&amp;&amp;</span> value <span class="token operator">!==</span> value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span>
            <span class="token punctuation">}</span>
            childOb <span class="token operator">=</span> <span class="token function">observe</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span>
            <span class="token comment">// ...</span>
            dep<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 产生的影响，如下</span>
<span class="token keyword">let</span> childOb <span class="token operator">=</span> <span class="token function">observe</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+p+'" alt="observe影响-1.png"></p><p><img src="'+t+`" alt="observe影响-2.png"></p><ul><li>observe() <code>递归属性，添加数据拦截</code></li><li>dep.depend() <code>依赖收集：在dep中保存当前watcher、在watcher中保存dep</code></li><li>dep.notify() <code>通知watcher执行expression</code></li></ul><p>每个引用数据类型的响应式属性都对应一个dep</p><blockquote><p>dep与watcher的对应关系</p></blockquote><p>dep : watcher 1对n</p><p>watcher : dep 1对n</p><hr><blockquote><p>数据拦截两种方式对比</p></blockquote><p><strong>Object.defineProperty</strong> ：定义个体的行为</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Object</span>
<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">set</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;&gt;&gt;&gt;&gt;value:&#39;</span> <span class="token operator">+</span> value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// Array 数据拦截较为复杂，vue重写了array的api</span>
<span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">set</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;&gt;&gt;&gt;&gt;value:&#39;</span> <span class="token operator">+</span> value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>es6提供的Proxy</strong>：定义整体的行为</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Object</span>
<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">let</span> proxyObj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">set</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;value:&#39;</span> <span class="token operator">+</span> value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>Object 数据拦截</p></blockquote><p>使用Object.defineProperty做数据拦截</p><blockquote><p>Array 数据拦截</p></blockquote><p>也是使用Object.defineProperty做数据拦截</p><p>但是存在两个问题：深层嵌套无法监听、数组api过多</p><p>vue提供的解决方式：</p><p>1.重新定义了Array提供的api，但同时也保留了原有api</p><p>2.添加了对深层嵌套的处理</p>`,29),i=[o];function l(u,r){return s(),a("div",null,i)}const k=n(c,[["render",l],["__file","vue2-响应系统.html.vue"]]);export{k as default};
