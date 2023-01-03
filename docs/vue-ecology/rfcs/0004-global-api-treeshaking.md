# 0004 全局API tree-shaking

## 概要

尽可能通过具名导出，使Vue运行时被tree-shaking

## 基本示例

```html
import { nextTick, observable } from 'vue'

nextTick(() => {})

const obj = observable({})
```

## 动机

随着Vue的api新增，我们需要时刻平衡新功能和打包大小。我们想尽可能的使Vue足够小，但是也不能因为打包大小而限制性能。（译者注：要追求性能和打包大小之间的平衡）

借助ES module静态分析的友好设计、现代bundler和minifier相结合，可以消除未在bundle中导出的es
modules。我们可以利用这个优点来重构Vue的全局API和内置的API，以便用户只消费他们使用的功能。

另外，对于不使用可选功能的用户而言，这并不会增加最终bundle的大小，因此我们有更多的空间来提供可选的功能。

## 详细设计

在2.x版本，所有的全局API通过单一的Vue对象对外暴露：

```js
import Vue from 'vue'

Vue.nextTick(() => {
})

const obj = Vue.observable({})
```

在3.x版本中，他们只能通过具名导出：

```js
import Vue, {nextTick, observable} from 'vue'

Vue.nextTick // undefined

nextTick(() => {
})

const obj = observable({})
```

通过不再默认导出Vue上挂载所有API，任何未使用的API都会被支持tree-shaking的打包器丢弃，并不会打包到最终的bundle中。

## 受影响的2.x版本的API

- `Vue.nextTick`
- `Vue.observable`
- `Vue.version`
- `Vue.compile`(仅存在完整版本中)
- `Vue.set`(仅存在兼容版本中)
- `Vue.delete`(仅存在兼容版本中)

## 内置的helper 





