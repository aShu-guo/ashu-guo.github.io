import{_ as t,r as o,o as i,c,a as s,d as n,e as a,b as p}from"./app-a46f6870.js";const l="/imgs/base/setInterval-vs-requestframe.png",r={},u=p(`<h1 id="setinterval-vs-requestanimationframe" tabindex="-1"><a class="header-anchor" href="#setinterval-vs-requestanimationframe" aria-hidden="true">#</a> setInterval vs requestAnimationFrame</h1><p>定时执行的任务与<code>requestAnimationFrame</code> api比较</p><h2 id="功能" tabindex="-1"><a class="header-anchor" href="#功能" aria-hidden="true">#</a> 功能</h2><p><code>setInterval</code>中为宏任务，在执行到<code>setInterval</code>时会推入的宏任务队列，在微任务执行完毕之后才回去执行宏任务。</p><p>由于<code>EventLoop</code>机制，导致<code>setInterval</code>的执行事件间隔并不是准确的，会受<code>微任务队列执行的时长</code>、<code>CPU load</code>等影响。</p><p>执行第一次宏任务<code>setInterval</code>回调之后，主线程开始执行微任务，如果微任务没有执行完毕，那么下次宏任务的执行时机会延迟，并不会按照传入的时长去执行</p><h2 id="requestanimationframe-是宏任务还是微任务" tabindex="-1"><a class="header-anchor" href="#requestanimationframe-是宏任务还是微任务" aria-hidden="true">#</a> requestAnimationFrame 是宏任务还是微任务？</h2><p>在宏任务<code>前</code>新增一个微任务，<code>后</code>新增一个<code>requestAnimationFrame</code></p><ul><li>如果<code>requestAnimationFrame</code>是微任务</li></ul><p>则输出：微任务 -&gt; requestAnimationFrame -&gt; 宏任务</p><ul><li>如果<code>requestAnimationFrame</code>是宏任务</li></ul><p>则输出：微任务 -&gt; 宏任务 -&gt; requestAnimationFrame</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> promise <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;promise&#39;</span><span class="token punctuation">)</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

promise<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;promise then&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>


<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;setTimeout&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;requestAnimationFrame&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">/*
如果是 微任务，输出顺序微：
promise
promise then
requestAnimationFrame
setTimeout
 */</span>
<span class="token comment">/*
如果是 宏任务，输出顺序微：
promise
promise then
setTimeout
requestAnimationFrame
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可知<code>requestAnimationFrame</code>是宏任务，那么既然是宏任务，为什么不会出现时长延迟的问题？</p><p>简单来说，即使两者都是宏任务，但是执行时机不同，<code>setTimeout</code>执行时机早于<code>requestAnimationFrame</code></p><p><img src="`+l+'" alt="img.png"></p><p>在页面重新绘制之前有渲染时机的判断<code>Rendering opportunities</code>，用来减少不必要的渲染。也就是说，如果<code>setTimeout</code> 回调执行了多次之后，浏览器发现还不到渲染时机，那么便不会执行重绘。例如在1帧之内执行多次<code>setTimeout</code>，并不会立刻渲染，这会导致渲染的DOM出现掉帧</p>',17),d={href:"https://segmentfault.com/a/1190000040945949",target:"_blank",rel:"nofollow noopener noreferrer"},m={href:"https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout",target:"_blank",rel:"nofollow noopener noreferrer"};function v(k,b){const e=o("ExternalLinkIcon");return i(),c("div",null,[u,s("p",null,[n("参考： 【1】"),s("a",d,[n("requestAnimationFrame 执行机制探索"),a(e)]),n(" 【2】"),s("a",m,[n("8.6 Timers"),a(e)])])])}const f=t(r,[["render",v],["__file","setInterval-vs-requestframe.html.vue"]]);export{f as default};
