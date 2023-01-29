# 0013-组合式API

## 概要

介绍组合式API：一系列新增的、基于函数的API，支持可拓展组织结构的组件逻辑

## 基础用例

```vue

<template>
  <button @click="increment">
    Count is: {{ state.count }}, double is: {{ state.double }}
  </button>
</template>

<script>
import {reactive, computed} from 'vue'

export default {
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    })

    function increment() {
      state.count++
    }

    return {
      state,
      increment
    }
  }
}
</script>
```

## 动机

### 逻辑复用、代码组织

我们都喜欢Vue的简单易学以及使构建中小项目变得轻而易举。但是随着Vue被广泛使用，许多用户也使用Vue构建大型项目 -
团队多个开发者协同合作，在很长一段时间内迭代、维护的那些。这些年，我们注意到许多基于当前Vue API的项目遇到的编程模型上的局限性。问题可以归纳为两个方面：

1. 随着功能不断新增，复杂组件的代码变得难理解。尤其是当开发者阅读不是自己写的代码时。这个问题的根源是Vue现存API强制基于选项组织代码，但是在一些用例中，按逻辑关注点组织代码更有意义。
2. 对于在多个组件复用和提取逻辑，缺少简洁、成本小的机制。（更多细节在[逻辑提取和代码复用](#逻辑提取和代码复用)）

在这个RFC的提议中，提供用户在组织组件代码时更多的灵活性。在处理每个特定功能时，不再强制基于选项组织代码，现在可以基于函数组织代码。提供的APIs在不同组件中，甚至组件外提取和复用逻辑时更加直接。我们将会在[详细设计](#详细设计)
章节展示是如何实现的。

### 更好的类型推断

对于大型项目开发者，另一个常见的功能请求是更好的Typescript支持。当与集成Typescript时，到现存Vue
API带来了一些挑战，大多数是因为Vue依赖一个单独的`this`上下文来暴露属性，而且Vue组件中的`this`
与纯js使用上不一样（例如：在`methods`中声明的函数中的`this`是指向组件实例的，而不是`methods`
对象）。换句话说，Vue现存API在设计时并没有考虑到类型推断，并且为了在集成Typescript时正常工作，这也造成了很多的复杂性。

使用Vue的用户目前是通过`vue-class-component`集成Typescript，一个允许创建Typescript
class形式组件的库（通过装饰器）。设计3.0时，在[之前的RFC（已经被废弃）](https://github.com/vuejs/rfcs/pull/17)
中，我们试图提供一个内置的Class API来更好的解决类型问题。然而，当我们讨论和迭代这个设计时，我们注意到为了让Class
API解决类型问题，它必须依赖装饰器 - 这是一个非常不稳定的第 2 阶段提案，其实施细节存在很多不确定性。这使得它成为一个相当冒险的基础。（关于Class
API类型问题的更多[细节](#Class API的类型问题)）

相比之下，本RFC中的API提议大多采用纯变量和函数，这是天然类型友好的。使用提议的API编写代码将会享受完整的类型推断，几乎不需要手动输入类型提示。这也意味着使用提议API的代码，在Typescript和纯js中将会看起来一致，因此即使不使用Typescript的用户也会从类型受益并获得更好的编辑器支持。

## 详细设计

### API介绍

在此处提议的API不是引入新概念，而是更多将Vue的核心能力（例如创建和观测响应式状态）独立公开。在这里我们将介绍一系列很基础的API，并且如何使用来替换2.x版本的选项在组件中的逻辑。注意这个章节专注于介绍基本概念，因此并不会详细介绍每个API。详细的API介绍可以参考[API查阅](#API查阅)
章节。

#### 响应式状态和副作用

让我们从一个简单的任务开始：声明一些响应式状态。

```js
import {reactive} from 'vue'

// reactive state
const state = reactive({
    count: 0
})
```

`reactive`和2.x中的`Vue.observable()`功能相同，避免在使用RxJs时造成困惑。这里，返回的`state`是一个响应式的对象，所有的Vue用户应该很熟悉。

在Vue中，响应式状态是必不可少的用例，我们可以在渲染时使用它。借助于依赖追踪，当响应式状态变化时，视图层将会自动更新。在DOM中渲染一些东西被认为是"
副作用"：我们的程序正在修改程序本身（DOM）外部的状态。基于响应式状态执行和自动重新执行一个副作用，我们可以使用`watchEffect`
API：

```js
import {reactive, watchEffect} from 'vue'

const state = reactive({
    count: 0
})

watchEffect(() => {
    document.body.innerHTML = `count is ${state.count}`
})
```

`watchEffect`接收一个函数来执行想要的副作用（在这个用例中，设置`innerHTML`
）。它会立刻执行这个函数，并且跟踪执行过程中所有使用的响应式状态作为依赖。这里，在首次执行之后，`state.count`
将会被作为这个watcher的依赖来追踪。当`state.count`在未来的某个事件改变时，传入的函数将会被再次执行。

这是 Vue 响应式系统的本质。当你在组件中的`data()`返回一个对象时，在内部通过`reactive()`添加响应性。模板被编译进render函数（将其视为一个更高效的
innerHTML），它使用了这些响应式属性。

> `watchEffect`与2.x中的`watch`选项相似，但是它并没有要求将观测数据和回调函数拆分开。组合式API也提供了一个`watch`
> 函数，行为与2.x版本的`watch`选项完全相同。

继续接着上面的例子讲，这是我们如何处理用户的输入：

```js
function increment() {
    state.count++
}

document.body.addEventListener('click', increment)
```

但是在Vue模板系统中，我们并不需要纠结`innerHTML`或者手动关联事件监听器。使用一个假想的`renderTemplate`
函数简化上述例子，以便我们关注响应副作用：

```js
import {reactive, watchEffect} from 'vue'

const state = reactive({
    count: 0
})

function increment() {
    state.count++
}

const renderContext = {
    state,
    increment
}

watchEffect(() => {
    // hypothetical internal code, NOT actual API
    renderTemplate(
        `<button @click="increment">{{ state.count }}</button>`,
        renderContext
    )
})
```

#### 计算属性和Refs

有时我们需要依赖其他属性的属性 - 在Vue中它被处理为*计算属性*。我们可以使用`computed` API直接创建一个计算属性：

```js
import {reactive, computed} from 'vue'

const state = reactive({
    count: 0
})

const double = computed(() => state.count * 2)
```

`computed`返回的是什么？如果让我们猜测下`computed`内部是怎么实现的，我们可能想到一些如下：

```js
// simplified pseudo code
function computed(getter) {
    let value
    watchEffect(() => {
        value = getter()
    })
    return value
}
```

但是我们知道它是无法工作的：如果`value`是一个基本数据类型（像`number`
），一旦它被返回，那么与computed中的更新逻辑之间的将会丢失。这是因为js基本数据类型是值传递，而不是引用传递：

![composition-api-computed.gif](/imgs/vue-rfcs/composition-api-computed.gif)

当值赋值给一个对象作为一个属性时，相同的问题也会发生。当作为一个属性赋值或者从函数中返回，如果不能保留响应性，那么响应式的值并没有多大作用。为了确保我们可以从计算属性中读取到最新的值，我们需要在一个对象中包裹真实的值再返回：

```js
// simplified pseudo code
function computed(getter) {
    const ref = {
        value: null
    }
    watchEffect(() => {
        ref.value = getter()
    })
    return ref
}
```

另外，我们需要拦截这个对象的`.value`
属性的读写操作来追踪依赖，并且通知值变更（为简单起见，此处省略代码）。现在我们可以传递计算属性的引用，而无需担心响应性丢失。权衡是为了检索最新的值，我们需要通过`.value`
来访问它：

```js
const double = computed(() => state.count * 2)

watchEffect(() => {
    console.log(double.value)
}) // -> 0

state.count++ // -> 2
```

`double`是一个我们成为"ref"的对象，因为它可以作为持有内部值的响应式引用。

> 你可能已经意识到Vue已经有了"refs"的概念，但是仅对于DOM元素的引用或者模板中的组件实例（"模板refs"）。

除了计算属性，我们也可以使用`ref` API直接创建普通可变引用：

```js
const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

#### ref展开

我们可以在渲染上下文中将ref作为属性暴露出去。在内部，Vue将会特殊处理它，以便当在渲染上下文中遇到ref时直接暴露它内部的值。这也意味着，在模板中我们可以直接使用`{{count}}`
，而不是`{{count.value}}`。

这是相同的计算器示例，使用`ref`而不是`reactive`：

```js
import {ref, watch} from 'vue'

const count = ref(0)

function increment() {
    count.value++
}

const renderContext = {
    count,
    increment
}

watchEffect(() => {
    renderTemplate(
        `<button @click="increment">{{ count }}</button>`,
        renderContext
    )
})
```

另外，当ref作为reactive对象的其中的一个属性时，使用时也会自动结构：

```js
const state = reactive({
    count: 0,
    double: computed(() => state.count * 2)
})

// no need to use `state.double.value`
console.log(state.double)
```

#### 在组件中使用




