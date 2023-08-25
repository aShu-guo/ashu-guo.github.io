import{_ as n,o as s,c as a,b as p}from"./app-a46f6870.js";const t="/imgs/vue-debugger/reactive-flow.png",e="/imgs/vue-debugger/math-flow.png",o="/imgs/vue-debugger/reactive-defineproperty.png",c="/imgs/vue-debugger/reactive-proxy.png",l={},i=p(`<h1 id="响应式原理" tabindex="-1"><a class="header-anchor" href="#响应式原理" aria-hidden="true">#</a> 响应式原理</h1><p>Vue的响应式原理由三部分组成，分别是：</p><ul><li>Observer（生产方）: 数据拦截，添加响应性</li><li>Dep（消息中心）: 消息发布方</li><li>Watcher（消费方）: 消息订阅方</li></ul><h2 id="observer" tabindex="-1"><a class="header-anchor" href="#observer" aria-hidden="true">#</a> Observer</h2><p>只有没有添加过响应性才会实例化Observer。Observer的作用是为data中的属性添加响应性</p><div class="language-flow line-numbers-mode" data-ext="flow"><pre class="language-flow"><code><span class="token doc-comment comment">/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object&#39;s property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token type class-name">any</span><span class="token punctuation">;</span>
    <span class="token literal-property property">dep</span><span class="token operator">:</span> Dep<span class="token punctuation">;</span> <span class="token comment">// 每一个Data的属性都会绑定一个dep，用于存放watcher arr</span>
    <span class="token literal-property property">vmCount</span><span class="token operator">:</span> <span class="token type class-name">number</span><span class="token punctuation">;</span> <span class="token comment">// number of vms that has this object as root $data</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token type class-name">any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value
        <span class="token keyword">this</span><span class="token punctuation">.</span>dep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dep</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>vmCount <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token function">def</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token string">&#39;__ob__&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token comment">// 为value添加__ob__属性，值为当前Observer实例</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">/*
            区分数组，数组的处理方式是代理数组能修改自身的方法，如：splice、push、pop等
            */</span>
            <span class="token keyword">const</span> augment <span class="token operator">=</span> hasProto
                <span class="token operator">?</span> protoAugment  <span class="token comment">/*直接覆盖原型的方法来修改目标对象*/</span>
                <span class="token operator">:</span> copyAugment   <span class="token comment">/*定义（覆盖）目标对象或数组的某一个方法*/</span>
            <span class="token function">augment</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> arrayMethods<span class="token punctuation">,</span> arrayKeys<span class="token punctuation">)</span>
            <span class="token comment">/*如果是数组则需要遍历数组的每一个成员进行observe*/</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">observeArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">/*如果是对象则直接walk进行绑定*/</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">walk</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Walk through each property and convert them into
     * getter/setters. This method should only be called when
     * value type is Object.
     */</span>
    <span class="token function">walk</span><span class="token punctuation">(</span>obj<span class="token operator">:</span> Object<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> keys <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
        <span class="token comment">/*
        遍历对象的每一个key，并调用defineReactive代理getter和setter
        */</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> keys<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">defineReactive</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> keys<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> obj<span class="token punctuation">[</span>keys<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Observe a list of Array items.
     */</span>
    <span class="token function">observeArray</span><span class="token punctuation">(</span>items<span class="token operator">:</span> Array<span class="token operator">&lt;</span><span class="token type class-name">any</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">/*
        数组需要遍历每一个成员进行observe
        */</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> items<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">observe</span><span class="token punctuation">(</span>items<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dep" tabindex="-1"><a class="header-anchor" href="#dep" aria-hidden="true">#</a> Dep</h2><p>每个属性都会包含一个闭包dep，但是每个引用数据类型又都对应一个dep。所以属性与dep的对应关系是：</p><ul><li>引用类型：2个dep</li><li>基本类型：一个闭包dep</li></ul><p>dep的作用是消息生产者，也是消息发布方。</p><div class="language-flow line-numbers-mode" data-ext="flow"><pre class="language-flow"><code><span class="token doc-comment comment">/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Dep</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token operator">?</span>Watcher<span class="token punctuation">;</span> <span class="token comment">// 全局的watcher，同一时间只会存在一个watcher</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token type class-name">number</span><span class="token punctuation">;</span> <span class="token comment">// dep的唯一标识，用于去重</span>
    <span class="token literal-property property">subs</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>Watcher<span class="token operator">&gt;</span><span class="token punctuation">;</span> <span class="token comment">// 存放dep对应的watcher</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> uid<span class="token operator">++</span>
        <span class="token comment">// subs: Array&lt;Watcher&gt;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>subs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*添加一个订阅方*/</span>
    <span class="token function">addSub</span><span class="token punctuation">(</span>sub<span class="token operator">:</span> Watcher<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>subs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>sub<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*移除一个订阅方*/</span>
    <span class="token function">removeSub</span><span class="token punctuation">(</span>sub<span class="token operator">:</span> Watcher<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">remove</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>subs<span class="token punctuation">,</span> sub<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>Dep<span class="token punctuation">.</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// Dep.target指向的是一个watcher，</span>
            <span class="token comment">// 全局中存在watcher时，会调用watcher的addDep添加dep</span>
            <span class="token comment">// dep与watcher两者的关系，两者互相依赖：dep -&gt; watcher  watcher -&gt; dep</span>
            Dep<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">addDep</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*通知所有订阅方*/</span>
    <span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// stabilize the subscriber list first</span>
        <span class="token keyword">const</span> subs <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>subs<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> subs<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 调用每一个watcher的update</span>
            subs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// the current target watcher being evaluated.</span>
<span class="token comment">// this is globally unique because there could be only one</span>
<span class="token comment">// watcher being evaluated at any time.</span>
<span class="token comment">// 全局watcher用完即丢</span>
Dep<span class="token punctuation">.</span>target <span class="token operator">=</span> <span class="token type class-name">null</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="watcher" tabindex="-1"><a class="header-anchor" href="#watcher" aria-hidden="true">#</a> Watcher</h2><p>watcher是消息订阅方，在vue中watcher分为3中：render watcher、computed watcher、user watcher</p><div class="language-flow line-numbers-mode" data-ext="flow"><pre class="language-flow"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Watcher</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">vm</span><span class="token operator">:</span> Component<span class="token punctuation">;</span>
    <span class="token literal-property property">expression</span><span class="token operator">:</span> <span class="token type class-name">string</span><span class="token punctuation">;</span> <span class="token comment">// 每一个DOM attr对应的string</span>
    <span class="token literal-property property">cb</span><span class="token operator">:</span> <span class="token type class-name">Function</span><span class="token punctuation">;</span> <span class="token comment">// update的时候的回调函数，对应option中watch的handler</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token type class-name">number</span><span class="token punctuation">;</span>
    <span class="token literal-property property">deep</span><span class="token operator">:</span> <span class="token type class-name">boolean</span><span class="token punctuation">;</span><span class="token comment">// 是否深度监听，对应对应option中watch的deep</span>
    <span class="token literal-property property">user</span><span class="token operator">:</span> <span class="token type class-name">boolean</span><span class="token punctuation">;</span><span class="token comment">// 标识为用户自定义watcher</span>
    <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token type class-name">boolean</span><span class="token punctuation">;</span><span class="token comment">// 是否</span>
    <span class="token literal-property property">sync</span><span class="token operator">:</span> <span class="token type class-name">boolean</span><span class="token punctuation">;</span><span class="token comment">// 是否为同步执行的</span>
    <span class="token literal-property property">dirty</span><span class="token operator">:</span> <span class="token type class-name">boolean</span><span class="token punctuation">;</span><span class="token comment">// 是否为脏数据，脏检查位</span>
    <span class="token literal-property property">active</span><span class="token operator">:</span> <span class="token type class-name">boolean</span><span class="token punctuation">;</span>
    <span class="token literal-property property">deps</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>Dep<span class="token operator">&gt;</span><span class="token punctuation">;</span> <span class="token comment">// watcher对应的依赖新deps</span>
    <span class="token literal-property property">newDeps</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>Dep<span class="token operator">&gt;</span><span class="token punctuation">;</span><span class="token comment">// 旧deps</span>
    <span class="token literal-property property">depIds</span><span class="token operator">:</span> ISet<span class="token punctuation">;</span><span class="token comment">// 去重后的旧dep实例的id</span>
    <span class="token literal-property property">newDepIds</span><span class="token operator">:</span> ISet<span class="token punctuation">;</span><span class="token comment">// 去重后的新dep实例的id</span>
    <span class="token literal-property property">getter</span><span class="token operator">:</span> <span class="token type class-name">Function</span><span class="token punctuation">;</span><span class="token comment">// watcher对应函数，执行的结果为this.value</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token type class-name">any</span><span class="token punctuation">;</span><span class="token comment">// getter返回值</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span>
        <span class="token literal-property property">vm</span><span class="token operator">:</span> Component<span class="token punctuation">,</span>
        <span class="token literal-property property">expOrFn</span><span class="token operator">:</span> <span class="token type class-name">string</span> <span class="token operator">|</span> <span class="token type class-name">Function</span><span class="token punctuation">,</span>
        <span class="token literal-property property">cb</span><span class="token operator">:</span> <span class="token type class-name">Function</span><span class="token punctuation">,</span>
        options<span class="token operator">?</span><span class="token operator">:</span> Object
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>vm <span class="token operator">=</span> vm
        <span class="token comment">/*组件属性中_watchers存放所有订阅者实例*/</span>
        vm<span class="token punctuation">.</span>_watchers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>deep <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>deep
            <span class="token keyword">this</span><span class="token punctuation">.</span>user <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>user
            <span class="token keyword">this</span><span class="token punctuation">.</span>lazy <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>lazy
            <span class="token keyword">this</span><span class="token punctuation">.</span>sync <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>sync
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>deep <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>user <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lazy <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>sync <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>cb <span class="token operator">=</span> cb
        <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token operator">++</span>uid <span class="token comment">// uid for batching</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>active <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>dirty <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lazy <span class="token comment">// for lazy watchers</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>deps <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>newDeps <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>depIds <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>newDepIds <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>expression <span class="token operator">=</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span>
            <span class="token operator">?</span> expOrFn<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
<span class="token comment">// parse expression for getter</span>
        <span class="token comment">/* 把表达式expOrFn解析成getter */</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> expOrFn <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>getter <span class="token operator">=</span> expOrFn
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>getter <span class="token operator">=</span> <span class="token function">parsePath</span><span class="token punctuation">(</span>expOrFn<span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>getter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">getter</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token punctuation">}</span>
                process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">warn</span><span class="token punctuation">(</span>
                    <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Failed watching path: &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>expOrFn<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot; </span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span>
                    <span class="token string">&#39;Watcher only accepts simple dot-delimited paths. &#39;</span> <span class="token operator">+</span>
                    <span class="token string">&#39;For full control, use a function instead.&#39;</span><span class="token punctuation">,</span>
                    vm
                <span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lazy <span class="token operator">?</span> <span class="token keyword">undefined</span> <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Evaluate the getter, and re-collect dependencies.
     */</span>
    <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 将Dep.target指向自身</span>
        <span class="token function">pushTarget</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
        <span class="token keyword">let</span> value
        <span class="token keyword">const</span> vm <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>vm
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 用户自定义的watcher需要try...catch</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getter</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">handleError</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> vm<span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">getter for watcher &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>expression<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// 内置的watcher可信，无需try...catch</span>
            value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getter</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>deep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">traverse</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 删除Dep.target</span>
        <span class="token function">popTarget</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">// 清除当前watcher的部分dep，以及移除dep中watcher。相当于移除弃用的watcher和dep的关系</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">cleanupDeps</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> value
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Add a dependency to this directive.
     */</span>
    <span class="token comment">// 保存dep到deps中</span>
    <span class="token function">addDep</span><span class="token punctuation">(</span>dep<span class="token operator">:</span> Dep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> id <span class="token operator">=</span> dep<span class="token punctuation">.</span>id
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>newDepIds<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 防止newDepIds有重复的dep实例id</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>newDepIds<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>newDeps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>depIds<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 订阅dep</span>
                dep<span class="token punctuation">.</span><span class="token function">addSub</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Clean up for dependency collection.
     */</span>
    <span class="token function">cleanupDeps</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">/*移除所有观察者对象*/</span>
        <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>deps<span class="token punctuation">.</span>length
        <span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> dep <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>deps<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>newDepIds<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>dep<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 如果当前watcher中的依赖中不包含了dep，那么dep移除当前watcher实例</span>
                dep<span class="token punctuation">.</span><span class="token function">removeSub</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 交换了depIds和newDepIds</span>
        <span class="token keyword">let</span> tmp <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>depIds
        <span class="token keyword">this</span><span class="token punctuation">.</span>depIds <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>newDepIds
        <span class="token keyword">this</span><span class="token punctuation">.</span>newDepIds <span class="token operator">=</span> tmp
        <span class="token comment">// 清除newDepIds</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>newDepIds<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment">// 交换deps和newDeps</span>
        tmp <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>deps
        <span class="token keyword">this</span><span class="token punctuation">.</span>deps <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>newDeps
        <span class="token keyword">this</span><span class="token punctuation">.</span>newDeps <span class="token operator">=</span> tmp
        <span class="token comment">// 清空newDeps</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>newDeps<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Subscriber interface.
     * Will be called when a dependency changes.
     */</span>
    <span class="token comment">// 依赖改变时，会调用notify通知watcher执行update方法</span>
    <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">/* istanbul ignore else */</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>lazy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>dirty <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>sync<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// 将watcher放到队列中</span>
            <span class="token function">queueWatcher</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Scheduler job interface.
     * Will be called by the scheduler.
     */</span>
    <span class="token comment">// 放入队列的watcher会去执行run方法</span>
    <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>active<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>
                value <span class="token operator">!==</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">||</span>
                <span class="token comment">// Deep watchers and watchers on Object/Arrays should fire even</span>
                <span class="token comment">// when the value is the same, because the value may</span>
                <span class="token comment">// have mutated.</span>
                <span class="token comment">/*
                    即便值相同，拥有Deep属性的观察者以及在对象／数组上的观察者应该被触发更新，因为它们的值可能发生改变。
                */</span>
                <span class="token function">isObject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">||</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>deep
            <span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// set new value</span>
                <span class="token keyword">const</span> oldValue <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value
                <span class="token comment">/*设置新的值*/</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value

                <span class="token comment">/*触发回调渲染视图*/</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">try</span> <span class="token punctuation">{</span>
                        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">cb</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>vm<span class="token punctuation">,</span> value<span class="token punctuation">,</span> oldValue<span class="token punctuation">)</span>
                    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token function">handleError</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>vm<span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">callback for watcher &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>expression<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">cb</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>vm<span class="token punctuation">,</span> value<span class="token punctuation">,</span> oldValue<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Evaluate the value of the watcher.
     * This only gets called for lazy watchers.
     */</span>

    <span class="token comment">/*获取观察者的值*/</span>
    <span class="token function">evaluate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>dirty <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Depend on all deps collected by this watcher.
     */</span>

    <span class="token comment">/*收集该watcher的所有deps依赖*/</span>
    <span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>deps<span class="token punctuation">.</span>length
        <span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>deps<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Remove self from all dependencies&#39; subscriber list.
     */</span>

    <span class="token comment">/*将自身从所有依赖收集订阅列表删除*/</span>
    <span class="token function">teardown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>active<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// remove self from vm&#39;s watcher list</span>
            <span class="token comment">// this is a somewhat expensive operation so we skip it</span>
            <span class="token comment">// if the vm is being destroyed.</span>
            <span class="token comment">/*从vm实例的观察者列表中将自身移除，由于该操作比较耗费资源，所以如果vm实例正在被销毁则跳过该步骤。*/</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>vm<span class="token punctuation">.</span>_isBeingDestroyed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">remove</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>vm<span class="token punctuation">.</span>_watchers<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>deps<span class="token punctuation">.</span>length
            <span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>deps<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">removeSub</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>active <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="render-watcher" tabindex="-1"><a class="header-anchor" href="#render-watcher" aria-hidden="true">#</a> render watcher</h3><p>在执行渲染watcher之前，vue首先将template编译成render函数，并且在执行<code>vm.$mount</code>时实例化渲染watcher，其中构造参数为：</p><div class="language-flow line-numbers-mode" data-ext="flow"><pre class="language-flow"><code><span class="token keyword">new</span> <span class="token class-name">Watcher</span><span class="token punctuation">(</span>
    vm<span class="token punctuation">,</span>
    <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        vm<span class="token punctuation">.</span><span class="token function">_update</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span><span class="token function">_render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    noop<span class="token punctuation">,</span>
    watcherOptions<span class="token punctuation">,</span>
    <span class="token boolean">true</span> <span class="token comment">/* isRenderWatcher */</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行get函数时，会所有在template中使用的依赖都会添加订阅方：渲染watcher。</p><h3 id="computed-watcher" tabindex="-1"><a class="header-anchor" href="#computed-watcher" aria-hidden="true">#</a> computed watcher</h3><p>计算属性watcher，在initState时为每个computed属性实例化watcher。</p><p>initComputed执行时机需要晚于initData，原因是：</p><p>computed中的依赖必然都是来自data，而只有在为data中的属性添加完响应性时，computed和data之间的桥梁才可以建立</p><div class="language-flow line-numbers-mode" data-ext="flow"><pre class="language-flow"><code><span class="token keyword">function</span> <span class="token function">initComputed</span><span class="token punctuation">(</span>vm<span class="token operator">:</span> Component<span class="token punctuation">,</span> <span class="token literal-property property">computed</span><span class="token operator">:</span> Object<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// $flow-disable-line</span>
    <span class="token comment">// 创建一个完全pure的对象</span>
    <span class="token keyword">const</span> watchers <span class="token operator">=</span> <span class="token punctuation">(</span>vm<span class="token punctuation">.</span>_computedWatchers <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token type class-name">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment">// computed properties are just getters during SSR</span>
    <span class="token keyword">const</span> isSSR <span class="token operator">=</span> <span class="token function">isServerRendering</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> computed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> userDef <span class="token operator">=</span> computed<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
        <span class="token keyword">const</span> getter <span class="token operator">=</span> <span class="token function">isFunction</span><span class="token punctuation">(</span>userDef<span class="token punctuation">)</span> <span class="token operator">?</span> userDef <span class="token operator">:</span> userDef<span class="token punctuation">.</span>get
        <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__ <span class="token operator">&amp;&amp;</span> getter <span class="token operator">==</span> <span class="token type class-name">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">warn</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Getter is missing for computed property &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isSSR<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 创建了内置的computed watcher，相应的也完成了发布和订阅</span>
            watchers<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Watcher</span><span class="token punctuation">(</span>
                vm<span class="token punctuation">,</span>
                getter <span class="token operator">||</span> noop<span class="token punctuation">,</span>
                noop<span class="token punctuation">,</span>
                computedWatcherOptions
            <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="user-watcher" tabindex="-1"><a class="header-anchor" href="#user-watcher" aria-hidden="true">#</a> user watcher</h3><p>用户自定义的watcher主要有两个来源：</p><ul><li>定义在options中watch</li><li>this.$watch监听</li></ul><p>但是它们最终都是去调用<code>$watch</code>去实例化一个watcher实例，并且返回一个unwatch函数，再不需要时调用。</p><div class="language-flow line-numbers-mode" data-ext="flow"><pre class="language-flow"><code> <span class="token comment">// expOrFn 对应watch的key，cb对应handler</span>
<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$watch</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>
    <span class="token literal-property property">expOrFn</span><span class="token operator">:</span> <span class="token type class-name">string</span> <span class="token operator">|</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token type class-name">any</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">cb</span><span class="token operator">:</span> <span class="token type class-name">any</span><span class="token punctuation">,</span>
    options<span class="token operator">?</span><span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token type class-name">string</span><span class="token punctuation">,</span> <span class="token type class-name">any</span><span class="token operator">&gt;</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token type class-name">Function</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token literal-property property">vm</span><span class="token operator">:</span> Component <span class="token operator">=</span> <span class="token keyword">this</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isPlainObject</span><span class="token punctuation">(</span>cb<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">createWatcher</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> expOrFn<span class="token punctuation">,</span> cb<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    options <span class="token operator">=</span> options <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    options<span class="token punctuation">.</span>user <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token keyword">const</span> watcher <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Watcher</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> expOrFn<span class="token punctuation">,</span> cb<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>immediate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> info <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">callback for immediate watcher &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>watcher<span class="token punctuation">.</span>expression<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span><span class="token template-punctuation string">\`</span></span>
        <span class="token function">pushTarget</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">invokeWithErrorHandling</span><span class="token punctuation">(</span>cb<span class="token punctuation">,</span> vm<span class="token punctuation">,</span> <span class="token punctuation">[</span>watcher<span class="token punctuation">.</span>value<span class="token punctuation">]</span><span class="token punctuation">,</span> vm<span class="token punctuation">,</span> info<span class="token punctuation">)</span>
        <span class="token function">popTarget</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">unwatchFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        watcher<span class="token punctuation">.</span><span class="token function">teardown</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="简化流程" tabindex="-1"><a class="header-anchor" href="#简化流程" aria-hidden="true">#</a> 简化流程</h2><div class="language-flow line-numbers-mode" data-ext="flow"><pre class="language-flow"><code><span class="token comment">// 从initData中进入该方法，value对应options中的data返回值</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">observe</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token type class-name">any</span><span class="token punctuation">,</span> <span class="token literal-property property">asRootData</span><span class="token operator">:</span> <span class="token operator">?</span><span class="token type class-name">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> Observer <span class="token operator">|</span> <span class="token type class-name">void</span> <span class="token punctuation">{</span>
    <span class="token comment">// 只为对象添加响应性，不是对象则中止流程</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isObject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> <span class="token literal-property property">ob</span><span class="token operator">:</span> Observer <span class="token operator">|</span> <span class="token type class-name">void</span>

    <span class="token comment">//  __ob__标识value是否已经被添加了响应性</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token string">&#39;__ob__&#39;</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> value<span class="token punctuation">.</span>__ob__ <span class="token keyword">instanceof</span> <span class="token class-name">Observer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ob <span class="token operator">=</span> value<span class="token punctuation">.</span>__ob__
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>
        <span class="token comment">// 确保value类型为纯对象</span>
        observerState<span class="token punctuation">.</span>shouldConvert <span class="token operator">&amp;&amp;</span>
        <span class="token operator">!</span><span class="token function">isServerRendering</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
        <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">isPlainObject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
        Object<span class="token punctuation">.</span><span class="token function">isExtensible</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
        <span class="token operator">!</span>value<span class="token punctuation">.</span>_isVue
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建一个Observer实例，进入Observer的构造方法中</span>
        ob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Observer</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>asRootData <span class="token operator">&amp;&amp;</span> ob<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ob<span class="token punctuation">.</span>vmCount<span class="token operator">++</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> ob
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实例化Observer之后，会去执行walk方法，而它最终调用的是<code>defineReactive</code>：</p><div class="language-flow line-numbers-mode" data-ext="flow"><pre class="language-flow"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">defineReactive</span><span class="token punctuation">(</span>
    <span class="token literal-property property">obj</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
    <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token type class-name">string</span><span class="token punctuation">,</span>
    <span class="token literal-property property">val</span><span class="token operator">:</span> <span class="token type class-name">any</span><span class="token punctuation">,</span>
    customSetter<span class="token operator">?</span><span class="token operator">:</span> <span class="token type class-name">Function</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 定义一个闭包dep对象</span>
    <span class="token keyword">const</span> dep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dep</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> property <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>property <span class="token operator">&amp;&amp;</span> property<span class="token punctuation">.</span>configurable <span class="token operator">===</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 获取自定义的getter和setter</span>
    <span class="token comment">// cater for pre-defined getter/setters</span>
    <span class="token keyword">const</span> getter <span class="token operator">=</span> property <span class="token operator">&amp;&amp;</span> property<span class="token punctuation">.</span>get
    <span class="token keyword">const</span> setter <span class="token operator">=</span> property <span class="token operator">&amp;&amp;</span> property<span class="token punctuation">.</span>set

    <span class="token comment">// 为value添加响应性，如果value为普通对象，则childOb为Observer实例；反之则为undefined</span>
    <span class="token keyword">let</span> childOb <span class="token operator">=</span> <span class="token function">observe</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
    Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">get</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">reactiveGetter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> value <span class="token operator">=</span> getter <span class="token operator">?</span> <span class="token function">getter</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">:</span> val
            <span class="token comment">// get时判断当前全局中是否存在watcher</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>Dep<span class="token punctuation">.</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 存在watcher则：为dep添加订阅方，为watcher添加发布方</span>
                dep<span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>childOb<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">/*子对象进行依赖收集，其实就是将同一个watcher观察者实例放进了两个depend中，一个是正在本身闭包中的depend，另一个是子元素的depend*/</span>
                    childOb<span class="token punctuation">.</span>dep<span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">dependArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> value
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">set</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">reactiveSetter</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> value <span class="token operator">=</span> getter <span class="token operator">?</span> <span class="token function">getter</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">:</span> val
            <span class="token comment">// 如果新值和旧值相同则不重新渲染，这只对基本数据类型有效</span>
            <span class="token comment">/* eslint-disable no-self-compare */</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>newVal <span class="token operator">===</span> value <span class="token operator">||</span> <span class="token punctuation">(</span>newVal <span class="token operator">!==</span> newVal <span class="token operator">&amp;&amp;</span> value <span class="token operator">!==</span> value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span>
            <span class="token punctuation">}</span>
            <span class="token comment">/* eslint-enable no-self-compare */</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> customSetter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">customSetter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>setter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">setter</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> newVal<span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                val <span class="token operator">=</span> newVal
            <span class="token punctuation">}</span>
            <span class="token comment">// 对新值添加响应性</span>
            childOb <span class="token operator">=</span> <span class="token function">observe</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span>
            <span class="token comment">// 通知订阅方重新渲染</span>
            dep<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+t+'" alt="img.png"></p><p>综上，为了便于理解，我们可以将watcher看成数学概念中的：<code>f(x1, x2, x3, ...)</code>，其中dep为<code>x1</code>，<code>x2</code>，<code>x3</code>...</p><p><img src="'+e+`" alt="img.png"></p><p><code>f(x1, x2, x3, ...)</code>的值依赖<code>x1, x2, x3, ...</code> ，所以当依赖发生改变时，需要通知（也就是调用notify通知watcher执行get函数）<code>f(x1, x2, x3, ...)</code> 重新执行获取最新的值。</p><p>但是会有多个依赖存在相同watcher的情况，所以放到队列中时需要去重防止重复执行</p><h2 id="数据拦截两种方式对比" tabindex="-1"><a class="header-anchor" href="#数据拦截两种方式对比" aria-hidden="true">#</a> 数据拦截两种方式对比</h2><h3 id="object-defineproperty" tabindex="-1"><a class="header-anchor" href="#object-defineproperty" aria-hidden="true">#</a> Object.defineProperty</h3><p>定义个体的行为</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Object</span>
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+o+`" alt="img.png"></p><h3 id="es6提供的proxy" tabindex="-1"><a class="header-anchor" href="#es6提供的proxy" aria-hidden="true">#</a> es6提供的Proxy</h3><p>定义整体的行为</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Object</span>
<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">let</span> proxyObj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">set</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;value:&#39;</span> <span class="token operator">+</span> value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+c+'" alt="img.png"></p>',46),u=[i];function r(k,d){return s(),a("div",null,u)}const m=n(l,[["render",r],["__file","reactive-module.html.vue"]]);export{m as default};
