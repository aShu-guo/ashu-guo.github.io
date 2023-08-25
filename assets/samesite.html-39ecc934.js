import{_ as e,o as a,c as o,b as i}from"./app-a46f6870.js";const s={},t=i(`<h1 id="samesite" tabindex="-1"><a class="header-anchor" href="#samesite" aria-hidden="true">#</a> samesite</h1><p>一种防范CSRF（跨站伪造请求）的方式</p><p>跨站：eTLD+二级域名相同</p><p>跨域：协议+域名+端口相同</p><h4 id="cookies-的属性" tabindex="-1"><a class="header-anchor" href="#cookies-的属性" aria-hidden="true">#</a> Cookies 的属性</h4><h5 id="name-value" tabindex="-1"><a class="header-anchor" href="#name-value" aria-hidden="true">#</a> Name/Value</h5><p>用 JavaScript 操作 Cookie 的时候注意对 Value 进行编码处理</p><h5 id="expires" tabindex="-1"><a class="header-anchor" href="#expires" aria-hidden="true">#</a> Expires</h5><p>Expires 用于设置 Cookie 的过期时间。比如：</p><p>Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; <strong>当 Expires 属性缺省时</strong>，表示是会话性 Cookie。当为会话性 Cookie 的时候，值保存在客户端内存中，并在用户关闭浏览器时失效。需要注意的是，有些浏览器提供了会话恢复功能，这种情况下即使关闭了浏览器，会话期 Cookie 也会被保留下来，就好像浏览器从来没有关闭一样。</p><p>与会话性 Cookie 相对的是持久性 Cookie，持久性 Cookies 会保存在用户的硬盘中，直至过期或者清除 Cookie。这里值得注意的是，设定的日期和时间只与客户端相关，而不是服务端。</p><h5 id="max-age" tabindex="-1"><a class="header-anchor" href="#max-age" aria-hidden="true">#</a> Max-Age</h5><p>Max-Age 用于设置在 Cookie 失效之前需要经过的<strong>秒数</strong>。比如：</p><p>Set-Cookie: id=a3fWa; Max-Age=604800; Max-Age 可以为正数、负数、甚至是 0。</p><p>如果 max-Age 属性为正数时，浏览器会将其持久化，即写到对应的 Cookie 文件中。</p><p>当 max-Age 属性为负数，则表示该 Cookie 只是一个会话性 Cookie。</p><p>当 max-Age 为 0 时，则会立即删除这个 Cookie。</p><p>假如 Expires 和 Max-Age 都存在，Max-Age 优先级更高。</p><h5 id="domain" tabindex="-1"><a class="header-anchor" href="#domain" aria-hidden="true">#</a> Domain</h5><p>像淘宝首页设置的 Domain 就是 .taobao.com，这样无论是 a.taobao.com 还是 b.taobao.com 都可以使用 Cookie。</p><p>在这里注意的是，不能跨域设置 Cookie，比如阿里域名下的页面把 Domain 设置成百度是无效的：</p><p>Set-Cookie: qwerty=219ffwef9w0f; Domain=baidu.com; Path=/; Expires=Wed, 30 Aug 2020 00:00:00 GMT Path Path 指定了一个 URL 路径，这个路径必须出现在要请求的资源的路径中才可以发送 Cookie 首部。比如设置 Path=/docs，/docs/Web/ 下的资源会带 Cookie 首部，/test 则不会携带 Cookie 首部。</p><p><strong>Domain 和 Path 标识共同定义了 Cookie 的作用域</strong>：即 Cookie 应该发送给哪些 URL。</p><h5 id="secure属性" tabindex="-1"><a class="header-anchor" href="#secure属性" aria-hidden="true">#</a> Secure属性</h5><p>标记为 Secure 的 Cookie 只应通过被HTTPS协议加密过的请求发送给服务端。</p><h5 id="httponly" tabindex="-1"><a class="header-anchor" href="#httponly" aria-hidden="true">#</a> HTTPOnly</h5><p>设置 HTTPOnly 属性可以防止客户端脚本通过 document.cookie 等方式访问 Cookie，有助于避免 XSS 攻击。</p><h5 id="samesite-1" tabindex="-1"><a class="header-anchor" href="#samesite-1" aria-hidden="true">#</a> SameSite</h5><p>可以设置三个值：</p><p>Strict：禁止携带cookie</p><p>Lax：只能get请求提交表单、a标签发送get请求时携带cookie</p><p>none：允许携带cookie，但是设置为none，必须设置secure才会生效。只允许在https协议下发送cookie</p><h4 id="cookie的跨站限制" tabindex="-1"><a class="header-anchor" href="#cookie的跨站限制" aria-hidden="true">#</a> Cookie的跨站限制</h4><p>要求from 和 to的eTLD+1相同，即Mozilla维护的顶级域名+二级域名相同，请求时允许携带cookie</p><p>举几个例子，www.taobao.com 和 www.baidu.com 是跨站，www.a.taobao.com 和 www.b.taobao.com 是同站，a.github.io 和 b.github.io 是跨站(注意是跨站)。</p><ol><li>mac系统：/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --disable-web-security --user-data-dir</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">open</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;Google Chrome&quot;</span> <span class="token parameter variable">--args</span> --disable-features<span class="token operator">=</span>SameSiteByDefaultCookies,CookiesWithoutSameSiteMustBeSecure --disable-web-security --user-data-dir
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,37),r=[t];function n(d,p){return a(),o("div",null,r)}const h=e(s,[["render",n],["__file","samesite.html.vue"]]);export{h as default};
