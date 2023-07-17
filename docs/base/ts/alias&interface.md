# 类型别名和interface

## type aliases

类型别名允许使用自定义名称定义基本类型（`string`）或者复杂类型（`objects`）

```ts
type SnCode = string

const snCode: SnCode = '123'
```

## interface

`interface`与类型别名类似，但是它只能定义`object`类型，显式地描述对象的内部数据的类型

```ts
interface Student {
    age: number,
    name: string
}
```

如果相同作用域下出现同名`interface`，则会自动合并属性

```ts
interface Shape {
    name: string
}

interface Shape {
    getArea: () => number
}

const shape: Shape = {
    name: '',
    getArea() {
        return 1
    },
}
```

相对于type alias，更建议使用interface

### extends

`interface`通过关键字`extends`扩展属性，相当于添加了其他interface的属性，并且它可以扩展任意自定义类型

```ts
interface CollegeStudent extends Student {
    paper: string[]
}

```

## 区别

type alias 拥有interface的所有特性，但是type alias无法重新打开添加新的属性（指`interface`自动合并相同作用域下的同名声明）

1. 继承语法上的不同

```ts
// interface
interface Animal {
    name: string;
}

interface Bear extends Animal {
    honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;
```

type alias 是通过`&`来扩展属性的

```ts
type Animal = {
    name: string;
}

type Bear = Animal & {
    honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;
```

2. 含义不同

`type alias`的含义与他的中文翻译一样，用于为类型起别名而存在的。看到`interface`，第一时间想到的是`结构`：定义一个对象的结构是什么样子的。


