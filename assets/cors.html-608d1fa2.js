import{_ as e,o as a,c as d,b as o}from"./app-a46f6870.js";const c={},i=o('<h1 id="跨域" tabindex="-1"><a class="header-anchor" href="#跨域" aria-hidden="true">#</a> 跨域</h1><p>跨域限制是<code>浏览器</code>独有的安全特点（浏览器的行为，即在服务端构建Http请求访问非同源服务端并不会出现跨域问题）， 严格限制<strong>协议、端口、域名</strong>来保证数据的安全。网站的内容可能是从多个服务器中获取资源，</p><h2 id="为什么浏览器可以加载不同源的图片资源" tabindex="-1"><a class="header-anchor" href="#为什么浏览器可以加载不同源的图片资源" aria-hidden="true">#</a> 为什么浏览器可以加载不同源的图片资源？</h2><p>明明请求图片资源是get请求，为什么跨域请求资源可以正常响应？原因是浏览器允许一小部分标签可以通过跨域访问，这是历史遗留问题。那么也就意味着可能会存在漏洞，例如iframe的点击劫持</p><p>点击劫持：通过诱导用户点击一些功能按钮来达到目的。因为在浏览器登录网页之后，会存有用户的cookie。</p><p>防范上诉问题需要服务端设置<code>X-Frame-Options</code>，告诉浏览器能不能加载iframe：</p><ul><li>DENY：浏览器禁止加载任何iframe</li><li>SAMEEORIGIN：允许加载同源的iframe</li><li>ALLOW-FROM uri：已废弃</li></ul><h2 id="什么是源" tabindex="-1"><a class="header-anchor" href="#什么是源" aria-hidden="true">#</a> 什么是源</h2><p>如果两个URL的协议、端口、域名都相同，那么这两个URL是同源的</p><h3 id="源的继承" tabindex="-1"><a class="header-anchor" href="#源的继承" aria-hidden="true">#</a> 源的继承</h3><p>通过data:、javascript:、about:打开的无需包含服务端内容的页面，这些完全由客户端生成的静态页面。那么打开新页面的源是从创建它的脚本那里继承的。</p><h2 id="哪些是允许的哪些是禁止的" tabindex="-1"><a class="header-anchor" href="#哪些是允许的哪些是禁止的" aria-hidden="true">#</a> 哪些是允许的哪些是禁止的？</h2><p>可以分为三类：</p><ul><li>跨域写：一般是被允许的。例如链接、重定向以及表单提交（forms）</li><li>跨域资源嵌入：iframe嵌入跨域资源，但是通过js读取iframe中的DOM是禁止的。</li><li>跨域读：一般是禁止的。但是可以通过iframe巧妙的解决<code>postMessage</code></li></ul><h3 id="跨域资源嵌入" tabindex="-1"><a class="header-anchor" href="#跨域资源嵌入" aria-hidden="true">#</a> 跨域资源嵌入</h3><ul><li>通过<code>&lt;img&gt;</code>展示的图片资源</li><li>通过<code>&lt;video&gt;</code>和<code>&lt;audio&gt;</code>播放的多媒体资源</li><li>通过<code>@font-face</code>引入的外部字体资源</li><li>通过<code>&lt;iframe&gt;</code>嵌入的任何资源都可以访问，如果响应头<code>X-Frame-Options</code>设置为<code>DENY</code>或者<code>SAMEEORIGIN</code>，则可能无法访问。</li><li>通过<code>&lt;script src=&quot;...&quot;&gt;</code>引入的脚本，例如：用于CDN加速引入的第三方依赖</li><li>通过<code>&lt;link&gt;</code>引入的css资源，例如：用于CDN加速引入的antdv的样式资源。需要设置争取的<code>Content-Type</code></li></ul><h2 id="修改源" tabindex="-1"><a class="header-anchor" href="#修改源" aria-hidden="true">#</a> 修改源</h2><p>通过设置<code>document.domain</code>来修改当前源，但是域名必须是上下级关系。例如：在<code>https://www.aaa.com</code> 中设置<code>document.domain=aaa.com</code>，在访问<code>https://aaa.com</code>时将会通过同源检测，同时也必须在<code>https://aaa.com</code> 中设置<code>document.domain=aaa.com</code> 来表明允许它这样做。</p><p>任何对<code>document.domain</code>的赋值操作都会导致端口号置为<code>null</code>，因此必须要在两者中都设置<code>document.domain</code>来保证端口号相同。</p><p>但是对于localStorage、indexedDB等web API并不能通过同源检测，而且如果是通过iframe访问也无法通过检测。</p><h3 id="如何允许跨源资源访问" tabindex="-1"><a class="header-anchor" href="#如何允许跨源资源访问" aria-hidden="true">#</a> 如何允许跨源资源访问？</h3><p>服务端设置<code>Access-Control-Allow-Origin: *</code>允许所有非同源下的客户端访问。</p>',22),t=[i];function r(l,n){return a(),d("div",null,t)}const s=e(c,[["render",r],["__file","cors.html.vue"]]);export{s as default};