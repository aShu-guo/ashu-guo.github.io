const e=JSON.parse('{"key":"v-0ac6442d","path":"/server/nest/auth.html","title":"认证模块","lang":"zh-CN","frontmatter":{"description":"项目的认证模块是基于token的jwt模式。jwt模式是用户访问服务端受限资源的一种策略 jwt 如果之前使用JWT模式，并且存储token到localStorage中的校验登录态，则需要调整为存入Cookie中。 JWT模式中的token使用方式： 登录用户用账号、密码换取的token，在客户端保存时既可以放在Cookie中，又可以放在localSt...","head":[["link",{"rel":"canonical","href":"https://ashu-guo.github.io/vue-ecology/rfcs/server/nest/auth.html"}],["meta",{"property":"og:url","content":"https://ashu-guo.github.io/server/nest/auth.html"}],["meta",{"property":"og:site_name","content":"aShu_guo技术博客"}],["meta",{"property":"og:title","content":"认证模块"}],["meta",{"property":"og:description","content":"项目的认证模块是基于token的jwt模式。jwt模式是用户访问服务端受限资源的一种策略 jwt 如果之前使用JWT模式，并且存储token到localStorage中的校验登录态，则需要调整为存入Cookie中。 JWT模式中的token使用方式： 登录用户用账号、密码换取的token，在客户端保存时既可以放在Cookie中，又可以放在localSt..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-16T09:53:26.000Z"}],["meta",{"property":"article:author","content":"ashu_guo"}],["meta",{"property":"article:modified_time","content":"2023-08-16T09:53:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"认证模块\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-08-16T09:53:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ashu_guo\\",\\"url\\":\\"http://ashu-guo.github.io/\\"}]}"]]},"headers":[{"level":2,"title":"jwt","slug":"jwt","link":"#jwt","children":[]},{"level":2,"title":"refresh token","slug":"refresh-token","link":"#refresh-token","children":[{"level":3,"title":"服务端主动刷新","slug":"服务端主动刷新","link":"#服务端主动刷新","children":[]},{"level":3,"title":"客户端主动刷新","slug":"客户端主动刷新","link":"#客户端主动刷新","children":[{"level":4,"title":"轮换refresh token","slug":"轮换refresh-token","link":"#轮换refresh-token","children":[]}]}]},{"level":2,"title":"注销","slug":"注销","link":"#注销","children":[]},{"level":2,"title":"实践","slug":"实践","link":"#实践","children":[]}],"git":{"updatedTime":1692179606000,"contributors":[{"name":"aShu-guo","email":"guochengli97@163.com","commits":2}]},"filePathRelative":"server/nest/auth.md","autoDesc":true,"copyright":{"author":"ashu_guo","license":"MIT"}}');export{e as data};
