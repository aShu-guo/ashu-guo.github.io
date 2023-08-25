import{_ as e,r as p,o as t,c as o,a as n,d as s,e as l,b as c}from"./app-a46f6870.js";const i="/imgs/problems/keep-alive.png",r="/imgs/problems/list-1.png",u="/imgs/problems/detail-1.png",k="/imgs/problems/list-2.png",d="/imgs/problems/detail-2.png",v={},m=n("h1",{id:"keep-alive组件-基于vue-2-6-10",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#keep-alive组件-基于vue-2-6-10","aria-hidden":"true"},"#"),s(" keep-alive组件(基于vue 2.6.10)")],-1),y=n("h2",{id:"什么是keep-alive组件",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#什么是keep-alive组件","aria-hidden":"true"},"#"),s(" 什么是keep-alive组件？")],-1),g=n("li",null,"include：可以是字符串、正则、字符串数组，用于匹配要缓存组件的name",-1),b=n("li",null,"exclude：值类似include，组件黑名单，如果匹配到了传入的值则不缓存",-1),h={href:"https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)",target:"_blank",rel:"nofollow noopener noreferrer"},_=n("li",null,"被它包裹的组件会被缓存起来，而且缓存的组件会被分配一个key（注意⚠️相同组件实例的key是相同的），在cache中添加一个属性为key，其中值为组件实例的。",-1),f=n("li",null,"存在深层嵌套的layout组件，每个layout组件包含的keep-alive由最后一层确定。",-1),w=c('<p><img src="'+i+`" alt="img.png"></p><h2 id="keep-alive组件在app-vue中使用存在问题" tabindex="-1"><a class="header-anchor" href="#keep-alive组件在app-vue中使用存在问题" aria-hidden="true">#</a> keep-alive组件在app.vue中使用存在问题</h2><p>约定：仅在app.vue中使用keep-alive</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>$route.meta.keepAlive<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>!$route.meta.keepAlive<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// router.js</span>
<span class="token keyword">const</span> Pure <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;RouteView&#39;</span><span class="token punctuation">,</span>
    <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">h</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;router-view&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;home&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">redirect</span><span class="token operator">:</span> <span class="token string">&#39;/fly-task&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">component</span><span class="token operator">:</span> BaseLayout<span class="token punctuation">,</span>
        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/fly-task&#39;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;FlyTask&#39;</span><span class="token punctuation">,</span>
                <span class="token function-variable function">component</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;@/layouts/none-home-layout&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token literal-property property">redirect</span><span class="token operator">:</span> <span class="token string">&#39;/fly-task/normal&#39;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">meta</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;飞行任务管理&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token punctuation">{</span>
                        <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/fly-task/normal&#39;</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;fly-task-normal&#39;</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">redirect</span><span class="token operator">:</span> <span class="token string">&#39;/fly-task/normal/scene&#39;</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">component</span><span class="token operator">:</span> Pure<span class="token punctuation">,</span>
                        <span class="token literal-property property">meta</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;常态任务管理&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token punctuation">{</span>
                                <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/fly-task/normal/scene&#39;</span><span class="token punctuation">,</span>
                                <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;PatrolManageScene&#39;</span><span class="token punctuation">,</span>
                                <span class="token function-variable function">component</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;@/views/fly-task/normal/scene/index.vue&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                                <span class="token literal-property property">meta</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;飞行场景管理&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">keepAlive</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token punctuation">{</span>
                                <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/fly-task/normal/scene-detail&#39;</span><span class="token punctuation">,</span>
                                <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;PlanManageDetail&#39;</span><span class="token punctuation">,</span>
                                <span class="token function-variable function">component</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;@/views/fly-task/normal/scene-detail.vue&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                                <span class="token literal-property property">meta</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;飞行场景详情&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">keepAlive</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于<code>飞行场景管理</code>路由与<code>飞行场景详情</code>使用的是同一个layout，那么存在以下问题：</p><ul><li>两者的keepAlive都是true：在<code>飞行场景管理</code>切换到页码之后，点进<code>飞行场景详情</code>页面，再点击返回按钮到<code>飞行场景管理</code> 页面。会发现页面的列表并没有被缓存</li><li><code>飞行场景管理</code>的keepAlive为true，<code>飞行场景详情</code>的keepAlive为false：在进行上述操作之后，页面的列表符合预期被缓存了。</li></ul><p>那么为什么会存在上述问题？</p><p>由于是在App.vue中使用的keep-alive来控制组件的缓存与否，那么意味着最终缓存的组件其实是BaseLayout组件，而组件实例通过data对象（非options中的data） 中的keepAlive属性判断是否被缓存。当从要缓存的子组件A切换到要缓存的子组件B时，会将已经缓存的组件A替换成B，即会出现第一种问题。这也能解释为什么会出现第二种情况， 因为无需缓存的组件C没有替换掉需要缓存的组件A，而是新建了一个BaseLayout组件。</p><h2 id="验证" tabindex="-1"><a class="header-anchor" href="#验证" aria-hidden="true">#</a> 验证</h2><p>BaseLayout的actived钩子函数中添加如下代码：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function">activated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$vnode<span class="token punctuation">.</span>parent<span class="token punctuation">.</span>componentInstance<span class="token punctuation">)</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span>cache<span class="token punctuation">,</span> keys<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$vnode<span class="token punctuation">.</span>parent<span class="token punctuation">.</span>componentInstance
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;activated cache: &#39;</span><span class="token punctuation">,</span> cache<span class="token punctuation">)</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;activated keys: &#39;</span><span class="token punctuation">,</span> keys<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="两者的keepalive都是true" tabindex="-1"><a class="header-anchor" href="#两者的keepalive都是true" aria-hidden="true">#</a> 两者的keepAlive都是true</h3><ol><li>首次进入列表页时</li></ol><p><img src="`+r+'" alt="img_1.png"></p><ol start="2"><li>点击<code>查看</code>进入详情页</li></ol><p><img src="'+u+'" alt="img_2.png"></p><p>可以发现即使添加了keepAlive为true，但是页面也已经被替换掉。</p><h3 id="飞行场景管理的keepalive为true-飞行场景详情的keepalive为false" tabindex="-1"><a class="header-anchor" href="#飞行场景管理的keepalive为true-飞行场景详情的keepalive为false" aria-hidden="true">#</a> <code>飞行场景管理</code>的keepAlive为true，<code>飞行场景详情</code>的keepAlive为false</h3><ol><li>首次进入列表页时</li></ol><p><img src="'+k+'" alt="img_3.png"></p><ol start="2"><li>点击<code>查看</code>进入详情页</li></ol><p><img src="'+d+'" alt="img_4.png"></p><p>可以发现新生成了一个BaseLayout组件，并没有替换掉原来的组件。</p>',24);function x(A,B){const a=p("ExternalLinkIcon");return t(),o("div",null,[m,y,n("ul",null,[n("li",null,[s("提供了3个props "),n("ul",null,[g,b,n("li",null,[s("max：指定可以缓存的组件数量，超出数 量后通过"),n("a",h,[s("LRU策略"),l(a)]),s(" 删除。")])])]),_,f]),w])}const j=e(v,[["render",x],["__file","keep-alive.html.vue"]]);export{j as default};