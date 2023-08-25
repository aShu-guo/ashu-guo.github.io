import{_ as e,r as o,o as c,c as l,a as n,d as a,e as t,b as p}from"./app-a46f6870.js";const i={},u=p(`<h1 id="语法" tabindex="-1"><a class="header-anchor" href="#语法" aria-hidden="true">#</a> 语法</h1><p>这里不再一一列举语法的具体使用方式，具体使用方法可参考钉钉开发文档，本文主要列举对应开发过程中遇到的一些坑以及解决方案</p><h2 id="页面与组件" tabindex="-1"><a class="header-anchor" href="#页面与组件" aria-hidden="true">#</a> 页面与组件</h2><h3 id="页面" tabindex="-1"><a class="header-anchor" href="#页面" aria-hidden="true">#</a> 页面</h3><p>约定：页面全部存放在pages目录下，并且有一个名为index的页面</p><p>小程序页面提供了4个页面相关的文件：<code>index.js</code> <code>index.acss</code> <code>index.axml</code> <code>index.json</code></p><p>其中<code>index.js</code>和<code>index.axml</code>是必要的，此外小程序还提供了另外一种js文件格式：<code>sjs</code>这点会在后续博客中说明。<code>index.json</code></p><p>可用于配置页面导航栏、背景色等（这点钉钉小程序开发文档中说明较少，具体参考支付宝小程序开发文档，虽然部分支付宝小程序中的页面配置属性可以在钉钉小程序中使用，但是还是需要关注基础库版本）</p><p>在data中声明变量（注意是类型是对象，而不是函数），在根下声明方法</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">Page</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">student</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">23</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;hello &#39;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>data<span class="token punctuation">.</span>student<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="组件" tabindex="-1"><a class="header-anchor" href="#组件" aria-hidden="true">#</a> 组件</h3><p>约定：页面全部存放在components目录下，并且有一个名为student-card的组件</p><p>同样提供了3个相关的文件：<code>index.js</code> <code>index.acss</code> <code>index.axml</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">visible</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">item</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token function-variable function">onTap</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token function">onConfirm</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span><span class="token function">onTap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">WARNING</p><ul><li>组件的方法声明在methods中，页面的方法声明在根下</li><li>处理事件的方法必须以<code>on</code>开头 <ul><li>事件默认处理冒泡事件，<code>on</code>开头的事件则正常处理，<code>catch</code>开头的事件则阻止冒泡</li></ul></li></ul></div><h4 id="父子组件传值" tabindex="-1"><a class="header-anchor" href="#父子组件传值" aria-hidden="true">#</a> 父子组件传值</h4><p>代码类似react</p><ol><li>子组件声明onChange props</li><li>父组件将事件处理器onChange作为子组件的props传递</li><li>在需要触发事件回调时，执行：<code>this.props.onChange()</code></li></ol><h4 id="兄弟组件传值" tabindex="-1"><a class="header-anchor" href="#兄弟组件传值" aria-hidden="true">#</a> 兄弟组件传值</h4>`,19),r=n("li",null,"通过父组件做中转",-1),d={href:"https://github.com/developit/mitt",target:"_blank",rel:"nofollow noopener noreferrer"},k=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// app.js</span>
<span class="token keyword">import</span> mitt <span class="token keyword">from</span> <span class="token string">&#39;mitt&#39;</span>

<span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">emitter</span><span class="token operator">:</span> <span class="token function">mitt</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 消费者</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>emitter<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">getApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
emitter<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>


<span class="token comment">// 生产者</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>emitter<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">getApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
emitter<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;hello mitt!&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="跨页面传值" tabindex="-1"><a class="header-anchor" href="#跨页面传值" aria-hidden="true">#</a> 跨页面传值</h4><ol><li>跳转的页面是tabbar页面</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>dd<span class="token punctuation">.</span><span class="token function">switchTab</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">&#39;/pages/index/index&#39;</span><span class="token punctuation">,</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>跳转的页面是普通页面</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 保留当前页面栈</span>
dd<span class="token punctuation">.</span><span class="token function">navigateTo</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">&#39;/pages/detail/index?tab=1&amp;id=11111&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 清除当前页面栈</span>
dd<span class="token punctuation">.</span><span class="token function">redirectTo</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">&#39;/pages/apply/index&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>钉钉小程序最大页面栈为5</p></div><h2 id="插槽" tabindex="-1"><a class="header-anchor" href="#插槽" aria-hidden="true">#</a> 插槽</h2><p>钉钉小程序根据是否提供名称可分为：默认插槽和具名插槽，当然也提供了作用域插槽</p><p>默认插槽和具名插槽使用方式与vue相同，但是作用域插槽不太相同而且偶尔会表现出怪异行为</p><h3 id="slot-scope" tabindex="-1"><a class="header-anchor" href="#slot-scope" aria-hidden="true">#</a> slot-scope</h3><p>在做for循环渲染element时，需要注意slot-scope的暴露的变量名不要与<code>a:for-item</code>提供的变量同名，可能会产生代码时而有效，时而失效的现象</p><p>假设：card-item有两个插槽：默认插槽和具名插槽-backup，并且在backup插槽上传递了一个名为item的props</p><p>❌错误示例：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>card-item</span> <span class="token attr-name"><span class="token namespace">a:</span>for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{{cardList}}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>backup<span class="token punctuation">&quot;</span></span> <span class="token attr-name">slot-scope</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        {{item.name}}
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>card-item</span><span class="token punctuation">&gt;</span></span>     
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>存在问题：</p><p>a:for循环时，数组中的默认变量名为item，这与具名插槽导出的变量名重复了</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>card-item</span> <span class="token attr-name"><span class="token namespace">a:</span>for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{{cardList}}<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">a:</span>for-item</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>card-item</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>✅正确示例：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token comment">&lt;!-- 方法1 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>card-item</span> <span class="token attr-name"><span class="token namespace">a:</span>for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{{cardList}}<span class="token punctuation">&quot;</span></span> <span class="token attr-name"><span class="token namespace">a:</span>for-item</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>card<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>backup<span class="token punctuation">&quot;</span></span> <span class="token attr-name">slot-scope</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        {{item.name}}
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>card-item</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- 方法2 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>card-item</span> <span class="token attr-name"><span class="token namespace">a:</span>for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{{cardList}}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>backup<span class="token punctuation">&quot;</span></span> <span class="token attr-name">slot-scope</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item2<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        {{item2.name}}
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>card-item</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="其他替代方案" tabindex="-1"><a class="header-anchor" href="#其他替代方案" aria-hidden="true">#</a> 其他替代方案</h2><h3 id="全局状态" tabindex="-1"><a class="header-anchor" href="#全局状态" aria-hidden="true">#</a> 全局状态</h3><p>钉钉小程序提供了<code>getApp</code>方法，那么我们可以如下操作（这里并没有强制约束state的生产者和消费者遵循单向数据流）：</p><ol><li>在<code>app.js</code>文件中声明全局变量<code>globalData</code></li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">globalData</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">userInfo</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">dept</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 所属部门</span>
            <span class="token literal-property property">roleName</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 角色名称</span>
            <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 数据id</span>
            <span class="token literal-property property">userId</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 用户id</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 用户名</span>
            <span class="token literal-property property">nickName</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 昵称</span>
            <span class="token literal-property property">serviceDept</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 驾驶员专属字段：服务部门</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>修改<code>globalData</code></li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span>globalData<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">getApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
globalData<span class="token punctuation">.</span>userInfo<span class="token punctuation">.</span>roleName <span class="token operator">=</span> <span class="token string">&#39;admin&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>获取<code>globalData</code></li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span>globalData<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">getApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>globalData<span class="token punctuation">.</span>userInfo<span class="token punctuation">.</span>roleName<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>持久化方案</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 在设置值之后需要存储到storage中</span>
dd<span class="token punctuation">.</span><span class="token function">setStorageSync</span><span class="token punctuation">(</span><span class="token punctuation">{</span>key<span class="token punctuation">,</span> <span class="token literal-property property">data</span><span class="token operator">:</span> userInfo<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 从storage中恢复到app中：将恢复逻辑放置在app.js中的onShow方法中</span>
<span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token function">onShow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// todo restore cache</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="watch" tabindex="-1"><a class="header-anchor" href="#watch" aria-hidden="true">#</a> watch</h3><p>在组件中监听子组件的更新，可以在didUpdate钩子中，判断新值与旧值是否相同来执行逻辑，但是需要注意的是：</p><ul><li>不仅是子组件通过setData更改值会触发didUpdate钩子，父组件setData时也会触发</li><li>在didUpdate中执行多次setData会导致爆栈</li><li>基本数据类型判断比较新旧值容易，但是复杂引用数据类型较困难</li></ul>`,34),v={class:"custom-container warning"},m=n("p",{class:"custom-container-title"},"WARNING",-1),b={href:"https://opendocs.alipay.com/mini/04y1n6?pathHash=8dedc947",target:"_blank",rel:"nofollow noopener noreferrer"};function g(h,f){const s=o("ExternalLinkIcon");return c(),l("div",null,[u,n("ol",null,[r,n("li",null,[a("通过纯js第三方库"),n("a",d,[a("mitt"),t(s)]),a("解决，这也是vue3官方推荐的替代bus总线的方案")])]),k,n("div",v,[m,n("p",null,[a("在支付宝小程序的文档中提到了数据变化观测器："),n("a",b,[a("observers"),t(s)]),a(" ，但是需要小程序基础库2.8.1版本支持，目前钉钉小程序基础库版本为1.25.7。所以这个功能只能通过上述方式实现。")])])])}const x=e(i,[["render",g],["__file","syntax.html.vue"]]);export{x as default};
