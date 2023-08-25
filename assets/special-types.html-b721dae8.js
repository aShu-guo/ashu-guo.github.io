import{_ as e,r as t,o as p,c as o,a as n,d as c,e as l,b as s}from"./app-a46f6870.js";const i={},u=s(`<h1 id="特殊的类型" tabindex="-1"><a class="header-anchor" href="#特殊的类型" aria-hidden="true">#</a> 特殊的类型</h1><p>在ts中除了基本类型之外，还有5个特殊的类型：<code>any</code>、<code>unknown</code>、<code>never</code>、<code>null</code>、<code>undefined</code></p><h2 id="any" tabindex="-1"><a class="header-anchor" href="#any" aria-hidden="true">#</a> any</h2><p>ts对类型为<code>any</code>的变量不会做类型检查、智能提示等帮助，虽然有上述缺点，但是在处理过去设计漏洞时很有帮助。</p><p>如果没有显式设置类型，而且ts没有推断出类型，那么变量的类型会被设置为<code>any</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">let</span> a<span class="token operator">:</span> <span class="token builtin">any</span> <span class="token operator">=</span> <span class="token boolean">true</span>
a <span class="token operator">=</span> <span class="token string">&#39;xiaoming&#39;</span> <span class="token comment">// 如果不显式指定变量a为any类型，那么ts会自动推断变量a为boolean类型，再次赋值为string类型的值会报错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="unknown" tabindex="-1"><a class="header-anchor" href="#unknown" aria-hidden="true">#</a> unknown</h2><p>unknown与any类似，但是却更加安全。当不知道一个变量的类型是什么时，可以将它的类型设置为<code>unknown</code>。</p><p>而且ts将会阻止使用<code>未推断为具体类型</code>的<code>unknown</code>变量</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">let</span> a<span class="token operator">:</span> <span class="token builtin">unknown</span> <span class="token operator">=</span> <span class="token boolean">true</span>
a <span class="token operator">=</span> <span class="token string">&#39;hello world&#39;</span>

a <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">run</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;hello world&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token keyword">as</span> <span class="token punctuation">{</span> <span class="token function-variable function">run</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span> <span class="token punctuation">}</span>

<span class="token comment">// a.run() // Error: &#39;a&#39; is of type &#39;unknown&#39;.ts(18046)</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> a <span class="token operator">===</span> <span class="token string">&#39;object&#39;</span> <span class="token operator">&amp;&amp;</span> a <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">(</span>a <span class="token keyword">as</span> <span class="token punctuation">{</span> run<span class="token operator">:</span> <span class="token builtin">Function</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与<code>any</code>相比，在使用<code>unknown</code>类型的变量时ts仍会进行类型校验，如果想不抛出ts异常，那么在使用时必须断言为正确的类型</p><h2 id="never" tabindex="-1"><a class="header-anchor" href="#never" aria-hidden="true">#</a> never</h2><p>never类型的变量，只要赋值给它便会抛出异常。</p><p>当<code>类型收敛</code>之后没有其他类型可能时，ts会将自动将类型推断为<code>never</code></p>`,14),r={href:"https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking",target:"_blank",rel:"nofollow noopener noreferrer"},d=s(`<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">let</span> name<span class="token operator">:</span> <span class="token builtin">never</span> <span class="token operator">=</span> <span class="token string">&#39;123&#39;</span> <span class="token comment">//Error: Type &#39;string&#39; is not assignable to type &#39;never&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>never很少使用，尤其是单独使用，它的主要用途是高级泛型</p><h2 id="undefined-null" tabindex="-1"><a class="header-anchor" href="#undefined-null" aria-hidden="true">#</a> undefined &amp;&amp; null</h2><p>undefined 与 null对应js中的 undefined 和 null</p><p>ts有更强大的系统处理null和undefined类型的值</p><h3 id="可选链" tabindex="-1"><a class="header-anchor" href="#可选链" aria-hidden="true">#</a> 可选链</h3><p>optional chain 是ES7的内容，而且ts支持。是一种访问对象中<code>可选的属性</code>的兼容语法</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span>
    sex<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        male<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span>
        female<span class="token operator">:</span> <span class="token builtin">boolean</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">introduce</span> <span class="token operator">=</span> <span class="token punctuation">(</span>student<span class="token operator">:</span> Student<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">name: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>student<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, age: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>student<span class="token punctuation">.</span>age<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, sex: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>student<span class="token punctuation">.</span>sex<span class="token operator">?.</span>male<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="空值合并" tabindex="-1"><a class="header-anchor" href="#空值合并" aria-hidden="true">#</a> 空值合并</h3><p>也是ES7的内容，而且ts支持。适用于访问可能为<code>null</code>或者<code>undefined</code>的属性，语法为：<code>??</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">printMileage</span><span class="token punctuation">(</span>mileage<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Mileage: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>mileage <span class="token operator">??</span> <span class="token string">&#39;Not Available&#39;</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">printMileage</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Prints &#39;Mileage: Not Available&#39;</span>
<span class="token function">printMileage</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Prints &#39;Mileage: 0&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意与<code>&amp;&amp;</code>的区别：</p><ul><li>A &amp;&amp; B: 当A为<code>false</code>、<code>0</code>、<code>&#39;&#39;</code>、<code>null</code>、<code>undefined</code>时，才可以访问B</li><li>A ?? B: 当A为<code>null</code>、<code>undefined</code>时，才可以访问B</li></ul><h3 id="空值断言" tabindex="-1"><a class="header-anchor" href="#空值断言" aria-hidden="true">#</a> 空值断言</h3><p>ts的推断系统并不完美，可能推断的值并不准确。一种简单的方式是类型转换，但是也可以使用<code>!</code>，告诉ts这个变量一定不会是<code>null</code> 或者<code>undefined</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&#39;hello&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> value <span class="token operator">=</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;value length: &#39;</span> <span class="token operator">+</span> value<span class="token operator">!</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：这与类型转换一样，并不安全</p>`,17);function k(v,m){const a=t("ExternalLinkIcon");return p(),o("div",null,[u,n("p",null,[n("a",r,[c("是否需要在类型收敛函数中添加详尽性判断？"),l(a)])]),d])}const g=e(i,[["render",k],["__file","special-types.html.vue"]]);export{g as default};