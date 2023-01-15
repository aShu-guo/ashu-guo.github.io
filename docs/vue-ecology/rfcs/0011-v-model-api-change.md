# 0011-更改v-model API

## 概要

调整在自定义组件上v-model API的使用方式。

这次变动建立在RFC[#5](/vue-ecology/rfcs/0005-replace-v-bind-sync-with-v-model-argument.md)上（用`v-model`参数替换`v-bind`
的`.sync`修饰符）。

## 基础用例

N/A

## 动机

在此之前，组件上的`v-model="foo"`大概编译成如下：

```js
h(Comp, {
    value: foo,
    onInput: value => {
        foo = value
    }
})
```

但是，当出于其他的目的希望暴露出组件的`value`props时，这仍然要求通过v-model绑定属性的组件需要使用value作为props传递。（译者注：两者相冲突了）

在2.2中，我们在组件选项中引入了`model`选项来自定义`v-model`需要的prop以及事件。但是，这仍然只允许在组件上使用一个`v-model`
。在实践中，我们看到一些组件需要同步许多属性的值，并且这些属性必须通过`v-bind.sync`
来同步值。我们注意到，从根本上来讲`v-model`
和`v-bind.sync`
是在做同样的事情，并且可以通过允许v-model接收参数来合并到同一个结构中（像[#5](/vue-ecology/rfcs/0005-replace-v-bind-sync-with-v-model-argument.md)
提议的那样）。

## 详细设计

在3.0中，`model`选项将会被移除。组件上的`v-model="foo"`（无参数形式）将会编译成如下格式：

```js
h(Comp, {
    modelValue: foo,
    'onUpdate:modelValue': value => (foo = value)
})
```

如果一个组件想要支持无参数形式的`v-model`，它应该声明一个名称为`modelValue`
的props。为了同步值回父组件，子组件应该抛出一个名为`"update:modelValu"`
的事件（参考[render函数API变更](/vue-ecology/rfcs/0008-render-function-api-change.md)中的新VNode数据结构中的更多细节）。

props和事件的默认编译前缀`model`可以避免与其他props和事件冲突。

