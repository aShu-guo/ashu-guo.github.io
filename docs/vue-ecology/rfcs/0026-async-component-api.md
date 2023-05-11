# 异步组件api

## 概览

介绍一个定义异步组件的API。

## 基础用例

```js
import {defineAsyncComponent} from "vue"

// simple usage
const AsyncFoo = defineAsyncComponent(() => import("./Foo.vue"))

// with options
const AsyncFooWithOptions = defineAsyncComponent({
    // 加载函数
    loader: () => import("./Foo.vue"),
    loadingComponent: LoadingComponent,
    errorComponent: ErrorComponent,
    delay: 200,
    timeout: 3000
})
```

## 动机




