> 属性绑定 🧵 v-bind

可用于传递属性到子组件或者普通标签，简写为":"

```vue
<!-- 全写 -->
<div v-bind:class="isEdit ? 'active' : 'inactive'">

</div>
<!-- 简写 -->
<div :class="isEdit ? 'active' : 'inactive'">

</div>
```

> 事件监听 👂v-on

用于监听事件传递，简写为"@"

```vue
<!-- 简写 -->
<div v-on:click="clickHandler">编辑</div>

<!-- 简写 -->
<div @click="clickHandler">编辑</div>

```

- 事件修饰符

- native 触发原生事件（用于同名自定义事件、或者组件原生事件监听）
- stop 阻止事件捕获或者冒泡（stopPropagation）
- once 只触发一次事件回调
- capture 表示使用捕获模式触发事件回调
- prevent 阻止默认事件触发（preventDefault），但是事件仍会继续传递
- passive 可用于优化滚动性能
    - 在事先不知道网络应用程序是否会取消滚动的情况下，Chrome 需要等待此 JavaScript 完成才能滚动页面本身。超过 80% 的触摸侦听器不会取消滚动并不必要地延迟滚动最多几秒钟。这会导致页面似乎没有固定在用户手指上的大量卡顿。

> passive listener 与 active listener

passive listener:只倾听，不做回应
active listener:时刻保持警惕，并在触发时做出回应

