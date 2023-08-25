import{_ as s,o as n,c as a,b as e}from"./app-a46f6870.js";const t="/imgs/computes-course/io-1.png",o={},p=e('<h1 id="i-o设备" tabindex="-1"><a class="header-anchor" href="#i-o设备" aria-hidden="true">#</a> I/O设备</h1><h2 id="练习" tabindex="-1"><a class="header-anchor" href="#练习" aria-hidden="true">#</a> 练习</h2><ol><li>某计算机系统输入/输出采用双缓冲工作方式，其工作过程如下图所示，假设磁盘块与缓冲区大小相同，每个盘块读入缓冲区的时间R为10us，缓冲区送用户区的 时间M为6us，系统对每个磁盘块数据处理时间C为2us。若用户需要将大小为10个磁盘块的Docl文件逐块从磁盘读入缓冲区，并送用户区进行处理，那么采用 双缓冲需要花费的时间为（ ）us，比使用单缓冲节约了（ ）us时间。</li></ol><p><img src="'+t+`" alt="img.png"></p><p>单缓冲区：第一块数据送入缓冲区 -&gt; 缓冲区送入用户区 -&gt; 硬盘处理数据，此时缓冲区是空的，第二块被读入缓冲区。即读入缓冲区和处理数据是并行的</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token constant">R</span> <span class="token operator">=</span> <span class="token number">10</span>
<span class="token keyword">const</span> <span class="token constant">M</span> <span class="token operator">=</span> <span class="token number">6</span>
<span class="token keyword">const</span> <span class="token constant">C</span> <span class="token operator">=</span> <span class="token number">2</span>

<span class="token comment">// 周期</span>
<span class="token keyword">const</span> cycle <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token constant">R</span><span class="token punctuation">,</span> <span class="token constant">C</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token constant">M</span>

<span class="token keyword">const</span> totalTime <span class="token operator">=</span> <span class="token constant">R</span> <span class="token operator">+</span> <span class="token constant">C</span> <span class="token operator">+</span> <span class="token constant">M</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">*</span> cycle

<span class="token comment">// output: 162us</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>双缓冲区： 第一块数据送入缓冲区 -&gt; 缓冲区送入用户区 -&gt; 硬盘处理数据 第二块数据送入缓冲区 -&gt; 缓冲区送入用户区 -&gt; 硬盘处理数据</p><p>假如磁盘的读取输入时间大于处理时间，那么可以认为磁盘是在连续处理数据</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token constant">R</span> <span class="token operator">=</span> <span class="token number">10</span>
<span class="token keyword">const</span> <span class="token constant">M</span> <span class="token operator">=</span> <span class="token number">6</span>
<span class="token keyword">const</span> <span class="token constant">C</span> <span class="token operator">=</span> <span class="token number">2</span>

<span class="token comment">// 周期</span>
<span class="token keyword">const</span> cycle <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token constant">R</span><span class="token punctuation">,</span> <span class="token constant">C</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token constant">M</span>

<span class="token keyword">const</span> totalTime <span class="token operator">=</span> <span class="token constant">R</span> <span class="token operator">+</span> <span class="token constant">C</span> <span class="token operator">+</span> <span class="token constant">M</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">*</span> cycle

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),c=[p];function l(r,i){return n(),a("div",null,c)}const d=s(o,[["render",l],["__file","io.html.vue"]]);export{d as default};