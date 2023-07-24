# 元组

一个指定预定义长度和每个索引对应值的类型的数组

```ts
// 正确的语法
const tuples: [string, number] = ['1', 2]

// 错误的语法
const tuples2: [string, number] = ['1', 2, 4]
// Error: Type '[string, number, number]' is not assignable to type '[string, number]'.
//     Source has 3 element(s) but target allows only 2.ts(2322)
```

更加通用的元组声明

```ts
type Tuples = readonly any[]
```

## 只读

像数组一样使用`readonly`限制变量操作，而且最佳实践是将元组设置为只读的

```ts
const tuples: readonly [string, number] = ['1', 2]
tuples.push(1)
```

![img.png](/imgs/typescript/tuples-auto-complete.png)

:::tip
React中`userState()`调用结果便是一个value和设置value的函数组成的元组

```ts
const [name, setName] = userState('')
```

:::

## 具名元组

为元组中的每个index的值赋予name

```ts
const graph: [x: number, y: number] = [55.2, 41.3];
```

可以为元组中包含的值提供更多的上下文信息，例如

```ts
const coord: [longitude: number, latitude: number] = [120.3, 30.22]
```

## 解构元组

语法等同于解构数组

```ts
const coord: [number, number] = [120.3, 30.22]
const [longitude, latitude] = coord
```

## 数组转为元组

使用`as const`可以将数组类型转化为元组类型

```ts
// 此时类型为：string[]
const actions = ["CREATE", "READ", "UPDATE", "DELETE"]
```

![img.png](/imgs/typescript/array-to-tuple.png)

```ts
// 此时类型为：readonly ["CREATE", "READ", "UPDATE", "DELETE"]
const actions = ["CREATE", "READ", "UPDATE", "DELETE"] as const 
```

![img.png](/imgs/typescript/array-to-tuple-2.png)
