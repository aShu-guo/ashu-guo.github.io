import{_ as e,o as p,c as o,b as t}from"./app-a46f6870.js";const s={},r=t("<p>一、干什么用的</p><p>异步的一种解决方案，为了解决回调地狱而出现的，包含三种状态：pending、fulfilled、reject，状态一旦发生改变就不会再变，而且promise对象的状态不受外界影响。</p><p>二、怎么用的</p><p>可以通过new新建一个promise对象，传入promise对象中的函数会立即执行</p><p>1.new promise() 中的代码是同步代码，then是典型的微任务</p><p>2.传入resolve方法中参数，会到then方法中的函数</p><p>三、怎么实现的</p><p>四、有哪些优缺点</p><p>五、缺点有哪些优化方式</p><p>六、有没有产出</p>",10),n=[r];function c(i,_){return p(),o("div",null,n)}const m=e(s,[["render",c],["__file","promise.html.vue"]]);export{m as default};