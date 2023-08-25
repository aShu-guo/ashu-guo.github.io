const e=JSON.parse('{"key":"v-2a6075c6","path":"/framework/vue-ecology/rfcs/0022-router-merge-meta-routelocation.html","title":"合并router的meta对象","lang":"zh-CN","frontmatter":{"description":"概览 当创建routes时，我们可以通过meta属性关联一些额外的数据： 然后在路由守卫中和$route中访问： 然而，当处理内嵌的routes对象时，需要遍历matched数组中的所有对象的meta： 这个RFC的提议是合并所有matched中路由对象的meta，从父路由到子路由，以便我们可以直接从to.meta.requiresAuth 访问。我认...","head":[["link",{"rel":"canonical","href":"https://ashu-guo.github.io/vue-ecology/rfcs/framework/vue-ecology/rfcs/0022-router-merge-meta-routelocation.html"}],["meta",{"property":"og:url","content":"https://ashu-guo.github.io/framework/vue-ecology/rfcs/0022-router-merge-meta-routelocation.html"}],["meta",{"property":"og:site_name","content":"aShu_guo技术博客"}],["meta",{"property":"og:title","content":"合并router的meta对象"}],["meta",{"property":"og:description","content":"概览 当创建routes时，我们可以通过meta属性关联一些额外的数据： 然后在路由守卫中和$route中访问： 然而，当处理内嵌的routes对象时，需要遍历matched数组中的所有对象的meta： 这个RFC的提议是合并所有matched中路由对象的meta，从父路由到子路由，以便我们可以直接从to.meta.requiresAuth 访问。我认..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-14T07:42:04.000Z"}],["meta",{"property":"article:author","content":"ashu_guo"}],["meta",{"property":"article:modified_time","content":"2023-07-14T07:42:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"合并router的meta对象\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-14T07:42:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ashu_guo\\",\\"url\\":\\"http://ashu-guo.github.io/\\"}]}"]]},"headers":[{"level":2,"title":"概览","slug":"概览","link":"#概览","children":[]},{"level":2,"title":"基础用例","slug":"基础用例","link":"#基础用例","children":[]},{"level":2,"title":"动机","slug":"动机","link":"#动机","children":[]},{"level":2,"title":"详细设计","slug":"详细设计","link":"#详细设计","children":[]},{"level":2,"title":"缺点","slug":"缺点","link":"#缺点","children":[]}],"git":{"updatedTime":1689320524000,"contributors":[{"name":"aShu-guo","email":"guochengli97@163.com","commits":1}]},"filePathRelative":"framework/vue-ecology/rfcs/0022-router-merge-meta-routelocation.md","autoDesc":true,"copyright":{"author":"ashu_guo","license":"MIT"}}');export{e as data};
