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

在这个RFC的提议中，提供用户在组织组件代码时更多的灵活性。在处理每个特定功能时，不再强制基于选项组织代码，现在可以基于函数组织代码。提供的APIs在不同组件中，甚至直接在组件外提取和复用逻辑时。我们将会在[详细设计](#详细设计)
章节展示是如何实现的。

### 更好的类型推断

对于大型项目开发者，另一个常见的功能请求是更好的Typescript支持。当与Typescript集成时，现存Vue
API带来了一些挑战，大多数是因为Vue依赖一个单独的`this`上下文来暴露属性，而且Vue组件中的`this`
与纯js使用上不一样（例如：在`methods`中声明的函数中的`this`是指向组件实例的，而不是`methods`
对象）。换句话说，Vue现存API在设计时并没有考虑到类型推断，并且为了在集成Typescript时正常工作，这也造成了很多的复杂性。

使用Vue的用户目前是通过`vue-class-component`集成Typescript，一个允许创建Typescript
class形式组件的库（通过装饰器）。设计3.0时，在[之前的RFC（已经被废弃）](https://github.com/vuejs/rfcs/pull/17)
中，我们试图提供一个内置的Class API来更好的解决类型问题。然而，当我们讨论和迭代这个设计时，我们注意到为了让Class
API解决类型问题，它必须依赖装饰器（这是一个非常不稳定的第 2 阶段W3C提案，其实施细节存在很多不确定性。）这使得在底层使用它是相当冒险的。（关于Class
API类型问题的更多[细节](#类API的类型问题)）

相比之下，本RFC中的API提议大多采用纯变量和函数，这是天然类型友好的。使用提议的API编写代码将会享受完整的类型推断，几乎不需要手动输入类型提示。这也意味着使用提议API的代码，在Typescript和纯js中将会看起来一致，因此即使不使用Typescript的用户也会从类型受益并获得更好的编辑器支持。

## 详细设计

### API介绍

在此处提议的API不是为了引入新概念，而是更多将Vue的核心能力（例如创建和观测响应式状态）独立公开。在这里我们将介绍一系列很基础的API，并且如何使用来替换2.x版本的选项在组件中的逻辑。注意这个章节专注于介绍基本概念，因此并不会详细介绍每个API。详细的API介绍可以参考[API查阅](#API查阅)
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

`reactive`和2.x中的`Vue.observable()`功能相同，更名以避免在使用RxJs时造成困惑。这里，返回的`state`是一个响应式的对象，所有的Vue用户应该很熟悉。

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

有时我们需要依赖其他属性的属性（在Vue中它被处理为*计算属性*）。我们可以使用`computed` API直接创建一个计算属性：

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
），一旦它被返回，那么与computed中的更新逻辑之间的将会丢失。这是因为传递js基本数据类型时是值传递，而不是引用传递：

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

另外，当ref作为reactive对象的其中的一个属性时，使用时也会自动解构：

```js
const state = reactive({
    count: 0,
    double: computed(() => state.count * 2)
})

// no need to use `state.double.value`
console.log(state.double)
```

#### 在组件中使用

我们的代码到目前为止提供了一个可用的UI，它可以基于用户输入更新DOM（但是这个代码只能运行一次，而且无法复用）。如果我们想要复用这段逻辑，合理的下一步似乎是将它放进函数中：

```js
import {reactive, computed, watchEffect} from 'vue'

function setup() {
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

const renderContext = setup()

watchEffect(() => {
    renderTemplate(
        `<button @click="increment">
      Count is: {{ state.count }}, double is: {{ state.double }}
    </button>`,
        renderContext
    )
})
```

> 注意上面的代码是如何不依赖组件实例的。确实，到目前为止介绍的API都可以在组件上下文外使用，允许我们在广阔的场景中使用Vue的响应式系统。

现在如果我们放弃调用`setup()`，创建watcher和渲染模板到框架中，我们可以仅使用`setup()`函数和模板定义一个组件：

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

这就是我们熟悉的单文件组件形式，仅有的逻辑部分（`<script>`）以不同的格式表达。模板语法保持完全相同。`<style>`
被省略了，但是也完全相同。

#### 生命周期钩子

到目前为止，我们介绍了组件的纯状态概念：响应式状态、计算属性和根据用户输入改变状态。但是一个组件也需要执行副作用（例如：在控制台上打印日志，发送一个ajax请求或者在window上设置一个事件监听器）。这些副作用经常在下面时间点上执行：

- 当一些状态改变时；
- 当组件被挂载时，更新或者卸载时（生命周期钩子）。

我们知道在状态发生改变时，可以使用`watchEffect`和`watch`
APIs来执行副作用。当在不同的生命周期钩子中执行副作用时，我们可以使用专用的`onXXX` APIs（是现存生命周期选项中的镜像）：

```js
import {onMounted} from 'vue'

export default {
    setup() {
        onMounted(() => {
            console.log('component is mounted!')
        })
    }
}
```

这些生命周期函数只能在`setup`执行时使用。它会使用内部全局状态自动检测出被调用`setup`钩子的组件实例。特意以这种设计，来减少逻辑提取到外部函数的性能损耗。

> 关于这些APIs更多的细节可以参考[API查阅](#API查阅)。然而，我们建议在完成下面章节之前再深挖设计细节。

### 代码组织

到此，我们已经复制了带有导入函数的组件API，但是要做什么呢？使用选项定义组件似乎比在一个大函数中混合所有逻辑更有组织。

这是第一印象的理解。但是正如我们在[动机](#动机)章节提及的那样，我们相信组合式API可以产出更好的有组织的代码，尤其是在复杂组件中。这里我们将会解释为什么。

#### 什么是"有组织的代码"？

让我们后退一步，思考下当讨论"有组织的代码"
时想表达什么。保持代码井井有条的最终目的是让代码足够容易阅读和理解。我们所说的“理解”代码是什么意思？难道因为我们知道了组件包含哪些选项就可以说我们真正理解它了么？你是否运行过一个其他开发者（例如[这个](https://github.com/vuejs/vue-cli/blob/a09407dd5b9f18ace7501ddb603b95e31d6d93c0/packages/@vue/cli-ui/src/components/folder/FolderExplorer.vue#L198-L404)
）写的一个大组件，而且花费大量时间去理解它的情况？

想一想我们将如何引导一位开发人员完成一个像上面链接的大组件。你更可能是从"这个组件是解决问题X、Y和Z的"而不是"
这个组件包含这些data属性、计算属性、方法"。当开始理解组件时，我们更多的关心"这个组件想要做什么"（例如：代码背后的意图）而不是"
组件使用了哪些选项"。使用基于选项组织代码时可以自然的回答后者，在表达前者时很差。

#### 逻辑关注点 vs 选项

我们定义组件解决"X、Y或Z"问题为**逻辑关注点**
。组件可读性问题并不会在小、单薄组件中出现，因为这整个组件只处理一个单独的逻辑关注点。然而，在高阶用例中会经常出现这个问题。就拿[Vue CLI 文件浏览器](https://github.com/vuejs/vue-cli/blob/a09407dd5b9f18ace7501ddb603b95e31d6d93c0/packages/@vue/cli-ui/src/components/folder/FolderExplorer.vue#L198-L404)
作为例子。这个组件需要处理多个不同的逻辑关注点：

- 跟踪当前目录状态并且展示它的内容
- 处理目录导航（打开、关闭、刷新...）
- 处理新目录创建
- 切换仅展示喜欢的目录
- 切换展示隐藏的目录
- 处理当前工作目录的改变

你可以在阅读了基于选项的代码分辨出这些逻辑是哪个关注点的一部分么？这确实有点困难。你会注意到和一个指定逻辑关注点相关的代码经常是片段的而且散落在各个位置。例如，这个"
创建新目录"功能使用了两个data属性、一个计算属性和一个方法（这个方法定义在距离data属性100行之外的地方）。

如果我们颜色标记这些代码关注点，我们注意到当用组件选项表示时它们是多么分散：
![code-scatter.png](/imgs/vue-rfcs/code-scatter.png)

这样的片段确实会使理解和维护一个复杂组件变得困难。
