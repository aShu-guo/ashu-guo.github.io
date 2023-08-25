import{_ as p,r as t,o as e,c as o,a as l,d as c,e as i,b as n}from"./app-a46f6870.js";const r={},u=n(`<blockquote><h3 id="api上的模糊点" tabindex="-1"><a class="header-anchor" href="#api上的模糊点" aria-hidden="true">#</a> API上的模糊点</h3></blockquote><p>1.Vue.extend</p><p>用来新建一个组件构造器</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//首先通过新建一个组件构造器</span>
<span class="token keyword">var</span> Profile <span class="token operator">=</span> Vue<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;&lt;p&gt;{{extendData}}实F例传入的数据为:{{propsExtend}}&lt;/p&gt;&#39;</span><span class="token punctuation">,</span> <span class="token comment">// template对应的标签最外层必须只有一个标签</span>
  <span class="token function-variable function">data</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">extendData</span><span class="token operator">:</span> <span class="token string">&#39;这是extend扩展的数据&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;propsExtend&#39;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">//通过实例中的components获取Vue.component()局部注册或者全局注册</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.extends</p><p>拓展组件的功能</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//新建一个对象</span>
<span class="token keyword">var</span> extendObj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">clickHandle</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&#39;this is clickHandle&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//通过extends拓展组件功能</span>
<span class="token keyword">export</span> <span class="token keyword">default</span><span class="token punctuation">{</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> extendObj
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.Vue.filter与filters</p><p>与watch的区别：</p><p>filter是在入值时会对值做一些格式化处理</p><p>watch是在值发生改变的时候，添加一些业务逻辑处理</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//全局注册 or 局部注册</span>
Vue<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token string">&#39;myFilter&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&#39;&#39;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> value<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">//从全局注册的filter中取出自定义filter</span>
<span class="token keyword">var</span> myFilter <span class="token operator">=</span> Vue<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token string">&#39;myFilter&#39;</span><span class="token punctuation">)</span>
<span class="token comment">//局部注册</span>
<span class="token keyword">export</span> <span class="token keyword">default</span><span class="token punctuation">{</span>
  <span class="token literal-property property">filters</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">capitalize</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&#39;&#39;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> value<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//在双花括号中使用</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> name <span class="token operator">|</span> capitalize<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token comment">//在v-bind中使用</span>
<span class="token operator">&lt;</span>div v<span class="token operator">-</span>bind<span class="token operator">:</span>id<span class="token operator">=</span><span class="token string">&quot;rawId | formatId&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4.调试template</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 在Vue原型上添加一个函数</span>
<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>$log <span class="token operator">=</span> window<span class="token punctuation">.</span>console<span class="token punctuation">.</span>log<span class="token punctuation">;</span>

<span class="token comment">// 在template中使用</span>
<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token function">$log</span><span class="token punctuation">(</span><span class="token string">&#39;helloworld&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>

<span class="token comment">//由此可知通过Vue原型拓展api</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5.父子组件间的传值：.sync传值</p><p>如果是通过.sync传值，需要在父组件中保存一份要传属性的值，父组件会变得庞大</p><p>如果是$emit传值，那么不需要保存</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// .sync传值的实例</span>
<span class="token comment">// parent.vue</span>
<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>son <span class="token operator">:</span>name<span class="token operator">=</span><span class="token string">&quot;name&quot;</span> age<span class="token operator">=</span><span class="token string">&quot;24&quot;</span> <span class="token operator">:</span>radio1<span class="token punctuation">.</span>sync<span class="token operator">=</span><span class="token string">&quot;radio1&quot;</span><span class="token operator">&gt;</span>
      <span class="token punctuation">{</span><span class="token punctuation">{</span> radio1 <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>son<span class="token operator">&gt;</span>  
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token comment">// 会被拓展为</span>
<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
      <span class="token comment">// 如果是通过.sync，子组件传来的事件名称固定为：@update:xxx</span>
	<span class="token operator">&lt;</span>son <span class="token operator">:</span>name<span class="token operator">=</span><span class="token string">&quot;name&quot;</span> age<span class="token operator">=</span><span class="token string">&quot;24&quot;</span> <span class="token operator">:</span>radio1<span class="token string">&quot;radio1&quot;</span> @update<span class="token operator">:</span>radio1<span class="token operator">=</span><span class="token string">&quot;val =&gt; radio1 = val&quot;</span><span class="token operator">&gt;</span>
      <span class="token punctuation">{</span><span class="token punctuation">{</span> radio1 <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>son<span class="token operator">&gt;</span>  
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>


<span class="token comment">// son.vue</span>
<span class="token operator">&lt;</span>el<span class="token operator">-</span>radio<span class="token operator">-</span>group v<span class="token operator">-</span>model<span class="token operator">=</span><span class="token string">&quot;radio&quot;</span> @change<span class="token operator">=</span><span class="token string">&quot;handleClick&quot;</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>el<span class="token operator">-</span>radio<span class="token operator">-</span>button label<span class="token operator">=</span><span class="token string">&quot;上海&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>el<span class="token operator">-</span>radio<span class="token operator">-</span>button<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>el<span class="token operator">-</span>radio<span class="token operator">-</span>button label<span class="token operator">=</span><span class="token string">&quot;北京&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>el<span class="token operator">-</span>radio<span class="token operator">-</span>button<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>el<span class="token operator">-</span>radio<span class="token operator">-</span>button label<span class="token operator">=</span><span class="token string">&quot;广州&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>el<span class="token operator">-</span>radio<span class="token operator">-</span>button<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>el<span class="token operator">-</span>radio<span class="token operator">-</span>button label<span class="token operator">=</span><span class="token string">&quot;深圳&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>el<span class="token operator">-</span>radio<span class="token operator">-</span>button<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>el<span class="token operator">-</span>radio<span class="token operator">-</span>group<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>slot<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>slot<span class="token operator">&gt;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">radio1</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token comment">// 给radio默认值</span>
      <span class="token literal-property property">radio</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>radio1
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 监听radio的改变修改值，不要修改父组件传来的值</span>
    <span class="token function">radio</span> <span class="token punctuation">(</span><span class="token parameter">newVal<span class="token punctuation">,</span> oldVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>radio <span class="token operator">=</span> newVal
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>radio<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">handleClick</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">&#39;update:radio1&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>radio<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>6.v-for与v-if的同时使用</p><p>比起在模板层面管理相关逻辑，更好的办法是通过创建计算属性筛选出列表，并以此创建可见元素。</p><p>7.$on，$once可以监听所有生命周期函数</p><p>this.$on(&#39;hook:destoryed&#39;,function(){})</p>`,22),k=n(`<p>8.watch</p><p>使用场景：一个属性依赖其他属性改变，并且需要做一些业务逻辑处理</p><p>监视对象中的一个属性时，可以通过deep属性，但是这样性能较差，会监视对象中的所有属性；</p><p>提供三种方案选择</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 场景：监视对象escortPageDto的pageNo属性</span>
<span class="token comment">// 方案一</span>
<span class="token literal-property property">watch</span><span class="token operator">:</span><span class="token punctuation">{</span>
  <span class="token literal-property property">escortPageDto</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token function">handler</span><span class="token punctuation">(</span><span class="token parameter">val<span class="token punctuation">,</span>oldVal</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">deep</span><span class="token operator">:</span><span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 方案二</span>
<span class="token literal-property property">watch</span><span class="token operator">:</span><span class="token punctuation">{</span>
  <span class="token string-property property">&#39;escortPageDto.pageNo&#39;</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token function">handler</span><span class="token punctuation">(</span><span class="token parameter">val<span class="token punctuation">,</span>oldVal</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 方案三</span>
<span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token function">pageNoCompute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>escortPageDto<span class="token punctuation">.</span>pageNo
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token function">pageNoCompute</span><span class="token punctuation">(</span><span class="token parameter">val<span class="token punctuation">,</span> oldVal</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>9.事件委托</p><p>适用于v-for，将item的事件委托为外部容器；</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>(v,i) of list<span class="token punctuation">&#39;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>i<span class="token punctuation">&#39;</span></span> <span class="token attr-name">:data-index</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>i<span class="token punctuation">&#39;</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>clickHandler<span class="token punctuation">&#39;</span></span><span class="token punctuation">&gt;</span></span>
  		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
        {{v}}
 			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">list</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span><span class="token literal-property property">id</span><span class="token operator">:</span><span class="token number">10001</span><span class="token punctuation">,</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;xiaoming&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span><span class="token literal-property property">id</span><span class="token operator">:</span><span class="token number">10002</span><span class="token punctuation">,</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;huangxiaoming&#39;</span><span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token function">clickHandler</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">let</span> index<span class="token operator">=</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>dataset<span class="token punctuation">.</span>index
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>10.scoped</p><p>在style中不加scoped时，当不打开当前单页面组件A时并不会影响全局样式，但是如果打开之后再便会污染全局样式</p><p>11.created mounted</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token literal-property property">mounted</span><span class="token operator">:</span> dom已经渲染好？

<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
等dom加载完毕之后，再执行某个方法：利用setTimeout<span class="token string">&#39;宏任务&#39;</span>的执行顺序
效果等同于<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$nextTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">??</span><span class="token operator">?</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h3 id="使用vue的时候-你遇到了什么问题" tabindex="-1"><a class="header-anchor" href="#使用vue的时候-你遇到了什么问题" aria-hidden="true">#</a> 使用Vue的时候，你遇到了什么问题？</h3></blockquote><p>1.服务端为了防止xss攻击，开启了CSP限制script加载源默认为本地加载，而vue.js 是通过cdn引入，导致vue项目无法正常运行</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>Content<span class="token operator">-</span>Security<span class="token operator">-</span>Policy<span class="token operator">:</span> 指令<span class="token number">1</span> 指令<span class="token number">1</span>的值<span class="token number">1</span> 指令<span class="token number">1</span>的值<span class="token number">2</span> 指令<span class="token number">1</span>的值<span class="token number">3</span><span class="token punctuation">;</span> 指令<span class="token number">2</span> 指令<span class="token number">2</span>的值<span class="token number">1</span> 指令<span class="token number">2</span>的值<span class="token number">2</span>

<span class="token literal-property property">ex</span><span class="token operator">:</span>
<span class="token comment">// host 精确匹配、通配符匹配</span>
Content<span class="token operator">-</span>Security<span class="token operator">-</span>Policy<span class="token operator">:</span> script<span class="token operator">-</span>src <span class="token string">&#39;unsafe-inline&#39;</span> www<span class="token punctuation">.</span>baidu<span class="token punctuation">.</span>com<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决方案：</p><p>服务端上线CSP策略没有事先通过report-uri报告资源加载失败，导致前端项目无法正常使用；</p><p>1.规范化流程，上线策略之前先通过report-uri观察资源加载失败的情况</p><p>2.逐步开放资源加载失败的url</p>`,19);function d(s,v){const a=t("customer-select");return e(),o("div",null,[u,l("p",null,[c("也可以监听子组件的生命周期函数："),i(a,{"onHook:updated":s.dataUpdatedHandler},null,8,["onHook:updated"])]),k])}const b=p(r,[["render",d],["__file","一些模糊点.html.vue"]]);export{b as default};
