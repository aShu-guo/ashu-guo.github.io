# 0003 动态自定义指令参数

## 概要

支持自定义指令动态参数

## 基本示例

```html

<div v-bind:[key]="value"></div>
<div v-on:[event]="handler"></div>
```

## 动机

由于当前指令参数是静态的，用户只能通过绑定对象到无参数指令上来实现动态参数：

```html

<div v-bind="{ [key]: value }"></div>
<div v-on="{ [event]: handler }"></div>
```

然而，这回造成一些问题：

- 依赖基于对象的`v-on/v-bind`语法以及js中计算属性的存在，一些用户并不知晓这种用法
- 生成了低性能代码：在同一个html元素上存储了一个ad-hoc对象并且绑定了一些其他静态参数，那么将会把动态指令参数合并到静态参数中，生成的render函数大概如下：

```js
return h('div', {
    on: Object.assign({
        click: onClick
    }, {
        [event]: handler
    })
})
```

其实我们可以直接生成，而并不需要合并

```js
return h('div', {
    on: {
        click: onClick,
        [event]: handler
    }
})
```

此外，`v-slot`并不支持相同的对象参数语法，因为这个位置被传入作用域插槽的变量占用了。因此没有动态参数，`v-slot`
比并不支持动态插槽名。尽管这可能是一个非常罕见的用例，但是由于这个限制，需要重写一整个template到render函数是痛苦的。（笔者注：暂时没有想到合适的使用场景）

## 详细设计

```html
<!-- v-bind with dynamic key -->
<div v-bind:[key]="value"></div>

<!-- v-bind shorthand with dynamic key -->
<div :[key]="value"></div>

<!-- v-on with dynamic event -->
<div v-on:[event]="handler"></div>

<!-- v-on shorthand with dynamic event -->
<div @[event]="handler"></div>

<!-- v-slot with dynamic name -->
<foo>
    <template v-slot:[name]>
        Hello
    </template>
</foo>

<!-- v-slot shorthand with dynamic name -->
<!-- pending #3 -->
<foo>
    <template #[name]>
        Default slot
    </template>
</foo>
```

### `null`作为特殊值处理

动态参数期望是字符串类型。然而，如果我们允许`null`作为一个特殊值指示这个绑定应该移除将会是便利的。其他非字符串类型的值可能是错误的，并且将会抛出异常。

对于`v-bind`和`v-on`而言，`null`是一个特殊值，但是对于`v-slot`不是。原因是`v-slot`
并不是绑定语法而且并不能移除。自定义指令可以自行决定如何处理非字符串类型的参数，但是确实发生时需要遵守规范。


