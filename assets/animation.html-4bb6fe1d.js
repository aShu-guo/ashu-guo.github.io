import{_ as a,o as i,c as n,b as e}from"./app-a46f6870.js";const t={},o=e('<h1 id="动画-animation" tabindex="-1"><a class="header-anchor" href="#动画-animation" aria-hidden="true">#</a> 动画 - animation</h1><p>animation可以使一个元素从一个样式慢慢变化为另外一个样式</p><p>你想使用多少个过渡样式就可以使用多少个</p><p>在使用animation时需要事先定义一些keyframe</p><p>keyframe控制元素在确切时间下要展示的样式</p><h2 id="keyframes、animation-name、animation-duration" tabindex="-1"><a class="header-anchor" href="#keyframes、animation-name、animation-duration" aria-hidden="true">#</a> @keyframes、animation-name、animation-duration</h2><p>只有在绑定到元素上时才有效果（通过animation-name指定）</p><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>animation-duration有值而且大于0时才有效果，因为默认值为0</p></div><h2 id="animation-delay" tabindex="-1"><a class="header-anchor" href="#animation-delay" aria-hidden="true">#</a> animation-delay</h2><p>指定动画延迟多久开始执行，允许负值。当值为负值n时，会从运行了n秒后的位置开始运行</p><h2 id="animation-iteration-count" tabindex="-1"><a class="header-anchor" href="#animation-iteration-count" aria-hidden="true">#</a> animation-iteration-count</h2><p>指定动画运行多少次后停止，也可以设置为<code>infinite</code>，那么动画会无限运行不会停止</p><h2 id="animation-direction" tabindex="-1"><a class="header-anchor" href="#animation-direction" aria-hidden="true">#</a> animation-direction</h2><p>控制动画的执行方向</p><ul><li>normal: 动画正序执行，默认值</li><li>reverse - 动画倒序执行</li><li>alternate - 动画按照次数交替执行，首先正序执行，而后倒序执行</li><li>alternate-reverse - 动画按照次数交替执行，首先倒序执行，而后正序执行</li></ul><h2 id="animation-timing-function" tabindex="-1"><a class="header-anchor" href="#animation-timing-function" aria-hidden="true">#</a> animation-timing-function</h2><p>控制动画执行速度，可设置的值同transition属性transition-timing-function</p><h2 id="animation-fill-mode" tabindex="-1"><a class="header-anchor" href="#animation-fill-mode" aria-hidden="true">#</a> animation-fill-mode</h2><p>在动画的第一帧之前和最后一帧之后，动画并不会影响元素样式。但是这个属性可以覆盖上述行为</p><ul><li>none - 默认值，默认行为</li><li>forwards - 保留最后一帧的样式，依赖<code>animation-direction</code>、<code>animation-iteration-count</code></li><li>backwards - 保留第一帧的样式，依赖<code>animation-direction</code></li><li>both - 动画将遵循<code>forwards</code>和<code>backwards</code>的规则，从而在两个方向上扩展动画属性。</li></ul>',20),r=[o];function d(c,m){return i(),n("div",null,r)}const h=a(t,[["render",d],["__file","animation.html.vue"]]);export{h as default};
