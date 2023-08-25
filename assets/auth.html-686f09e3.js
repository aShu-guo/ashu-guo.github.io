import{_ as t,r as s,o as i,c as l,a as e,d as o,e as n,b as r}from"./app-a46f6870.js";const c={},d=r(`<h1 id="鉴权的几种方式" tabindex="-1"><a class="header-anchor" href="#鉴权的几种方式" aria-hidden="true">#</a> 鉴权的几种方式</h1><h2 id="jwt模式" tabindex="-1"><a class="header-anchor" href="#jwt模式" aria-hidden="true">#</a> JWT模式</h2><p>在服务端渲染的页面是不能访问localStorage的，所以只能通过Cookie判断用户登录态。</p><p>如果之前使用JWT模式，并且存储token到localStorage中的校验登录态，则需要调整为存入Cookie中。</p><p>JWT模式中的token使用方式：</p><ul><li>登录用户用账号、密码换取的token，在客户端保存时既可以放在<code>Cookie</code>中，又可以放在<code>localStorage</code>中</li><li>token中间用<code>.</code>隔开分成3段，<code>Header.Payload.Signature</code>存放有关token类型、加密方式、签发方式等信息</li><li>再次请求接口时，需要将token带回服务端。既可以将token放在<code>Cookie</code>中（会存在跨域），又可以放在请求头的<code>Authorization</code>中</li></ul><p>缺点：</p><ul><li>token一旦签发，有效期只与失效时间有关，除非服务端添加额外的逻辑。</li><li>默认不加密，需要传输敏感数据时则应加密</li></ul><h3 id="前端实践" tabindex="-1"><a class="header-anchor" href="#前端实践" aria-hidden="true">#</a> 前端实践</h3><ol><li>用户输入账号、密码以及验证码（可选），请求登录接口时，响应给客户端token。</li><li>客户端将token存储到localStorage中，并设置有效期，可如此设计：</li></ol><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;token&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xxxxxx&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;start&quot;</span><span class="token operator">:</span> <span class="token string">&quot;设置时的时间戳&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;expire&quot;</span><span class="token operator">:</span> <span class="token string">&quot;有效时长&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并且如果前端中有状态管理模块（vuex||pinia），那么也需要将token同步更新到该模块中，如此在代码中验证用户是否为登录态时只需要与该模块交互即可。</p><ol start="3"><li>在request拦截器中将token设置到请求头上。</li><li>在全局路由守卫中判断token是否有效，有效则跳转，无效则跳转至403页面。</li></ol><h2 id="session-cookie验证" tabindex="-1"><a class="header-anchor" href="#session-cookie验证" aria-hidden="true">#</a> session-cookie验证</h2><p>在这种方式下，客户端和服务端验证两者相互验证的是sessionId。这种方式下，前端参与度并不高。</p><p>只需要将服务端返回的唯一标识sessionId存到cookie中，在向服务端发送请求时会自动携带当前域名下的Cookie，如此服务端便可以判断发送请求的用户是否为登录状态。</p><p>优点：</p><p>简单、快捷</p><p>缺点：</p><p>由于cookie存在跨域问题，所以如果需要多个系统对接如此设计的登录模块时会存在跨域问题。</p><h3 id="前端实践-1" tabindex="-1"><a class="header-anchor" href="#前端实践-1" aria-hidden="true">#</a> 前端实践</h3><ol><li>用户输入账号、密码以及验证码（可选），请求登录接口时，响应给客户端sessionId。</li><li>客户端将sessionId存储到Cookie中。</li></ol><h2 id="oauth2-开放验证" tabindex="-1"><a class="header-anchor" href="#oauth2-开放验证" aria-hidden="true">#</a> OAuth2 开放验证</h2><p>引用阮一峰博客的一句话：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>简单说，OAuth 就是一种授权机制。数据的所有者告诉系统，同意授权第三方应用进入系统，获取这些数据。系统从而产生一个短期的进入令牌（token），用来代替密码，供第三方应用使用。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>目前OAuth2已经被标准化了，被google、github、microsoft等公司广泛使用，用于开发者调用他们提供的API。</p><ol><li>第三方系统在开放平台（例如google api console）中备案，获取客户端id和客户端密钥，简称客户端凭证。并且需要添加回调地址（第三方系统内部的页面），用于获取code</li><li>第三方系统的用户登录时，重定向到开发平台提供的网页中，用户确认后从资源所有者（Resource Owner）获取code并跳回第一步中填入的回调链接</li><li>在回调链接对应的页面拿code向Authorization server换取token</li><li>后携带token向资源服务器请求目标资源。</li></ol>`,27),p={href:"https://colobu.com/2017/04/28/oauth2-rfc6749/#1-2-_%E5%8D%8F%E8%AE%AE%E6%B5%81%E7%A8%8B",target:"_blank",rel:"nofollow noopener noreferrer"},u=e("p",null,"参考：",-1),h={href:"http://www.ruanyifeng.com/blog/2019/04/oauth_design.html",target:"_blank",rel:"nofollow noopener noreferrer"};function k(g,_){const a=s("ExternalLinkIcon");return i(),l("div",null,[d,e("p",null,[o("以上只是简化后的OAuth2.0协议的简化步骤，更多的可以参考"),e("a",p,[o("OAuth2 RFC6749"),n(a)])]),u,e("p",null,[o("【1】"),e("a",h,[o("OAuth 2.0 的一个简单解释"),n(a)])])])}const x=t(c,[["render",k],["__file","auth.html.vue"]]);export{x as default};