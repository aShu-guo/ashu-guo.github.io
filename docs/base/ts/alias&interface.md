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

相对于type alias，更建议使用interface

### extends

`interface`通过关键字`extends`扩展属性，相当于添加了其他interface的属性，并且它可以扩展任意自定义类型

```ts
interface CollegeStudent extends Student {
    paper: string[]
}

```
