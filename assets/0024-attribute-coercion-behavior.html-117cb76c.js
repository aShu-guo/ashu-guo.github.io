const e=JSON.parse(`{"key":"v-5d9775a3","path":"/framework/vue-ecology/rfcs/0024-attribute-coercion-behavior.html","title":"attribute强制行为","lang":"zh-CN","frontmatter":{"description":"概览 废弃内置的enumerated attributes的概念，将这些属性作为普通非布尔类型的attribute来处理。; 如果属性值为false，则不再移除这个属性。而是设置为attr='false'。想要移除属性时，需要设置为null或者undefined。; 动机 在2.x版本，对于v-bind绑定的属性值我们采用的是以下策略： 对于attri...","head":[["link",{"rel":"canonical","href":"https://ashu-guo.github.io/vue-ecology/rfcs/framework/vue-ecology/rfcs/0024-attribute-coercion-behavior.html"}],["meta",{"property":"og:url","content":"https://ashu-guo.github.io/framework/vue-ecology/rfcs/0024-attribute-coercion-behavior.html"}],["meta",{"property":"og:site_name","content":"aShu_guo技术博客"}],["meta",{"property":"og:title","content":"attribute强制行为"}],["meta",{"property":"og:description","content":"概览 废弃内置的enumerated attributes的概念，将这些属性作为普通非布尔类型的attribute来处理。; 如果属性值为false，则不再移除这个属性。而是设置为attr='false'。想要移除属性时，需要设置为null或者undefined。; 动机 在2.x版本，对于v-bind绑定的属性值我们采用的是以下策略： 对于attri..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-14T07:42:04.000Z"}],["meta",{"property":"article:author","content":"ashu_guo"}],["meta",{"property":"article:modified_time","content":"2023-07-14T07:42:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"attribute强制行为\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-14T07:42:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ashu_guo\\",\\"url\\":\\"http://ashu-guo.github.io/\\"}]}"]]},"headers":[{"level":2,"title":"概览","slug":"概览","link":"#概览","children":[]},{"level":2,"title":"动机","slug":"动机","link":"#动机","children":[]},{"level":2,"title":"详细设计","slug":"详细设计","link":"#详细设计","children":[]},{"level":2,"title":"缺点","slug":"缺点","link":"#缺点","children":[]},{"level":2,"title":"可选的方案","slug":"可选的方案","link":"#可选的方案","children":[]},{"level":2,"title":"采取的策略","slug":"采取的策略","link":"#采取的策略","children":[{"level":3,"title":"enumerated attributes","slug":"enumerated-attributes","link":"#enumerated-attributes","children":[]},{"level":3,"title":"将false转换为'false'而不是移除attribute","slug":"将false转换为-false-而不是移除attribute","link":"#将false转换为-false-而不是移除attribute","children":[]},{"level":3,"title":"2.x版本和3.x版本中的行为比较","slug":"_2-x版本和3-x版本中的行为比较","link":"#_2-x版本和3-x版本中的行为比较","children":[]}]},{"level":2,"title":"未解决的问题","slug":"未解决的问题","link":"#未解决的问题","children":[]}],"git":{"updatedTime":1689320524000,"contributors":[{"name":"aShu-guo","email":"guochengli97@163.com","commits":1}]},"filePathRelative":"framework/vue-ecology/rfcs/0024-attribute-coercion-behavior.md","autoDesc":true,"copyright":{"author":"ashu_guo","license":"MIT"}}`);export{e as data};
