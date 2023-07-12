# 联合类型

当变量包含多个类型时使用联合类型，当使用联合类型时，ts只会只能提示联合类型中所有类型`共有`的属性。

使用`|`表示既...又...

```ts
let a: string | number
a.toString()
```

![img.png](/imgs/typescript/union-types.png)

:::tip
在未使用ts的vue中声明props时：`id: { type: [String, Number], required: true }`，注意不要与ts联合类型语法混淆了。
:::


