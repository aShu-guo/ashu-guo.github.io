# 特殊的类型

在ts中除了基本类型之外，还有5个特殊的类型：`any`、`unknown`、`never`、`null`、`undefined`

## any

ts对类型为`any`的变量不会做类型检查、智能提示等帮助，虽然有上述缺点，但是在处理过去设计漏洞时很有帮助。

```ts
let a: any = true
a = 'xiaoming' // 如果不显式指定变量a为any类型，那么ts会自动推断变量a为boolean类型，再次赋值为string类型的值会报错
```

## unknown

unknown与any类似，但是却更加安全。当不知道一个变量的类型是什么时，可以将它的类型设置为`unknown`。

而且ts将会阻止使用`未推断为具体类型`的`unknown`变量

```ts
let a: unknown = true
a = 'hello world'

a = {
    run: () => {
        console.log('hello world')
    }
} as { run: () => void }

// a.run() // Error: 'a' is of type 'unknown'.ts(18046)
if (typeof a === 'object' && a !== null) {
    (a as { run: Function }).run()
}
```

与`any`相比，在使用`unknown`类型的变量时ts仍会进行类型校验，如果想不抛出ts异常，那么在使用时必须断言为正确的类型

## never

never类型的变量，只要赋值给它便会抛出异常

```ts
let name: never = '123' //Error: Type 'string' is not assignable to type 'never'
```

never很少使用，尤其是单独使用，它的主要用途是高级泛型

## undefined && null

undefined 与 null对应js中的 undefined 和 null
