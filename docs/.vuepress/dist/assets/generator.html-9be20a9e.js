import{_ as n,p as s,q as a,a1 as e}from"./framework-1443a5b1.js";const p={},t=e(`<p>一、干什么用的</p><p>异步的一种实现方式</p><p>二、怎么用的</p><p>1.同步</p><p>被*标记的函数是一个generator函数，每执行一次generator函数的next()方法都会执行yield后的代码，并返回结果：{value:&#39;&#39;, done:false}，其中value对应函数的返回，有则返回，无则为undefined</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">haveReturn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">noReturn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token keyword">let</span> a<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">}</span>

<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">yield</span> <span class="token function">haveReturn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">yield</span> <span class="token function">noReturn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>![image-20211013143924070](/Users/ifugle/Library/Application Support/typora-user-images/image-20211013143924070.png)</p><p>2.异步</p><p>为什么要引入微任务，由于js是单线程的，是为了解决异步任务的执行</p><p>三、怎么实现的</p><p>四、有哪些优缺点</p><p>五、缺点有哪些优化方式</p><p>六、有没有产出</p>`,13),o=[t];function c(i,l){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","generator.html.vue"]]);export{r as default};
