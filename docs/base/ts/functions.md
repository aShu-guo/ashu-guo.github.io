# 函数类型

在ts中声明函数时与js不同，需要显式声明参数类型和返回值类型

## 返回值类型

可以显示的声明返回值类型，如果没有声明，ts则会尝试自行根据返回值推断类型。

```ts
const getName = (): string => {
    return 'xiaoming'
}
```

### void类型

如果函数没有返回值或者返回`undefined`，则返回值类型为`void`

```ts
const sayHello = (): void => {
    console.log('hello world')
}
```

## 参数类型

为函数的参数列表分配类型，语法类似声明对象属性。如果没有显式声明，ts会默认为`any`

```ts
const sayHello = (name: string) => {
    console.log('i am ' + name)
}
```

### 可选参数

ts默认所有参数都是必须的，但是可以通过`?`表明参数是非必须的

```ts
// 被`?`标记的参数的类型为：number | undefined
function add(a: number, b: number, c?: number) {
    return a + b + (c || 0);
}
```

### 参数默认值

默认值写在参数类型之后

```ts
function add(a: number, b: number, c: number = 10) {
    return a + b + (c || 0);
}
```

### 具名参数

含义等于解构对象参数

```ts
function introduce({name, age}: { name: string, age: number }) {
    console.log(name + ':' + age)
}
```

### 剩余参数

`...`将剩余参数列表归纳为数组，这点与js保存一致，但是需要声明剩余参数列表的类型

```ts
function add(a: number, b: number, ...rest: number[]) {
    return a + b + rest.reduce((p, c) => p + c, 0);
}
```

### 类型别名

为函数类型的变量声明一个类型

```ts
type Introduce = (name: string) => string
const introduce: Introduce = (name) => {
    return name
}
```




