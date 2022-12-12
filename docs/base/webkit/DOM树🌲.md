> DOM树🌲

html经过词法分析和语法分析，构建成一个以document为根结点的多叉树

过程：从服务器响应回来的数据类型为：text/html时，webkit的html解释器开始工作，通过词法分析器、语法分析器解释成tokens，发送到建树器中构建节点



> 词法分析、语法分析（字符 -> token -> 节点）

解释器会找到html中指定编码类型的解码器

```html
<meta charset="UTF-8" />
```



> 节点 -> DOM树

通过栈结构，不断入栈、退栈，标记是否处理完（这点在vue模板解析中有体现）



Q&A

> 1.在html解析过程中遇到js会有什么行为？

要看js脚本的位置：

- 放在head中
  - 通过src引入，需要去下载js资源，然后再去执行
  - 没有通过src引入，可以直接执行

​			但是如果存在操作DOM的逻辑，则会阻塞DOM树的解析以及后续资源的下载（例如图片资源等）	

- 放在head中而且是异步的，则不会阻塞

- 放在body最下面，则不会阻塞（此时DOM已经解析完毕）



对于第一种情况，webkit做了优化处理：在解析到js脚本时，先暂停脚本执行，使用预先扫描器扫描后续的tokens，当发现后续需要资源请求时，会先去请求资源，之后再去继续执行js脚本



DOM构建完毕之后，会触发"DOMContentLoader"事件，触发注册的callback；当所有资源加载完毕之后，触发onload事件



> 前端性能指标 https://www.51cto.com/article/681298.html

- 首屏绘制（First Paint，FP）
-  首屏内容绘制（First Contentful Paint，FCP）
-  可交互时间（Time to Interactive，TTI）
-  最大内容绘制（Largest Contentful Paint，LCP)
-  首次有效绘制（First Meaning Paint, FMP）



