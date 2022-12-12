> #### MVVM：数据驱动而不是事件驱动

分为三层：model、view、view-model

view层展示数据的具体结构，向view-model发送command（ex：用户click按钮、blur...），但是并不知道数据的来源；

view-model层知道数据的具体结构和执行命令，**提供数据绑定**，但是不知道数据的来源、如何展示；

model层知道数据的来源，数据的访问层；

```
controller提供逻辑，控制数据的流向，
```

![MVVMPattern](/Users/ifugle/Downloads/MVVMPattern.png)

优点：

1.更像是设计师与开发之间的桥梁

2.开发只需要关注业务逻辑，



缺点：

1.对于简单ui操作，数据绑定的开销是巨大的

```js
1.属性可探测，变动可以感知（vue：响应性）
2.
```
