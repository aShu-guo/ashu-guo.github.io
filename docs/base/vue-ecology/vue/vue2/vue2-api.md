> #### $listener & $attrs

```js
1.使用场景，存在这样一个逻辑：爷组件-父组件-子组件
从爷组件中传递props到子组件，爷组件监听子组件事件

2.父组件可以通过$attrs传递非父组件中声明的props到子组件（$attrs不包含class，style），所以'注意'不要声明与子组件中重名的props
父组件可以通过$listener传递非native事件到子组件

3.demo
<ElBtnWrapper type="ghost" size="large" class="name"  @click="demoHandler"></ElBtnWrapper>

```



> #### 使用场景

```js
1.爷组件希望传递props到子组件，爷组件希望监听子组件事件
2.对组件二次封装，不希望传递多个props

如果不使用$attrs、$listener
在父组件中props接收爷组件中传入的属性，有需要在父组件中监听子组件的事件并$emit对应的事件以及参数
```



> #### 实现原理

```js
```



> #### inheritAttrs

`attrs：未定义的props以及html的属性构成的并集`

默认为true：传入attrs会绑定到template的根节点上；重名则覆盖，class、styles则合并

false：传入attrs不会绑定到template的根节点上；重名不会覆盖，class、styles则合并

**确定未定义的attrs的行为**

`但是$attrs可以突破 inheritAttrs:false 的限制，将未定义的attrs通过v-bind绑定在非根元素上 `



> #### watch

设置为立即执行时，被设置了`v-if`和`v-show`组件中的watch执行顺序不同

v-if：符合条件后重新挂载，后执行watch中的逻辑

v-show：符合条件后visible设置为可见，但是watch立执行的逻辑是在挂载父组件时便执行了
