import{_ as a,p as n,q as s,a1 as e}from"./framework-1443a5b1.js";const t={},r=e(`<blockquote><h3 id="threejs常见概念" tabindex="-1"><a class="header-anchor" href="#threejs常见概念" aria-hidden="true">#</a> threejs常见概念</h3></blockquote><blockquote><h4 id="名词" tabindex="-1"><a class="header-anchor" href="#名词" aria-hidden="true">#</a> 名词</h4></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token number">1.</span>透视相机（人眼相机，远小近大） 正投影相机（适用于工程、建筑图纸，远近相同）
	视角变小，物体变大；投影在近平面上的图形即是屏幕上的图形
  
<span class="token number">2.</span>四个主要的概念
	scene：场景
  camera：perspectiveCamera<span class="token operator">--</span>透视相机、orthographicCamera<span class="token operator">--</span>正交投影相机
  renderer：渲染器
  mesh：网格
  	geometry：几何结构
    material：材质 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h4 id="常见camera-观察坐标系-0-0-0-表示相机位置-z轴指向屏幕内" tabindex="-1"><a class="header-anchor" href="#常见camera-观察坐标系-0-0-0-表示相机位置-z轴指向屏幕内" aria-hidden="true">#</a> 常见camera--观察坐标系 (0,0,0)表示相机位置；z轴指向屏幕内</h4></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>正投影相机（orthographicCamera）：平行光照射物体；远近大小相同；<span class="token string">&#39;视景体&#39;</span>
<span class="token keyword">const</span> camera <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THTEE<span class="token punctuation">.</span>OrthographicCamera</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span>right<span class="token punctuation">,</span>top<span class="token punctuation">,</span>bottom<span class="token punctuation">,</span>near<span class="token punctuation">,</span>far<span class="token punctuation">)</span>

透视投影相机（perspectiveCamera）：从一点照射物体；远小近大；只能看到视椎体内物体。<span class="token string">&#39;视锥体&#39;</span>
<span class="token keyword">const</span> camera <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>PerspectiveCamera</span><span class="token punctuation">(</span><span class="token number">45</span><span class="token punctuation">,</span> width <span class="token operator">/</span> height<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
fov<span class="token operator">--</span>视角：视角越大，场景越大，物体相对于整个场景更小
near<span class="token operator">--</span>相机位置到近平面的垂直距离

up：垂直于快门的方向（默认y轴正方向） 方向与数值的大小无关？？？
	camera<span class="token punctuation">.</span>up<span class="token punctuation">.</span>x<span class="token operator">=</span><span class="token number">0</span>
	camera<span class="token punctuation">.</span>up<span class="token punctuation">.</span>y<span class="token operator">=</span><span class="token number">1</span>
	camera<span class="token punctuation">.</span>up<span class="token punctuation">.</span>z<span class="token operator">=</span><span class="token number">0</span>

lookAt：镜头射出一条线指向的位置（默认z轴负方向）
<span class="token string">&#39;up方向必须与lookAt方向垂直&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h4 id="常用material-材质-材料和质感的结合" tabindex="-1"><a class="header-anchor" href="#常用material-材质-材料和质感的结合" aria-hidden="true">#</a> 常用material--材质（材料和质感的结合）</h4></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token literal-property property">MeshNormalMaterial</span><span class="token operator">:</span>
<span class="token literal-property property">PointsMaterial</span><span class="token operator">:</span>
<span class="token literal-property property">LineBasiceMaterial</span><span class="token operator">:</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h4 id="常用geometry" tabindex="-1"><a class="header-anchor" href="#常用geometry" aria-hidden="true">#</a> 常用geometry</h4></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token literal-property property">BoxGeometry</span><span class="token operator">:</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><h4 id="常用mesh" tabindex="-1"><a class="header-anchor" href="#常用mesh" aria-hidden="true">#</a> 常用mesh</h4></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token literal-property property">BoxGeometry</span><span class="token operator">:</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,11),i=[r];function l(p,c){return n(),s("div",null,i)}const d=a(t,[["render",l],["__file","threejs-1.html.vue"]]);export{d as default};
