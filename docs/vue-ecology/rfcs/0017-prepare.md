# 准备篇

## 什么是Transition

Vue2内置的提供动画功能的组件，在四种状态下提供过渡动画：

- v-if
- v-show
- 动态组件
- 组件根结点

## 提供了那些Hook和内置类名？

当没有指定`<Transition>`的`name`props时，默认类名前缀为`v-`。并且内置了以下类型：

- v-enter：进入过渡的开始状态
- v-enter-active：进入过渡时的状态
- v-enter-to：进入过渡的结束状态，在元素被插入DOM之后的下一帧生效，并移除v-enter
- leave-enter：离开过渡的开始状态
- leave-active：离开过渡生效的状态
- leave-to：离开过渡的结束状态

  ![img.png](/imgs/animation/vue-transition.png)

也可以不按照Vue约定的规范使用`前缀+自定义类名`的风格，用户可以通过`<Transition>`的props指定：

- enter-class
- enter-active-class
- enter-to-class (2.1.8+)
- leave-class
- leave-active-class
- leave-to-class (2.1.8+)

