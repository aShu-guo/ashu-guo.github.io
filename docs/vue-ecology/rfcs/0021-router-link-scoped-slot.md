# 为router-link添加作用域插槽

## 概览

- 移除`tag` props
- 移除`event` props
- 停止自动分配点击事件给内部锚点
- 新增作用域插槽API
- 新增`custom`props满足自定义`router-link`渲染

## 基础用例

```html

<router-link to="/">
    <Icon>home</Icon>
    Home
</router-link>
```

## 动机

目前的router-link有很多限制：

- 激活状态下的自定义能力不完备
- 无法整合自定义组件
- 
