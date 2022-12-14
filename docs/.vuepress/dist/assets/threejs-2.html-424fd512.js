import{_ as n,p as s,q as a,a1 as p}from"./framework-1443a5b1.js";const e={},t=p(`<blockquote><h3 id="数学基础知识" tabindex="-1"><a class="header-anchor" href="#数学基础知识" aria-hidden="true">#</a> 数学基础知识</h3></blockquote><hr><blockquote><h4 id="向量-vector" tabindex="-1"><a class="header-anchor" href="#向量-vector" aria-hidden="true">#</a> 向量 vector</h4></blockquote><hr><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>向量：既有方向，又有大小；从起点指向终点  n维向量可通过 n<span class="token operator">*</span><span class="token number">1</span> 矩阵表示。（在图形学中向量默认为列向量）
标量：只有大小，没有方向；
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>1.运算： **加：**平行四边形法则、三角形法则；(1,2)+(3,4)=(3,6)</p><p>​ <strong>减：</strong>(1,2)-(3,4)=(1,2)+(-3,-4)=(-2,-2)</p><p>​ **点积（点乘、数量积）：**两向量点乘返回的是一个标量（两向量长度与夹角的余弦），可以快速得到两向量之间的夹角</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>可知道两向量方向性
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>​ (1,2)·(3,4)=1<em>3+2</em>4=11</p><p>​ 满足交换律、结合律、分配律</p><p>​ 二维向量：(a,b)· (c,d)=a<em>c +b</em>d 可以扩展到高维</p><p>​ **投影：**投影向量a到向量b上，长度为a向量长度与夹角余弦的乘积</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>可用于向量分解
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>​ **叉乘：**返回的是一个新的向量，新向量的方向垂直于原来两个向量所在的平面 &#39;推导&#39;。叉乘的长度是平行四边形的面积</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>符合右手螺旋定则，但不符合交换律
<span class="token function">判定两向量的左右和内外</span><span class="token punctuation">(</span>判断某点在模型内部还是外部<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>​ **相等：**方向和大小相等</p><p>​ **模（长度）：**向量的长度</p><p>​ **单位向量：**长度为1的向量；坐标➗向量长度；可以只表示方向</p><p>​ **归一化：**将向量转换为长度为1的单位向量</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> vector1<span class="token operator">=</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> vector2<span class="token operator">=</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span>
<span class="token string">&#39;加&#39;</span>
<span class="token keyword">let</span> add<span class="token operator">=</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> vector1<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  add<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>vector1<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">+</span>vector2<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>add<span class="token punctuation">)</span>

<span class="token string">&#39;点乘&#39;</span>
<span class="token keyword">let</span> pointMulti<span class="token operator">=</span><span class="token number">0</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> vector1<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  pointMulti<span class="token operator">+=</span>vector1<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">*</span>vector2<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>pointMulti<span class="token punctuation">)</span>

<span class="token string">&#39;模&#39;</span>
<span class="token keyword">let</span> vector1Length<span class="token operator">=</span>
    Math<span class="token punctuation">.</span><span class="token function">sqrt</span><span class="token punctuation">(</span>vector1<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">total<span class="token punctuation">,</span>currentValue</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span>total<span class="token operator">+=</span>Math<span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span>currentValue<span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token template-punctuation string">\`</span></span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
点乘=两向量模*夹角的余弦
</span><span class="token template-punctuation string">\`</span></span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token template-punctuation string">\`</span></span>
<span class="token string">&#39;归一化&#39;</span>
<span class="token keyword">let</span> normalizVector1<span class="token operator">=</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
vector1<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>normalizVector1<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>item<span class="token operator">/</span>vector1Length<span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h4 id="矩阵" tabindex="-1"><a class="header-anchor" href="#矩阵" aria-hidden="true">#</a> 矩阵</h4></blockquote><hr><p>1.运算：</p><p>​ 加：两个相加的矩阵必须都是m*n（同型），对应行列元素相加即可</p><p>​ 减：两个相加的矩阵必须都是m*n（同型），对应行列元素相减即可</p><p>​ 乘：必须保证一个矩阵的列数为n，另外一个矩阵行数为n，m*n矩阵 * n*o矩阵 = m*o矩阵</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>x11<span class="token punctuation">,</span>x12<span class="token punctuation">,</span>x13 y11<span class="token punctuation">,</span>y12   x11<span class="token operator">*</span>y11<span class="token operator">+</span>x12<span class="token operator">*</span>y21<span class="token operator">+</span>x13<span class="token operator">*</span>y31<span class="token punctuation">,</span>x11<span class="token operator">*</span>y12<span class="token operator">+</span>x12<span class="token operator">*</span>y22<span class="token operator">+</span>x13<span class="token operator">*</span>y32
x21<span class="token punctuation">,</span>x22<span class="token punctuation">,</span>x23 y21<span class="token punctuation">,</span>y22 <span class="token operator">=</span> x21<span class="token operator">*</span>y11<span class="token operator">+</span>x22<span class="token operator">*</span>y21<span class="token operator">+</span>x23<span class="token operator">*</span>y31<span class="token punctuation">,</span>x21<span class="token operator">*</span>y12<span class="token operator">+</span>x22<span class="token operator">*</span>y22<span class="token operator">+</span>x23<span class="token operator">*</span>y32
						y31<span class="token punctuation">,</span>y32
<span class="token string">&#39;输出矩阵x,y处的值  对应输入第一个矩阵x行的值与第二个矩阵y列的值相乘&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​ 左乘：A*B=C 称C为A左乘B的矩阵</p><p>​ 矩阵与向量相乘：其实是矩阵与一阶矩阵相乘，本质是向量转换</p><p>​ 矩阵与标量相乘：矩阵中每个值✖️标量</p><p>​ 行列式</p><p>2.特殊矩阵：</p><p>​ 旋转矩阵：在乘以一个向量的时候改变向量的方向但不改变大小的效果并保持了手性的矩阵</p><p>​ 单位矩阵：从左上角到右下角对角线元素均为1的方阵</p><p>​ 转置矩阵：矩阵的行向量转换为列向量</p><p>​ 逆矩阵：A*B=B*A=I，I是单位矩阵，A是可逆矩阵，B是A的逆矩阵</p><pre><code> 变换矩阵：将一个向量通过矩阵乘法，变换为另一个矩阵时，这个矩阵称为变换矩阵
</code></pre><p>​ 正交矩阵：一个矩阵左乘他的转置矩阵为单位矩阵时，这个矩阵称为正交矩阵；</p><p>​ 如果一个矩阵是正交矩阵，那么转置矩阵等于逆矩阵</p><p>3.行优先、列优先</p><p>​ 参数的排列顺序</p><blockquote><h4 id="左手坐标系、右手坐标系" tabindex="-1"><a class="header-anchor" href="#左手坐标系、右手坐标系" aria-hidden="true">#</a> 左手坐标系、右手坐标系</h4></blockquote><hr><p>左手坐标系：大拇指朝右，食指朝上，其余手指朝前 判断规则：如果其余手指指向的是z轴方向，则为左手坐标系，反之为右手坐标系</p><blockquote><h4 id="坐标系" tabindex="-1"><a class="header-anchor" href="#坐标系" aria-hidden="true">#</a> 坐标系</h4></blockquote><hr><p>屏幕坐标系：x轴正方向朝右，y轴正方向朝下 齐次坐标系：用N+1维向量表示N维向量和N维坐标？</p><p>笛卡尔坐标转换为齐次坐标 (1,2)-&gt;(1,2,1) (1,2)-&gt;(1,2,0) 齐次坐标系下无穷远处的坐标 齐次坐标转换为笛卡尔坐标 (1,2,2)-&gt;(1/2,2/2)</p><p>1.模型坐标系--遵循右手坐标系，原点位置在模型中心 THREE.AxesHelper 2.世界坐标系--遵循右手坐标系，默认情况下世界坐标系与模型坐标系重合 3.观察坐标系--人眼或摄像机看到世界中的物体所在位置，原点是人眼或者相机，z轴是人眼或者相机垂直射出的一条线 4.裁剪坐标系--遵循左手坐标系，将观察坐标通过透视投影变换后得到的坐标，也即是gl_Position接收的坐标 5.NDC坐标系--遵循左手坐标系，坐标在[-1,1]之间 6.屏幕坐标系--视口变换，将[-1,1]之间的坐标映射到屏幕空间上</p><p>深度检测可以消除绘制顺序的影响，使图形根据z轴距离展示</p><p>![image-20220210115530235](/Users/ifugle/Library/Application Support/typora-user-images/image-20220210115530235.png)</p><blockquote><h4 id="空间" tabindex="-1"><a class="header-anchor" href="#空间" aria-hidden="true">#</a> 空间</h4></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token number">1.</span>欧式空间：中学学到的平面几何、立体几何，两平行线之间的距离相等
<span class="token number">2.</span>透视空间：两平行线会相交

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,54),o=[t];function c(l,i){return s(),a("div",null,o)}const u=n(e,[["render",c],["__file","threejs-2.html.vue"]]);export{u as default};
