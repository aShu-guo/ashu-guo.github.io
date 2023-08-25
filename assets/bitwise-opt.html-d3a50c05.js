import{_ as n,o as s,c as a,b as e}from"./app-a46f6870.js";const t={},l=e(`<h1 id="位运算符" tabindex="-1"><a class="header-anchor" href="#位运算符" aria-hidden="true">#</a> 位运算符</h1><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> <code>&lt;&lt;</code></h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 将左边数转为2进制后，向左移动n位并在低位补0</span>

<span class="token comment">// 3转为2进制为：11，向左移动2位为：1100，再转为10进制为：12</span>
<span class="token number">3</span> <span class="token operator">&lt;&lt;</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="-1" tabindex="-1"><a class="header-anchor" href="#-1" aria-hidden="true">#</a> <code>&gt;&gt;</code></h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 将右边数转为2进制后，向右移动n位并在高位补0，但是要保证原来位数不变</span>

<span class="token comment">// 3转为2进制为：11，向右移动1位为：01，再转为10进制为：1</span>
<span class="token number">3</span> <span class="token operator">&gt;&gt;</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="-2" tabindex="-1"><a class="header-anchor" href="#-2" aria-hidden="true">#</a> <code>|</code></h2><p>将两个数都转为 2 进制，相同位置有<code>包含</code> 1，则最终数的当前位置也是 1</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/*
8: 1000
2: 0010
==&gt;1010 转为10进制为10
 */</span>
<span class="token number">8</span> <span class="token operator">|</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="-3" tabindex="-1"><a class="header-anchor" href="#-3" aria-hidden="true">#</a> <code>&amp;</code></h2><p>将两个数都转为 2 进制，相同位置<code>都是</code> 1，则最终数的当前位置也是 1</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/*
8: 1000
2: 0010
==&gt;0000 转为10进制为0
 */</span>
<span class="token number">8</span> <span class="token operator">&amp;</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="可以提供哪些能力" tabindex="-1"><a class="header-anchor" href="#可以提供哪些能力" aria-hidden="true">#</a> 可以提供哪些能力？</h2><p>假设这样一堆能力，一个名为 A 的同学没有任何能力</p><table><tbody><tr><th>篮球</th><th>足球</th><th>爬山</th><th>打乒乓球</th><th>游泳</th></tr><tr><th>0</th><th>0</th><th>0</th><th>0</th><th>0</th></tr></tbody></table><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token constant">A</span> <span class="token operator">=</span> <span class="token number">0</span>
<span class="token keyword">const</span> Swimming <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">1</span> <span class="token comment">// 0 0 0 0 1</span>
<span class="token keyword">const</span> PingPang <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">2</span> <span class="token comment">// 0 0 0 1 0</span>
<span class="token keyword">const</span> Climbing <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">3</span> <span class="token comment">// 0 0 1 0 0</span>
<span class="token keyword">const</span> Football <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">4</span> <span class="token comment">// 0 1 0 0 0</span>
<span class="token keyword">const</span> Basketball <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">5</span> <span class="token comment">// 1 0 0 0 0</span>

<span class="token comment">// 让A具备游泳的能力</span>
<span class="token constant">A</span> <span class="token operator">|=</span> Swimming
<span class="token comment">// 让A具备打篮球的能力</span>
<span class="token constant">A</span> <span class="token operator">|=</span> Basketball

<span class="token comment">// 判断A是否具备游泳的能力</span>
<span class="token constant">A</span> <span class="token operator">&amp;</span> Swimming <span class="token comment">// 如果值大于0则表示具备，反正则不具备</span>

<span class="token constant">A</span> <span class="token operator">&amp;</span> Football
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),i=[l];function c(o,r){return s(),a("div",null,i)}const d=n(t,[["render",c],["__file","bitwise-opt.html.vue"]]);export{d as default};
