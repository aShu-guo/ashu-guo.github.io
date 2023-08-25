const t=JSON.parse('{"key":"v-4b6f1721","path":"/server/common/response-structure.html","title":"接口响应结构","lang":"zh-CN","frontmatter":{"description":"code code应该放在body中还是放在http status上？ 这是一个老生常谈的问题了，国内主流是放在 body 里，而国外不同。 我认为应该都放： 1. 许多监控工具是依赖http头部的status code的，如果只放在body并且200行天下，对监控是不友好的 2. 只放http status上会发现业务错误总是不够用的。 3. 组合两...","head":[["link",{"rel":"canonical","href":"https://ashu-guo.github.io/vue-ecology/rfcs/server/common/response-structure.html"}],["meta",{"property":"og:url","content":"https://ashu-guo.github.io/server/common/response-structure.html"}],["meta",{"property":"og:site_name","content":"aShu_guo技术博客"}],["meta",{"property":"og:title","content":"接口响应结构"}],["meta",{"property":"og:description","content":"code code应该放在body中还是放在http status上？ 这是一个老生常谈的问题了，国内主流是放在 body 里，而国外不同。 我认为应该都放： 1. 许多监控工具是依赖http头部的status code的，如果只放在body并且200行天下，对监控是不友好的 2. 只放http status上会发现业务错误总是不够用的。 3. 组合两..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-16T03:08:37.000Z"}],["meta",{"property":"article:author","content":"ashu_guo"}],["meta",{"property":"article:modified_time","content":"2023-08-16T03:08:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"接口响应结构\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-08-16T03:08:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ashu_guo\\",\\"url\\":\\"http://ashu-guo.github.io/\\"}]}"]]},"headers":[{"level":2,"title":"code","slug":"code","link":"#code","children":[]}],"git":{"updatedTime":1692155317000,"contributors":[{"name":"aShu-guo","email":"guochengli97@163.com","commits":2}]},"filePathRelative":"server/common/response-structure.md","autoDesc":true,"copyright":{"author":"ashu_guo","license":"MIT"}}');export{t as data};
