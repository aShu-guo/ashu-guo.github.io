> 响应式原理（数据拦截、依赖收集、派发更新）

三个组成部分：

- Observer（生产方）: 数据拦截
- Dep（消息中心）: 保存生产者以及消费者的引用、依赖收集
- Watcher（消费方）: 派发更新

---
涉及到的重要function：
- 

- defineReactive() `为每个属性添加数据拦截`

```js
 defineReactive(obj,
    key,
    val,
    customSetter)
{
    // ...
    /**
     * 用于为子对象添加响应性，并且子对象也进行依赖收集
     *
     * 如果父对象被整体替换，也需要通知子对象的所有订阅方
     */
    let childOb = observe(val)
    Object.defineProperty(obj, key, {
        get: function reactiveGetter() {
            const value = getter ? getter.call(obj) : val
            if (Dep.target) {
                dep.depend()
                if (childOb) {
                    childOb.dep.depend()
                }
                // ...
            }
            return value
        },
        set: function reactiveSetter(newVal) {
            const value = getter ? getter.call(obj) : val
            /* eslint-disable no-self-compare */
            /**
             * 值为引用数据类型的属性只要引用没有改变，会直接return掉
             * 此处通知订阅方的方式只适用于：
             *    1.值类型属性更新值
             *    2.引用数据类型（普通对象）被整体替换
             *
             * 但是无法拦截
             *    普通对象：新增属性、删除属性
             *    数组对象：反转、push等对原有引用有影响的api
             * 所以引用数据类型的属性是通过另外一种方式通知订阅者
             */
            if (newVal === value || (newVal !== newVal && value !== value)) {
                return
            }
            childOb = observe(newVal)
            // ...
            dep.notify()
        }
    })
}
```

```js
// 产生的影响，如下
let childOb = observe(val)
```

![observe影响-1.png](/imgs/observe影响-1.png)

![observe影响-2.png](/imgs/observe影响-2.png)

- observe() `递归属性，添加数据拦截`
- dep.depend() `依赖收集：在dep中保存当前watcher、在watcher中保存dep`
- dep.notify() `通知watcher执行expression`

每个引用数据类型的响应式属性都对应一个dep
> dep与watcher的对应关系

dep : watcher 1对n

watcher : dep 1对n

---

> 数据拦截两种方式对比

**Object.defineProperty** ：定义个体的行为

```js
// Object
let obj = {}
Object.defineProperty(obj, 'name', {
    get() {
        return 1
    },
    set(value) {
        console.log('>>>>value:' + value)
    }
})

// Array 数据拦截较为复杂，vue重写了array的api
let arr = [1, 2, 3]
Object.defineProperty(arr, 3, {
    get() {
        return 1
    },
    set(value) {
        console.log('>>>>value:' + value)
    }
})

```

**es6提供的Proxy**：定义整体的行为

```js
// Object
let obj = {}
let proxyObj = new Proxy(obj, {
    get() {
        return 1
    },
    set(value) {
        console.log('value:' + value)
    }
})
```

> Object 数据拦截

使用Object.defineProperty做数据拦截



> Array 数据拦截

也是使用Object.defineProperty做数据拦截

但是存在两个问题：深层嵌套无法监听、数组api过多

vue提供的解决方式：

1.重新定义了Array提供的api，但同时也保留了原有api

2.添加了对深层嵌套的处理
