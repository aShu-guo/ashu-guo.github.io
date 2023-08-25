import{_ as n,o as s,c as a,b as e}from"./app-a46f6870.js";const p={},t=e(`<h1 id="函数类型" tabindex="-1"><a class="header-anchor" href="#函数类型" aria-hidden="true">#</a> 函数类型</h1><p>在ts中声明函数时与js不同，需要显式声明参数类型和返回值类型</p><h2 id="类型声明" tabindex="-1"><a class="header-anchor" href="#类型声明" aria-hidden="true">#</a> 类型声明</h2><p>语法为：(参数名: 参数类型) =&gt; 返回值类型</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// fn是一个要求参数类型为string，返回值类型为boolean的函数</span>
<span class="token keyword">const</span> doSomething <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token function-variable function">fn</span><span class="token operator">:</span> <span class="token punctuation">(</span>arg<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">fn</span><span class="token punctuation">(</span><span class="token string">&#39;hello world&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="通用声明" tabindex="-1"><a class="header-anchor" href="#通用声明" aria-hidden="true">#</a> 通用声明</h3><p>更加通用的函数类型声明</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Fun</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">any</span>

<span class="token keyword">interface</span> <span class="token class-name">Fun2</span> <span class="token punctuation">{</span>
    <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="带属性的函数声明" tabindex="-1"><a class="header-anchor" href="#带属性的函数声明" aria-hidden="true">#</a> 带属性的函数声明</h3><p>但是在js中会存在包含一些属性的函数，即将属性挂到声明的函数类型的变量上</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">fn</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">name</span><span class="token operator">:</span> string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;hello &#39;</span> <span class="token operator">+</span> name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
fn<span class="token punctuation">.</span>desc <span class="token operator">=</span> <span class="token string">&#39;我是一个函数&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在ts中可以如下声明来解决上述问题：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">fn</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    desc<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">fn</span><span class="token punctuation">{</span>
    desc<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是这与不含属性的函数类型有些许不同，参数类型与返回值类型之间一个是<code>:</code> 另一个是<code>=&gt;</code>：<code>(name: string): void</code> <code>(arg: string) =&gt; boolean</code></p><h3 id="构造函数声明" tabindex="-1"><a class="header-anchor" href="#构造函数声明" aria-hidden="true">#</a> 构造函数声明</h3><p>在js中可以实例化函数，对应的在ts中可以声明如下：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Fn</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token keyword">new</span><span class="token punctuation">(</span>s<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> SomeObject<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span>ctor<span class="token operator">:</span> Fn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ctor</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>可以将两者组合使用，日期：Date便是一个例子，既可以实例化，又可以直接调用。</p></div><h2 id="返回值类型" tabindex="-1"><a class="header-anchor" href="#返回值类型" aria-hidden="true">#</a> 返回值类型</h2><p>可以显示的声明返回值类型，如果没有声明，ts则会尝试自行根据返回值推断类型。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> getName <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&#39;xiaoming&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只要是ts允许的类型都可以作为返回值类型，只特别介绍<code>void</code>类型</p><h3 id="void类型" tabindex="-1"><a class="header-anchor" href="#void类型" aria-hidden="true">#</a> void类型</h3><p>如果函数没有返回值或者返回<code>undefined</code>，则返回值类型为<code>void</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> sayHello <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;hello world&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="通过type-alias声明的函数" tabindex="-1"><a class="header-anchor" href="#通过type-alias声明的函数" aria-hidden="true">#</a> 通过type alias声明的函数</h4><p>此时<code>void</code>表示会忽略返回值</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">voidFunc</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">;</span>


<span class="token keyword">const</span> f1<span class="token operator">:</span> <span class="token function-variable function">voidFunc</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> f2<span class="token operator">:</span> <span class="token function-variable function">voidFunc</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> f3<span class="token operator">:</span> <span class="token function-variable function">voidFunc</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是为了兼容没有函数体的回调<code>[&#39;1&#39;, &#39;2&#39;, &#39;3&#39;].forEach( (item) =&gt; parseFloat(item))</code></p><p><code>forEach</code>的返回值类型为void，但是parseFloat的返回值类型是<code>number</code>，但是这在ts中并不报错。</p><h4 id="字面函数声明" tabindex="-1"><a class="header-anchor" href="#字面函数声明" aria-hidden="true">#</a> 字面函数声明</h4><p>此时不能有返回值或者返回<code>undefined</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token function-variable function">f2</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">f3</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">undefined</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="泛型" tabindex="-1"><a class="header-anchor" href="#泛型" aria-hidden="true">#</a> 泛型</h2><p>为了使函数更加通用，可以传入一个或多个泛型（类型变量），在声明参数类型和返回值类型时可以使用泛型来声明</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// </span>
<span class="token keyword">function</span> <span class="token generic-function"><span class="token function">map</span><span class="token generic class-name"><span class="token operator">&lt;</span>Input<span class="token punctuation">,</span> Output<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>data<span class="token operator">:</span> Input<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token function-variable function">callback</span><span class="token operator">:</span> <span class="token punctuation">(</span>item<span class="token operator">:</span> Input<span class="token punctuation">,</span> index<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Output<span class="token punctuation">)</span><span class="token operator">:</span> Output<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> data<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>如果返回值类型和参数类型分配了同一个泛型类型，则返回值必须与入参的值的类型必须相同，而不能是其他泛型的子类。</p></div><p>在定义函数的泛型时，根据官方推荐的规则总结出以下判断：</p><ol><li>需要声明泛型时，尽量使用它本身，而不是通过extends约束它</li><li>尽可能使用少量的类型参数</li><li>不要为回调函数声明可选参数，即使是可选的</li></ol><h2 id="参数类型" tabindex="-1"><a class="header-anchor" href="#参数类型" aria-hidden="true">#</a> 参数类型</h2><p>为函数的参数列表分配类型，语法类似声明对象属性。如果没有显式声明，ts会默认为<code>any</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token function-variable function">sayHello</span> <span class="token operator">=</span> <span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;i am &#39;</span> <span class="token operator">+</span> name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="可选参数" tabindex="-1"><a class="header-anchor" href="#可选参数" aria-hidden="true">#</a> 可选参数</h3><p>ts默认所有参数都是必须的，但是可以通过<code>?</code>表明参数是非必须的</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 被\`?\`标记的参数的类型为：number | undefined</span>
<span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> c<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b <span class="token operator">+</span> <span class="token punctuation">(</span>c <span class="token operator">||</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="参数默认值" tabindex="-1"><a class="header-anchor" href="#参数默认值" aria-hidden="true">#</a> 参数默认值</h3><p>默认值写在参数类型之后</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> c<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b <span class="token operator">+</span> <span class="token punctuation">(</span>c <span class="token operator">||</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="具名参数" tabindex="-1"><a class="header-anchor" href="#具名参数" aria-hidden="true">#</a> 具名参数</h3><p>含义等于解构对象参数</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">introduce</span><span class="token punctuation">(</span><span class="token punctuation">{</span>name<span class="token punctuation">,</span> age<span class="token punctuation">}</span><span class="token operator">:</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name <span class="token operator">+</span> <span class="token string">&#39;:&#39;</span> <span class="token operator">+</span> age<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="剩余参数" tabindex="-1"><a class="header-anchor" href="#剩余参数" aria-hidden="true">#</a> 剩余参数</h3><p><code>...</code>将剩余参数列表归纳为数组，这点与js保存一致，但是需要声明剩余参数列表的类型</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> <span class="token operator">...</span>rest<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b <span class="token operator">+</span> rest<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span>p<span class="token punctuation">,</span> c<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> p <span class="token operator">+</span> c<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="类型别名" tabindex="-1"><a class="header-anchor" href="#类型别名" aria-hidden="true">#</a> 类型别名</h3><p>为函数类型的变量声明一个类型</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Introduce</span> <span class="token operator">=</span> <span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">string</span>
<span class="token keyword">const</span> introduce<span class="token operator">:</span> <span class="token function-variable function">Introduce</span> <span class="token operator">=</span> <span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> name
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="重载" tabindex="-1"><a class="header-anchor" href="#重载" aria-hidden="true">#</a> 重载</h2><p>函数名相同但是参数列表的个数、类型、顺序不同，返回值不同的称为函数的重载</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">makeDate</span><span class="token punctuation">(</span>timestamp<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> Date<span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">makeDate</span><span class="token punctuation">(</span>m<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> d<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> Date<span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">makeDate</span><span class="token punctuation">(</span>mOrTimestamp<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> d<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> y<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> Date <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>d <span class="token operator">!==</span> <span class="token keyword">undefined</span> <span class="token operator">&amp;&amp;</span> y <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>y<span class="token punctuation">,</span> mOrTimestamp<span class="token punctuation">,</span> d<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>mOrTimestamp<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在声明了函数的不同签名时，由于只能有一个实现，所以实现函数时需要兼容不同的版本。</p><p>在上面的函数实现中，<code>d</code>和<code>y</code>为可选参数，在添加函数体时对未传<code>d</code>和<code>y</code>的情况区分了处理。</p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>能使用联合类型时，尽量不要使用函数的重载</p></div><h2 id="类型收敛" tabindex="-1"><a class="header-anchor" href="#类型收敛" aria-hidden="true">#</a> 类型收敛</h2><p>将宽泛的类型收敛为一个更为精确的类型</p><h3 id="type-predicate" tabindex="-1"><a class="header-anchor" href="#type-predicate" aria-hidden="true">#</a> type predicate</h3><p>语法为：参数名 <code>is</code> 类型</p><p>当使用类型断言函数作为返回值类型时，返回值类型必须为<code>boolean</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">isValidRating</span><span class="token punctuation">(</span>
  rating<span class="token operator">:</span> <span class="token builtin">any</span>
<span class="token punctuation">)</span><span class="token operator">:</span> rating <span class="token keyword">is</span> Rating <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>rating <span class="token operator">||</span> <span class="token keyword">typeof</span> rating <span class="token operator">!==</span> <span class="token string">&quot;number&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    rating <span class="token operator">===</span> <span class="token number">1</span> <span class="token operator">||</span>
    rating <span class="token operator">===</span> <span class="token number">2</span> <span class="token operator">||</span>
    rating <span class="token operator">===</span> <span class="token number">3</span> <span class="token operator">||</span>
    rating <span class="token operator">===</span> <span class="token number">4</span> <span class="token operator">||</span>
    rating <span class="token operator">===</span> <span class="token number">5</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,69),o=[t];function c(i,l){return s(),a("div",null,o)}const u=n(p,[["render",c],["__file","functions.html.vue"]]);export{u as default};