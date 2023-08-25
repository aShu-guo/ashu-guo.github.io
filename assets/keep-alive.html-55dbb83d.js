const e=JSON.parse('{"key":"v-6cb9835a","path":"/framework/vue-ecology/problems/keep-alive.html","title":"keep-alive组件(基于vue 2.6.10)","lang":"zh-CN","frontmatter":{"description":"什么是keep-alive组件？ 提供了3个props; include：可以是字符串、正则、字符串数组，用于匹配要缓存组件的name; exclude：值类似include，组件黑名单，如果匹配到了传入的值则不缓存; max：指定可以缓存的组件数量，超出数; 量后通过LRU策略 (https://en.wikipedia.org/wiki/Cache...","head":[["link",{"rel":"canonical","href":"https://ashu-guo.github.io/vue-ecology/rfcs/framework/vue-ecology/problems/keep-alive.html"}],["meta",{"property":"og:url","content":"https://ashu-guo.github.io/framework/vue-ecology/problems/keep-alive.html"}],["meta",{"property":"og:site_name","content":"aShu_guo技术博客"}],["meta",{"property":"og:title","content":"keep-alive组件(基于vue 2.6.10)"}],["meta",{"property":"og:description","content":"什么是keep-alive组件？ 提供了3个props; include：可以是字符串、正则、字符串数组，用于匹配要缓存组件的name; exclude：值类似include，组件黑名单，如果匹配到了传入的值则不缓存; max：指定可以缓存的组件数量，超出数; 量后通过LRU策略 (https://en.wikipedia.org/wiki/Cache..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-14T07:42:04.000Z"}],["meta",{"property":"article:author","content":"ashu_guo"}],["meta",{"property":"article:modified_time","content":"2023-07-14T07:42:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"keep-alive组件(基于vue 2.6.10)\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-14T07:42:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ashu_guo\\",\\"url\\":\\"http://ashu-guo.github.io/\\"}]}"]]},"headers":[{"level":2,"title":"什么是keep-alive组件？","slug":"什么是keep-alive组件","link":"#什么是keep-alive组件","children":[]},{"level":2,"title":"keep-alive组件在app.vue中使用存在问题","slug":"keep-alive组件在app-vue中使用存在问题","link":"#keep-alive组件在app-vue中使用存在问题","children":[]},{"level":2,"title":"验证","slug":"验证","link":"#验证","children":[{"level":3,"title":"两者的keepAlive都是true","slug":"两者的keepalive都是true","link":"#两者的keepalive都是true","children":[]},{"level":3,"title":"飞行场景管理的keepAlive为true，飞行场景详情的keepAlive为false","slug":"飞行场景管理的keepalive为true-飞行场景详情的keepalive为false","link":"#飞行场景管理的keepalive为true-飞行场景详情的keepalive为false","children":[]}]}],"git":{"updatedTime":1689320524000,"contributors":[{"name":"aShu-guo","email":"guochengli97@163.com","commits":1}]},"filePathRelative":"framework/vue-ecology/problems/keep-alive.md","autoDesc":true,"copyright":{"author":"ashu_guo","license":"MIT"}}');export{e as data};