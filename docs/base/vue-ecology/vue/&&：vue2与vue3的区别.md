## vue2与vue3的区别

1.v-bind的合并行为

Vue2：如果使用v-bind指令时同时绑定了一个相同属性名的property，那么后者会覆盖前者而且与顺序无关

Vue3：与绑定顺序有关，后面的会覆盖前面的

```html
//vue2
<div class="textWrap" v-bind="{'class': !isMe}"></div>
//最终效果
<div class="textWrap"/>
//但是如果v-bind传入的参数则不会覆盖
<div class="textWrap" :class="{'left':true, 'right':false}"
  
//vue3
<div class="textWrap" v-bind="{'class': 'red'}"></div>
//最终效果
<div class="red"/>


```

2.组合式api



3.生命周期的名称发生改变

beforeDestory -> beforeUnmount

Destoryed -> unmounted





> #### 响应式原理

```js
vue2


vue3

```

