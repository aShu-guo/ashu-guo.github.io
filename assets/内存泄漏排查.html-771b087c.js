import{_ as e,r as o,o as t,c as n,a as l,d as s,e as c,b as p}from"./app-a46f6870.js";const r="/imgs/内存泄漏-performance.png",a="/imgs/内存泄漏-memory-summary.png",m="/imgs/内存泄漏-memory-comparsion.png",_="/imgs/内存泄漏-memory-containment.png",u="/imgs/内存泄漏-memory-statistics.png",g={},d=p('<blockquote><p>内存泄漏排查</p></blockquote><ol><li><p>首先通过performance记录一段时间的页面运行记录，如果显示js堆内存下限在不断的升高，那么就需要注意发生了内存泄漏 <img src="'+r+'" alt="img.png"></p></li><li><p>使用memory面板分析内存泄漏的具体位置</p><ul><li>首先记录一个快照</li><li>点击可能存在内存泄漏位置的操作，在记录一个快照</li><li>重复步骤2</li><li>分析比较两个快照之间的差异</li></ul></li></ol><p><img src="'+a+'" alt="img.png"></p><blockquote><p>指标分析</p></blockquote><ul><li><p>Summary</p><ul><li>distance表示距离根结点的距离，数值越到，表示距离越远</li><li>shallow size表示发生快照时在占用内存的大小</li><li>retained size表示gc之后可以释放的内存大小 如果retained size明显高于shallow size，则需要注意内存泄漏</li></ul></li><li><p>comparison（内存泄漏分析利器）</p><ul><li># New 两张快照之间新实例化对象的个数</li><li># Deleted 两张快照之间销毁对象的个数</li><li># Delta = # New - # Deleted</li><li># Alloc. Size 两张快照之间重新分配的内存</li><li># Freed Size 两张快照之间释放的内存</li><li># Size Delta = # Alloc. Size - # Freed Size <img src="'+m+'" alt="img.png"></li></ul></li><li><p>containment（分析堆中的引用） <img src="'+_+'" alt="img.png"></p></li><li><p>Statistics（不同变量类型的占用内存） <img src="'+u+'" alt="img.png"></p></li></ul><blockquote><p>常见的内存泄漏</p></blockquote><ul><li>大量的console.log(name)，变量一直被引用无法被回收，导致内存泄漏。所以在生产环境需要清除console.log()代码</li><li>vue项目引入第三方依赖，没有及时释放导致的内存泄漏</li><li>项目中使用大量闭包</li><li>定时器没有清理</li></ul><blockquote><p>触发gc的方式</p></blockquote><p>本质是修改变量的引用计数为0</p><ul><li>delete变量</li><li>设置变量为null</li></ul><p>【参考】</p>',11),k={href:"https://zhuanlan.zhihu.com/p/322356761",target:"_blank",rel:"nofollow noopener noreferrer"};function f(h,z){const i=o("ExternalLinkIcon");return t(),n("div",null,[d,l("ol",null,[l("li",null,[l("a",k,[s("手把手教你排查Javascript内存泄漏"),c(i)])])])])}const q=e(g,[["render",f],["__file","内存泄漏排查.html.vue"]]);export{q as default};
