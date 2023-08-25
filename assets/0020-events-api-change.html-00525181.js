import{_ as c,r as d,o as t,c as n,a as o,d as e,e as r,b as s}from"./app-a46f6870.js";const i={},h=s('<h1 id="事件api变更" tabindex="-1"><a class="header-anchor" href="#事件api变更" aria-hidden="true">#</a> 事件API变更</h1><h2 id="概览" tabindex="-1"><a class="header-anchor" href="#概览" aria-hidden="true">#</a> 概览</h2><p>移除<code>$on</code>、<code>$off</code>和<code>$once</code>实例方法。vue实例不再实现事件发送接口。</p><h2 id="动机" tabindex="-1"><a class="header-anchor" href="#动机" aria-hidden="true">#</a> 动机</h2><p>vue1.x版本实现了与AngularJS类似的组件事件系统，用户可以使用<code>$dispatch</code>和<code>$broadcast</code>通过事件派发在组件树中的组件间通信。</p><p>在Vue2中，我们移除了<code>$dispatch</code>和<code>$broadcast</code>来支持由状态驱动的数据流（props/event）。</p><p>使用Vue2的API时，<code>$emit</code> 被用来触发在父组件（在template或者render函数中）中声明的事件处理器，但是也可以触发通过实例事件API关联起来的事件处理器（<code>$on</code>、<code>$off</code> 和<code>$once</code> ）。实际上这有点过载了：完整的事件API并不是典型的组件间数据流的一部分。它们很少被使用，而且并没有充分的理由将它们暴露在组件实例上。因此本RFC建议移除<code>$on</code>、<code>$off</code> 和<code>$once</code>。</p><h2 id="采取的策略" tabindex="-1"><a class="header-anchor" href="#采取的策略" aria-hidden="true">#</a> 采取的策略</h2>',8),p={href:"https://github.com/developit/mitt",target:"_blank",rel:"nofollow noopener noreferrer"},l=o("p",null,"这些方法可以在兼容版本中继续支持。",-1);function _(f,u){const a=d("ExternalLinkIcon");return t(),n("div",null,[h,o("p",null,[e("在Vue2中，事件API更多的被当作事件总线来使用。可以使用实现了事件API的外部库来替换，例如："),o("a",p,[e("mitt"),r(a)]),e("。")]),l])}const m=c(i,[["render",_],["__file","0020-events-api-change.html.vue"]]);export{m as default};