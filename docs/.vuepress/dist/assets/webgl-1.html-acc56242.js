import{_ as s,p as n,q as a,a1 as e}from"./framework-1443a5b1.js";const o={},t=e(`<p>WebGL提供一套API（Js）与GPU通信，也可以直接使用GLSL直接与GPU通信，来编写着色器程序</p><blockquote><h4 id="流水线-图形管线-or-渲染管线" tabindex="-1"><a class="header-anchor" href="#流水线-图形管线-or-渲染管线" aria-hidden="true">#</a> 流水线（图形管线 or 渲染管线）：</h4></blockquote><p>一般情况下，最初的顶点坐标是相对于<code>模型中心</code>的，不能直接传递到着色器中，我们需要对<code>顶点坐标</code>按照一系列步骤执行<code>模型转换</code>，<code>视图转换</code>，<code>投影转换</code>，转换之后的坐标才是 WebGL 可接受的坐标，即<code>裁剪空间坐标</code>。我们把最终的<code>变换矩阵</code>和<code>原始顶点坐标</code>传递给 <code>GPU</code>，GPU 的渲染管线对它们执行流水线作业。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/9/5/165a8dc3be028ca3~tplv-t2oaga2asx-watermark.awebp" alt="img"></p><blockquote><h4 id="坐标系变换" tabindex="-1"><a class="header-anchor" href="#坐标系变换" aria-hidden="true">#</a> 坐标系变换</h4></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token number">1.</span>观察坐标<span class="token operator">--</span><span class="token operator">-</span>（投影矩阵）<span class="token operator">--</span><span class="token operator">-</span><span class="token operator">&gt;</span>裁剪坐标<span class="token operator">--</span><span class="token operator">-</span>（透视除法）<span class="token operator">--</span><span class="token operator">-</span><span class="token operator">&gt;</span>设备坐标（<span class="token constant">NDC</span>坐标系）坐标范围：<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span>，<span class="token number">1</span><span class="token punctuation">]</span>
<span class="token operator">--</span><span class="token operator">-</span>视口变换<span class="token operator">--</span><span class="token operator">-</span><span class="token operator">&gt;</span>屏幕坐标

<span class="token number">2.</span>投影矩阵：
	<span class="token number">2.1</span><span class="token punctuation">.</span>正射投影矩阵 按照原貌同比例缩小，常用于建筑图纸，但不符合人眼”远大近小“
	<span class="token number">2.2</span><span class="token punctuation">.</span>透视投影矩阵
	
<span class="token number">3.</span>坐标系变换要点
计算出原坐标系的原点 <span class="token constant">O</span> 在新坐标系的坐标。（平移变换）
计算出新坐标系坐标分量的单位向量在原坐标系下的长度。（缩放变换）
计算出原坐标系的坐标分量（基向量）的方向。（旋转变换）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h4 id="深度检测" tabindex="-1"><a class="header-anchor" href="#深度检测" aria-hidden="true">#</a> 深度检测</h4></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>未开启之前：谁后绘制，谁展示在前
开启之后：z值越小，展示在前
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h4 id="在esmodule中使用import导入着色器文件" tabindex="-1"><a class="header-anchor" href="#在esmodule中使用import导入着色器文件" aria-hidden="true">#</a> 在ESModule中使用import导入着色器文件</h4></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token number">1.</span>着色器后缀
顶点着色器：<span class="token punctuation">.</span>vert
片元着色器：<span class="token punctuation">.</span>frag

<span class="token number">2.</span>使用webpack2的raw<span class="token operator">-</span>loader，导入vert文件、frag文件到ES6module中
npm install <span class="token operator">--</span>save<span class="token operator">-</span>dev raw<span class="token operator">-</span>loader

<span class="token number">3</span><span class="token punctuation">.</span>webpack配置
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.(vert|frag|geom)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token string">&#39;raw-loader&#39;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token number">4.</span>导出使用
<span class="token keyword">import</span> LightShader <span class="token keyword">from</span> <span class="token string">&#39;light.vert&#39;</span><span class="token punctuation">;</span>
<span class="token comment">// LightShader为对应的string</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),p=[t];function r(l,c){return n(),a("div",null,p)}const d=s(o,[["render",r],["__file","webgl-1.html.vue"]]);export{d as default};
