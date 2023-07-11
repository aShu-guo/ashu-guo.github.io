# 数组

在ts中，声明数组有两种特殊的语法

1. new声明

```ts
const list = new Array<string>()
list.push('hello world')
```

2. []声明

```ts
const list: string[] = []
list.push('hello world')
```

## 只读数组

`readonly`表明数组为只读不可写

```ts
const list: readonly string[] = []
// Error: push不是一个函数
list.push()
```

![img.png](/imgs/typescript/arrays-auto-complete.png)

## infer type

如果声明数组时包含值，则ts会自动推断出数组类型

```ts
const list = [1, 2, 3]
// list 类型为 number[]
```
