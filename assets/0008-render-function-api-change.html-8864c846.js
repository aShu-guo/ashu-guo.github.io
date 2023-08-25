import{_ as t,r as o,o as c,c as i,a as s,d as n,e as p,b as a}from"./app-a46f6870.js";const l={},r=a(`<h1 id="变更render函数的api" tabindex="-1"><a class="header-anchor" href="#变更render函数的api" aria-hidden="true">#</a> 变更render函数的API</h1><h2 id="概要" tabindex="-1"><a class="header-anchor" href="#概要" aria-hidden="true">#</a> 概要</h2><ul><li><code>h</code>现在是通过全局导出，而不再以参数的形式存在。</li><li>变更render函数中的参数，并且在有状态组件以及函数式组件中保持一致。</li><li>VNodes的props结构扁平化。</li></ul><h2 id="基础用例" tabindex="-1"><a class="header-anchor" href="#基础用例" aria-hidden="true">#</a> 基础用例</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 全局导出 \`h\`</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>h<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>
            <span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span>
            <span class="token comment">// 扁平化</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">&#39;app&#39;</span><span class="token punctuation">,</span>
                <span class="token function">onClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;hello&#39;</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">[</span>
                <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;span&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;child&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="动机" tabindex="-1"><a class="header-anchor" href="#动机" aria-hidden="true">#</a> 动机</h2><p>在2.x，VNodes是指定上下文的 - 意味着创建的每个VNodes都会与创建它的组件实例绑定（&quot;上下文&quot; ）。这样做是因为我们需要支持以下用例（<code>createElement</code>被简写为了<code>h</code>）:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 基于字符串寻找组件</span>
<span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;some-component&#39;</span><span class="token punctuation">)</span>

<span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">directives</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;foo&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 基于字符串寻找指令</span>
            <span class="token comment">// ...</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了寻找本地或者全局注册的组件或者指令，我们需要知道拥有这个VNode的组件实例。这也是2.x将<code>h</code> 作为参数传递的原因，被传递到render函数中的参数<code>h</code>是预先绑定到组件实例上的柯里化版本（就像<code>this.$createElement</code>一样）。</p><p>但是这造成了诸多不变，例如：当拆分render函数的逻辑到多个函数中时，需要将<code>h</code>也传递过去：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">renderSomething</span><span class="token punctuation">(</span><span class="token parameter">h</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">h</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">renderSomething</span><span class="token punctuation">(</span>h<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当使用JSX时，这会变得很臃肿，因为h被隐式的使用而且并不会出现在用户侧的代码中。我们的JSX插件必须自动注入h来缓解这种情况，但是逻辑是复杂的而且脆弱。</p><p>在3.0中我们发现了一种可以使VNode上下文无关的方法。将可以使用全局导出的h函数在任意地方创建VNode，因此在需要使用的文件仅需要导入一次。</p><hr><p>另一个与2.x渲染函数API相关的问题是内置的VNode数据结构：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token keyword">class</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">style</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token literal-property property">attrs</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">&#39;foo&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">domProps</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">innerHTML</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">on</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">click</span><span class="token operator">:</span> foo<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),u={href:"https://github.com/snabbdom/snabbdom/blob/master/README-zh_CN.md",target:"_blank",rel:"nofollow noopener noreferrer"},d=s("code",null,"class",-1),k=s("code",null,"class",-1),v=a(`<p>但是，随着时间的推移，我们主要到相对于扁平化的结构，目前内置的结构存在很多问题：</p><ul><li>需要写很多冗余的代码</li><li><code>class</code>和<code>style</code>在特殊用例中与预期有点不一致</li><li>更多的内存占用（存储更多的对象）</li><li>diff更慢（每个内置的对象都需要迭代循环）</li><li>对于拷贝、合并、传递更复杂而且花销更大</li><li>使用JSX时，需要需要特殊的规则和隐式转换</li></ul><p>在3.0中，我们决定通过扁平化的VNode数据结构来解决这些问题。</p><h2 id="详细设计" tabindex="-1"><a class="header-anchor" href="#详细设计" aria-hidden="true">#</a> 详细设计</h2><h3 id="全局导出h函数" tabindex="-1"><a class="header-anchor" href="#全局导出h函数" aria-hidden="true">#</a> 全局导出<code>h</code>函数</h3><p><code>h</code>已经被全局导出：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>h<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="改变render函数的入参" tabindex="-1"><a class="header-anchor" href="#改变render函数的入参" aria-hidden="true">#</a> 改变render函数的入参</h3><p>不再使用<code>h</code> 作为参数，意味着render函数不再需要接收任何参数。实际上，在3.0中，render函数经常作为整合template编译出多个render产物来使用。在用户侧，建议在<code>setup()</code> 函数中返回出render。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>h<span class="token punctuation">,</span> reactive<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function">setup</span><span class="token punctuation">(</span><span class="token parameter">props<span class="token punctuation">,</span> <span class="token punctuation">{</span>slots<span class="token punctuation">,</span> attrs<span class="token punctuation">,</span> emit<span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>

        <span class="token keyword">function</span> <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            state<span class="token punctuation">.</span>count<span class="token operator">++</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// return the render function</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">onClick</span><span class="token operator">:</span> increment
            <span class="token punctuation">}</span><span class="token punctuation">,</span> state<span class="token punctuation">.</span>count<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从<code>setup()</code>中返回的render函数自然的与响应式状态以及在当前作用域中声明的函数联系在一起，因此传递给setup的参数：</p><ul><li><code>props</code>和<code>attrs</code>需要与<code>this.$props</code>和<code>this.$attrs</code>保持一致。</li><li><code>slots</code>需要与<code>this.$slots</code>保持一致。</li><li><code>emit</code>需要与<code>this.$emit</code>保持一致。</li></ul><p>这里的<code>props</code>、<code>slots</code>、<code>attrs</code>都是通过代理的，因此当它们在render函数中使用时会指向最新的值。</p>`,13),m=s("code",null,"setup()",-1),b={href:"https://vuejs.org/guide/extras/composition-api-faq.html",target:"_blank",rel:"nofollow noopener noreferrer"},h=a(`<h3 id="改变函数式组件参数" tabindex="-1"><a class="header-anchor" href="#改变函数式组件参数" aria-hidden="true">#</a> 改变函数式组件参数</h3><p>需要注意的是，函数式组件的render函数也应该有相同的入参，这将会在有状态组件以及函数式组件中保持一致：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">FunctionalComp</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">props<span class="token punctuation">,</span> <span class="token punctuation">{</span>slots<span class="token punctuation">,</span> attrs<span class="token punctuation">,</span> emit<span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新的参数列表需要完全具备可替换当前函数式组件参数的能力：</p><ul><li><code>props</code>和<code>slots</code>值与旧语法保持一；</li><li><code>data</code>和<code>children</code>不再是必须的（使用props和slot即可）；</li><li><code>listeners</code>将会被包含在<code>attrs</code>中；</li><li><code>injections</code>将会被新API<code>inject</code>替换（组合式API的一部分）：</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>inject<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>themeSymbol<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./ThemeProvider&#39;</span>

<span class="token keyword">const</span> <span class="token function-variable function">FunctionalComp</span> <span class="token operator">=</span> <span class="token parameter">props</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> theme <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>themeSymbol<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Using theme </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>theme<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>将会移除<code>parent</code>的访问权限。这是一些内部用例的逃生舱 - 在用户侧，props和injections应该是首选。</li></ul><h3 id="扁平化的vnode-props格式" tabindex="-1"><a class="header-anchor" href="#扁平化的vnode-props格式" aria-hidden="true">#</a> 扁平化的VNode props格式</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// before</span>
<span class="token keyword">const</span> props <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token keyword">class</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">style</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;red&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">attrs</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">&#39;foo&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">domProps</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">innerHTML</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">on</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">click</span><span class="token operator">:</span> foo<span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">&#39;foo&#39;</span>
<span class="token punctuation">}</span>

<span class="token comment">// after</span>
<span class="token keyword">const</span> props <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token keyword">class</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">style</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;red&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">&#39;foo&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">innerHTML</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">onClick</span><span class="token operator">:</span> foo<span class="token punctuation">,</span>
    <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">&#39;foo&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在扁平结构中，VNode将使用以下规则处理props：</p><ul><li><code>key</code>和<code>ref</code>被保留</li><li><code>class</code>和<code>style</code>的API与2.x保持一致</li><li>以<code>on</code>开头的props会被当作<code>v-on</code>绑定处理，<code>on</code>之后的所有字符串都会被转换为小写的事件名来处理。</li><li>另外的： <ul><li>如果key是DOM节点上的属性，那么将会被设置到DOM上；</li><li>否则将会被设置为组件实例上的属性。</li></ul></li></ul><h3 id="特别-保留-的props" tabindex="-1"><a class="header-anchor" href="#特别-保留-的props" aria-hidden="true">#</a> 特别&quot;保留&quot;的props</h3><p>有两个全局保留的props：</p><ul><li><code>key</code></li><li><code>ref</code></li></ul><p>另外，你可以使用保留的<code>onVnodeXXX</code>前缀钩子hook到组件的生命周期：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">onVnodeMounted</span><span class="token punctuation">(</span><span class="token parameter">vnode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">/* ... */</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">onVnodeUpdated</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> prevVnode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">/* ... */</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些hook与自定义指令的构建方式类似。因为它们以 on 开头，所以它们也可以在模板中用 v-on 声明：</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">@vnodeMounted</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>() =&gt; { }<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>由于扁平化的结构，组件上的<code>this.$attrs</code>包含所有没有在组件中显式声明的属性，包含：<code>class</code>、<code>style</code>、<code>onXXX</code> 监听器以及<code>vnodeXXX</code>hook。这将会简化写wrapper组件的方式 - 只需要将<code>this.$attrs</code>传递到<code>v-bind=&quot;$attrs&quot;</code> 。</p><p>（译者注：在之前的代码中，写wrapper组件时需要区分<code>listeners</code>和<code>attrs</code>，通过<code>v-on</code>和<code>v-bind</code> 传递对象的方式来传递多个监听器或者props。简单来说，在组件上声明的<code>props</code>以及<code>emits</code>事件不会存在<code>$attrs</code>上，表明<code>props</code> 以及<code>emits</code> 被当前组件消费了，再简单来说相当于过滤了已经声明的属性，没有声明的属性继续往下传递。但是在此次更改之后，用户只需要将<code>$attrs</code> 传递给<code>v-bind</code>即可）</p><h3 id="上下文无关的vnode" tabindex="-1"><a class="header-anchor" href="#上下文无关的vnode" aria-hidden="true">#</a> 上下文无关的VNode</h3><p>使用上下文无关的VNode，我们不再需要字符串ID（例如：<code>h(&#39;some-component&#39;)</code>）在全局注册的组件中隐式的搜索。跟搜索指令类似。相反，我们需要使用导出的API：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>h<span class="token punctuation">,</span> resolveComponent<span class="token punctuation">,</span> resolveDirective<span class="token punctuation">,</span> withDirectives<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> comp <span class="token operator">=</span> <span class="token function">resolveComponent</span><span class="token punctuation">(</span><span class="token string">&#39;some-global-comp&#39;</span><span class="token punctuation">)</span>
        <span class="token keyword">const</span> fooDir <span class="token operator">=</span> <span class="token function">resolveDirective</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span>
        <span class="token keyword">const</span> barDir <span class="token operator">=</span> <span class="token function">resolveDirective</span><span class="token punctuation">(</span><span class="token string">&#39;bar&#39;</span><span class="token punctuation">)</span>

        <span class="token comment">// &lt;some-global-comp v-foo=&quot;x&quot; v-bar=&quot;y&quot; /&gt;</span>
        <span class="token keyword">return</span> <span class="token function">withDirectives</span><span class="token punctuation">(</span>
            <span class="token function">h</span><span class="token punctuation">(</span>comp<span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token punctuation">[</span>fooDir<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>x<span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token punctuation">[</span>barDir<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>y<span class="token punctuation">]</span>
        <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将主要用于编译产物，因为手写render函数可以直接使用导出组件和指令的值。</p><h2 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点" aria-hidden="true">#</a> 缺点</h2><h3 id="依赖vue核心库" tabindex="-1"><a class="header-anchor" href="#依赖vue核心库" aria-hidden="true">#</a> 依赖Vue核心库</h3><p><code>h</code>需要全局导出使用意味着任何包含了Vue组件的库都必须包含<code>import { h } from &#39;vue&#39;</code>( 也会在template的编译产物render函数中隐式的包含)。这会造成一些负担，因为这要求库作者需要合理的配置来在产物中拆分Vue：</p><ul><li>Vue不应该被打包进库中；</li><li>对于ES模块构建，应该保留导出的API并最终交给打包器处理；</li><li>对于UMD/browser构建，应该先尝试<code>Vue.h</code>然后再降级<code>require</code>处理。</li></ul><p>这是React的常见做法，而且也可能存在webpack、rollup中。一些Vue的库也是如此做的。我们仅需要提供合适的文档以及工具支持。</p><h2 id="可选的方案" tabindex="-1"><a class="header-anchor" href="#可选的方案" aria-hidden="true">#</a> 可选的方案</h2><p>N/A</p><h2 id="采取的策略" tabindex="-1"><a class="header-anchor" href="#采取的策略" aria-hidden="true">#</a> 采取的策略</h2><ul><li>对于使用template的用户，这并不会对他们造成影响。</li><li>对于使用JSX的用户影响也很小，但是我们需要重写JSX插件。</li><li>对于直接手写render函数的用户，更改为<code>h</code>将会是主要迁移成本。应该只会有很小的一部分用户，但是我们也要提供合适的迁移途径。 <ul><li>尽可能提供一个兼容插件为render函数打补丁来暴露出在2.x版本兼容的参数，并且提供支持逐个迁移render函数的兼容模式。</li><li>尽可能提供自动覆盖调用新VNode数据格式的<code>h</code>的模版代码，因为这个过程是重复机械的。</li></ul></li><li>使用上下文的函数式组件用户，可能需要手动迁移，但是会提供类似的适配器。</li></ul><h2 id="没有解决的问题" tabindex="-1"><a class="header-anchor" href="#没有解决的问题" aria-hidden="true">#</a> 没有解决的问题</h2><p>使用扁平的VNode数据结构，每个属性的处理方式变得更加隐蔽。这也会造成一些小问题 - 例如，如何显式设置一个不存在的DOM属性，或者如何在自定义元素上监听一个首字母大写的事件？</p><p>我们可能需要通过前缀来支持显式的绑定：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&#39;attr:id&#39;</span><span class="token operator">:</span> <span class="token string">&#39;foo&#39;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;prop:__someCustomProperty__&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">/*... */</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;on:SomeEvent&#39;</span><span class="token operator">:</span> <span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这相当于2.x处理attrs、domProps的方式进行嵌套。但是，这需要我们对每个属性执行额外的检查，导致为了非常小众的用例而产生一定的性能成本。我们可能需要寻找一个更合适的方法来处理这个问题。</p><p>译者注：</p><p>第二个没有解决的问题示例：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// v2.x</span>
<span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">on</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">click</span><span class="token operator">:</span> foo<span class="token punctuation">,</span>
    <span class="token literal-property property">Click</span><span class="token operator">:</span> bar
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// 但是在v3中无法区分</span>
<span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">onClick</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,42);function g(y,f){const e=o("ExternalLinkIcon");return c(),i("div",null,[r,s("p",null,[n("这个结构继承自"),s("a",u,[n("Snabbdom"),p(e)]),n(" ，Vue2.x中的虚拟DOM实现原理是便是基于此。这样设计的原因是模块化复杂的diff逻辑：一个单独的模块（例如"),d,n("模块）处理"),k,n(" 属性。处理每个绑定的逻辑也更加明确。")]),v,s("p",null,[n("更多的"),m,n("原理，见"),s("a",b,[n("组合式API RFC"),p(e)])]),h])}const x=t(l,[["render",g],["__file","0008-render-function-api-change.html.vue"]]);export{x as default};
