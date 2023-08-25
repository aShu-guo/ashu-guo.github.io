const t=JSON.parse('{"key":"v-4cea32be","path":"/framework/vue-ecology/rfcs/0017-transition-as-root.html","title":"移除transition作为template根结点的支持","lang":"zh-CN","frontmatter":{"description":"概要 使用作为组件的根时，不再支持从外部切换组件来触发过渡。 基础用例 之前： 之后：暴露一个props来控制 动机 2.x版本的行为是个意外，但是也有一些奇怪。为了支持这种用例，我们添加了很多修复来保证它可以正常工作，因为一些用户依赖这种方法。但是，从语意上来讲， 这种用法没有意义：根据定义，组件通过改变内部的内容来正常工作，而非它本身 为了在2.x...","head":[["link",{"rel":"canonical","href":"https://ashu-guo.github.io/vue-ecology/rfcs/framework/vue-ecology/rfcs/0017-transition-as-root.html"}],["meta",{"property":"og:url","content":"https://ashu-guo.github.io/framework/vue-ecology/rfcs/0017-transition-as-root.html"}],["meta",{"property":"og:site_name","content":"aShu_guo技术博客"}],["meta",{"property":"og:title","content":"移除transition作为template根结点的支持"}],["meta",{"property":"og:description","content":"概要 使用作为组件的根时，不再支持从外部切换组件来触发过渡。 基础用例 之前： 之后：暴露一个props来控制 动机 2.x版本的行为是个意外，但是也有一些奇怪。为了支持这种用例，我们添加了很多修复来保证它可以正常工作，因为一些用户依赖这种方法。但是，从语意上来讲， 这种用法没有意义：根据定义，组件通过改变内部的内容来正常工作，而非它本身 为了在2.x..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-14T07:42:04.000Z"}],["meta",{"property":"article:author","content":"ashu_guo"}],["meta",{"property":"article:modified_time","content":"2023-07-14T07:42:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"移除transition作为template根结点的支持\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-14T07:42:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ashu_guo\\",\\"url\\":\\"http://ashu-guo.github.io/\\"}]}"]]},"headers":[{"level":2,"title":"概要","slug":"概要","link":"#概要","children":[]},{"level":2,"title":"基础用例","slug":"基础用例","link":"#基础用例","children":[]},{"level":2,"title":"动机","slug":"动机","link":"#动机","children":[]},{"level":2,"title":"详细设计","slug":"详细设计","link":"#详细设计","children":[]},{"level":2,"title":"缺点","slug":"缺点","link":"#缺点","children":[]},{"level":2,"title":"采取的策略","slug":"采取的策略","link":"#采取的策略","children":[]}],"git":{"updatedTime":1689320524000,"contributors":[{"name":"aShu-guo","email":"guochengli97@163.com","commits":1}]},"filePathRelative":"framework/vue-ecology/rfcs/0017-transition-as-root.md","autoDesc":true,"copyright":{"author":"ashu_guo","license":"MIT"}}');export{t as data};
