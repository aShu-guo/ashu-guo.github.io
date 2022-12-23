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
