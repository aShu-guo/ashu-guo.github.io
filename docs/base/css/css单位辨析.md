# css单位辨析

解释前端css涉及到的单位：px、vw、vh、rem、dpi等，以及设计图中的px表示的含义

## Viewport

在浏览器范畴里，它代表的是浏览器中网站可见内容的部分。视口外的内容在被滚动进来前都是不可见的。

概括地说，视口基本上是当前文档的可见部分。

- 可视视口：视口当前可见的部分
- 布局视口：`innerHeight` 和 `innerWidth` 所组成的区域

```js
// 表示在浏览器y轴上，除视口之外的元素占位的像素值：包括但不仅限于收藏夹、地址栏、书签栏等
const extraHeight = window.outerHeight - window.innerHeight

```

`可视视口与布局视口之间的关系`

布局视口总是大于或者等于可视视口区域，

```js
可视视口 >= 布局视口
```

场景举例：

- 键盘在手机上弹出的时候，可视视口变小，但是布局视口没有改变
- 之前隐藏的地址栏变得可见的时候，可视视口变小，但是布局视口没有改变

> vh && vw

1vh 单位是 1% 布局视口的高度，vw 单位与此类似。
