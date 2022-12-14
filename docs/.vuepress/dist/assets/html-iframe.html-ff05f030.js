import{_ as n,p as a,q as s,a1 as e}from"./framework-1443a5b1.js";const p={},i=e(`<p>一、干什么用的</p><p>1.内嵌网页，可用于广告</p><p>2.前端早期用于发送异步请求，不用重新打开页面，随着各种异步解决方案出现，这种方式逐渐被废弃</p><p>二、怎么用的</p><p>1.获取iframe的window对象</p><p>1.1 通过选择器获取iframe，再获取内容</p><p>iframe.contentWindow, 获取iframe的window对象 iframe.contentDocument, 获取iframe的document对象</p><p>1.2 window.frames[&#39;name&#39;]返回的是window对象</p><p>给定iframe一个name属性值，通过window.iframes[&#39;name&#39;]获取</p><p>2.iframe获取父级内容</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>window<span class="token punctuation">.</span>parent <span class="token comment">//获取上一级的window对象，如果还是iframe则是该iframe的window对象</span>
window<span class="token punctuation">.</span>top <span class="token comment">//获取最顶级容器的window对象，即，就是你打开页面的文档</span>
window<span class="token punctuation">.</span>self <span class="token comment">//返回自身window的引用。可以理解 window===window.self(脑残)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.跨域iframe窗口间通信问题</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/2/10/3e56ecd82b4142f612883fb77e5a9a48~tplv-t2oaga2asx-watermark.awebp" alt="img"></p><p>通常情况下，窗口通信无法跨域，但是可以通过postMessage进行跨域通信</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 前置条件：弹出框没有被阻止且加载完成</span>
window<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span>message<span class="token punctuation">,</span> targetOrigin<span class="token punctuation">,</span> <span class="token punctuation">[</span>transfer<span class="token punctuation">]</span><span class="token punctuation">)</span> 
<span class="token comment">// message: MessageEvent.data</span>
<span class="token comment">// targetOrigin: 用于匹配接收消息的窗口</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>三、怎么实现的</p><p>......</p><p>四、有哪些优缺点</p><p>缺点分为两个部分：</p><p>​ 性能差：重绘、重排</p><p>​ 安全性：点击劫持</p><p>自己的页面被攻击者iframe，通过设置iframe的透明度或者一些诱导图片、文字这些视觉上的欺骗诱导用户点击</p><p>五、缺点有哪些优化方式</p><p>性能方面：天生的，无法优化</p><p>安全性：防止自己的页面被别人iframe</p><p>1.通过window.top判断是否被iframe</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>window<span class="token punctuation">.</span>top<span class="token operator">===</span>window <span class="token comment">// 限定你的网页不能嵌套在任意网页内，也包括自己网站内的页面</span>
top<span class="token punctuation">.</span>location<span class="token punctuation">.</span>host<span class="token operator">!==</span>window<span class="token punctuation">.</span>localtion<span class="token punctuation">.</span>host <span class="token comment">// 同源的页面可以iframe</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.sandbox</p><p>h5新增sandbox属性，控制iframe页面的权限</p><p>3.服务端限制</p><p>​ 2.1 X-Frame-Options</p><p>​ DENY： 当前页面不能被嵌套到iframe中</p><p>​ SAMEORIGIN： 同源域名可嵌套</p><p>​ ALLOW-FROM：可以在指定的origin url的iframe中加载</p><p>​</p><p>​ 2.2 Content Security Policy</p><p>六、有没有产出</p>`,37),t=[i];function o(c,l){return a(),s("div",null,t)}const d=n(p,[["render",o],["__file","html-iframe.html.vue"]]);export{d as default};
