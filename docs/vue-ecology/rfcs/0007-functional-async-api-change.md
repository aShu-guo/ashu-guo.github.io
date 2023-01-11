# 0007-异步函数式API变更

## 概要

- 函数式组件必须写成纯函数形式
    - 移除`{ functional: true }`选项
    - 不再支持`<template functional>`
- 异步函数式组件必须通过指定的API创建

## 基本示例

```js
import {h} from 'vue'

const FunctionalComp = props => {
    return h('div', `Hello! ${props.name}`)
}
```

```js
import {defineAsyncComponent} from 'vue'

const AsyncComp = defineAsyncComponent(() => import('./Foo.vue'))
```

## 动机

### 简化函数式组件

在2.x中，函数式组件必须通过以下格式创建：

```js
const FunctionalComp = {
    functional: true,
    render(h) {
        return h('div', `Hello! ${props.name}`)
    }
}
```

这会有以下问题：

- 当组件不需要任何选项，仅需要render函数时，也必须传递`functional: true`
- 一些选项支持（`props`和`inject`），但是另外一些不支持（`components`
  ）。但是，用户经常认为所有的选项都会支持，因为目前的函数式组件看起来像普通有状态的组件（尤其是当他们在SFC中使用`<template functional>`
  时）

另外一方面的原因是，我们注意到用户使用函数式组件关是因为它的性能。例如：在SFC中使用`<template functional>`
时，请求在组件中支持更多有状态的选项。但是，我并不认为这是我们需要花时间研究的事情。

在v3中，有状态组件和无状态组件之间的性能差异将会变得更小，而且在一些用例中没有任何差别。因此，不再有仅仅为了性能而使用函数式组件的强烈动机，这也证明支持 <template functional>
的维护成本是不合理的。在v3中的函数式组件应该出于使用简单的目的去使用，而不是性能。

## 详细设计

在3.x中，我们有意仅仅通过纯函数支持函数式组件：

```js
import {h} from 'vue'

const FunctionalComp = (props, {slots, attrs, emit}) => {
    return h('div', `Hello! ${props.name}`)
}
```

- 移除`functional`选项，不再支持对象格式的`{ functional: true }`。
- SFCs不再支持`<template functional>`-如果你想要使用任何东西而不单是一个函数，那么请使用普通组件。
- 函数入参发生改变：
    - `h`现在通过全局导出
    - 函数接收两个参数：`props`和一个暴露出`slots`, `attrs`和`emit`属性的上下文对象。等价于有状态组件中的带`$`属性的等价物。
