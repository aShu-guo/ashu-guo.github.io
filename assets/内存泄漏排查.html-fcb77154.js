const e=JSON.parse('{"key":"v-d88e41fc","path":"/base/debug-skill/%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F%E6%8E%92%E6%9F%A5.html","title":"","lang":"zh-CN","frontmatter":{"description":"内存泄漏排查 1. 首先通过performance记录一段时间的页面运行记录，如果显示js堆内存下限在不断的升高，那么就需要注意发生了内存泄漏 img.png 2. 使用memory面板分析内存泄漏的具体位置 首先记录一个快照; 点击可能存在内存泄漏位置的操作，在记录一个快照; 重复步骤2; 分析比较两个快照之间的差异; img.png 指标分析 Su...","head":[["link",{"rel":"canonical","href":"https://ashu-guo.github.io/vue-ecology/rfcs/base/debug-skill/%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F%E6%8E%92%E6%9F%A5.html"}],["meta",{"property":"og:url","content":"https://ashu-guo.github.io/base/debug-skill/%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F%E6%8E%92%E6%9F%A5.html"}],["meta",{"property":"og:site_name","content":"aShu_guo技术博客"}],["meta",{"property":"og:description","content":"内存泄漏排查 1. 首先通过performance记录一段时间的页面运行记录，如果显示js堆内存下限在不断的升高，那么就需要注意发生了内存泄漏 img.png 2. 使用memory面板分析内存泄漏的具体位置 首先记录一个快照; 点击可能存在内存泄漏位置的操作，在记录一个快照; 重复步骤2; 分析比较两个快照之间的差异; img.png 指标分析 Su..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-12-14T09:45:05.000Z"}],["meta",{"property":"article:author","content":"ashu_guo"}],["meta",{"property":"article:modified_time","content":"2022-12-14T09:45:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-12-14T09:45:05.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ashu_guo\\",\\"url\\":\\"http://ashu-guo.github.io/\\"}]}"]]},"headers":[],"git":{"updatedTime":1671011105000,"contributors":[{"name":"aShu-guo","email":"guochengli97@163.com","commits":2}]},"filePathRelative":"base/debug-skill/内存泄漏排查.md","autoDesc":true,"copyright":{"author":"ashu_guo","license":"MIT"}}');export{e as data};
