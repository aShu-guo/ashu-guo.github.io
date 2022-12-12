> react

react全部all in js

react只是提供了一个纯粹的框架，里面的工具套件需要开发者自己开发，这也意味这react的上手难度高于vue

vue提供了是一站式解决方案，官方不仅提供了vuex状态管理工具，也提供了路由解析，

1. 取二次封装组件props的逻辑

- vue对外隐藏了目标组件的props，如果需要对外暴露只能通过$attrs，$listener
- react可以更加便利的传递props

```js
// 把剩余props传递给被二次封装的组件
const {type, range, ...rest} = props
```

2. 
