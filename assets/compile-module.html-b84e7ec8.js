import{_ as r,r as d,o as n,c as i,a as o,d as e,e as l,w as s,b as c}from"./app-a46f6870.js";const h={},u=c('<h1 id="compile-module" tabindex="-1"><a class="header-anchor" href="#compile-module" aria-hidden="true">#</a> compile-module</h1><h2 id="template-render" tabindex="-1"><a class="header-anchor" href="#template-render" aria-hidden="true">#</a> template -&gt; render</h2><h2 id="render函数" tabindex="-1"><a class="header-anchor" href="#render函数" aria-hidden="true">#</a> render函数</h2>',3),p={href:"https://template-explorer.vuejs.org/",target:"_blank",rel:"nofollow noopener noreferrer"},_=c('<h3 id="何时去写" tabindex="-1"><a class="header-anchor" href="#何时去写" aria-hidden="true">#</a> 何时去写</h3><p>一般开发业务组件时，并不建议写render，更建议直接写template</p><ul><li>功能性组件，需要灵活的获取slot或作用域slot的内容，将它们打包或者其他处理，例如 <ul><li>布局组件</li><li>递归组件</li></ul></li></ul><h2 id="编译时做了哪些优化" tabindex="-1"><a class="header-anchor" href="#编译时做了哪些优化" aria-hidden="true">#</a> 编译时做了哪些优化？</h2><ul><li>将永远静态（即没有依赖任何变量的DOM）提升到最上级，当模板更新时会直接复用可以复用的DOM（新旧VNode是否严格相等）而非整体重新编译。 <ul><li>编译器提供标记，标记哪些VNode是动态的，例如：<code>/* PROPS */</code>，渲染器才可以知道</li><li>实现原理是<a href="./block">Block机制</a></li></ul></li><li>缓存事件handler <ul><li>在vue2中并没有此项优化，由于handler可能是行内<code>()=&gt;foo()</code>、<code>foo()</code>，如此在父组件重新渲染时，子组件也会重新渲染</li><li>在react中提供了<code>useMemo</code>以及<code>useCallback</code>来缓存事件handler，但是由于Vue使用Template语法，所以它在内部帮用户处理了 <ul><li>解析js的难度远大于解析template</li><li>在比较新旧节点时，需要严格比较每行是否发生变化，导致React会导致许多没有变动的子组件仍会重复渲染。</li></ul></li></ul></li></ul><h3 id="如何实现的" tabindex="-1"><a class="header-anchor" href="#如何实现的" aria-hidden="true">#</a> 如何实现的？</h3><p>我们知道在Vue中通过<code>VNode</code>以及<code>diff</code>提高性能，其中<code>VNode</code>是用来描述<code>DOM</code>节点的对象，<code>diff</code>是用于比较新旧<code>VNode</code>的优化算法。</p><p>在Vue2中通过<code>Observer</code>、<code>Dep</code>、<code>Watch</code> 3个组成部分实现了依赖收集，在响应式<code>data</code>发生变化时，重新执行<code>render</code>函数生成新的<code>VNode</code>，后通过<code>diff</code> 算法将新VNode与旧VNode进行比较，从而可以进行局部的更新，但是每次都需要做全量的比较。</p>',8),f=o("code",null,"props",-1),m=o("code",null,"dynamic style",-1),V=o("code",null,"dynamic class",-1),x=o("code",null,"template",-1),k=o("code",null,"VNode",-1),N=o("code",null,"diff",-1),b=o("code",null,"patchFlag",-1),g=o("code",null,"shapeFlag",-1);function v(B,M){const a=d("ExternalLinkIcon"),t=d("RouterLink");return n(),i("div",null,[u,o("p",null,[e("render函数是template编译后的产物，其中引用了响应式对象，你可以使用Vue官方提供的"),o("a",p,[e("template-explorer"),l(a)]),e(" 编译模板")]),_,o("p",null,[e("在Vue3中在编译阶段，对需要track的地方添加patchFlag，例如："),f,e("、"),m,e("、"),V,e(" 等。通过分析"),x,e("，将静态的"),k,e("提升而且在执行"),N,e("比较时，通过之前编译阶段添加的"),b,e("以及"),g,e(" 判断是否需要diff，如此当state发生变化时，可以局部的diff、局部的更新。在一些极端条件下，性能相对于Vue2可以提升一个数量级。更多的源码分析可以参考"),l(t,{to:"/framework/vue-ecology/3.x/block.html"},{default:s(()=>[e("patchFlag与Block")]),_:1})])])}const w=r(h,[["render",v],["__file","compile-module.html.vue"]]);export{w as default};
