import{_ as e,o as t,c as n,b as a}from"./app-a46f6870.js";const s={},i=a(`<h1 id="update队列" tabindex="-1"><a class="header-anchor" href="#update队列" aria-hidden="true">#</a> update队列</h1><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>queue // 存放watcher，队列
callbacks // 存放全局回调

调用链：
update-&gt;queueWatcher-&gt;nextTick-&gt;timerFunc-&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>watcher批量更新</p></blockquote><p>在一个函数作用域内执行了响应式属性的set操作，<strong>触发dep来通知watcher更新视图</strong>。但是并<strong>不是同步的</strong>，而是<strong>第一次</strong> 触发了watcher更新视图时，<strong>会开辟一个微任务队列</strong>，此时并不会执行，在当前同步代码执行完毕之后，再去查找微任务队列去执行视图更新逻辑</p><blockquote><p>为什么使用setTimeout开辟一个宏任务会产生奇怪的现象</p><p>issue：#7109, #7153, #7546, #7834, #8109</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>requestAnimationFrame具有不确定性？
MutationObserver 监视一个节点，节点发生改变时会触发回调

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),d=[i];function r(c,u){return t(),n("div",null,d)}const o=e(s,[["render",r],["__file","update-queue.html.vue"]]);export{o as default};