1.路由之间的参数传递

```js
// 方案一
// 路由定义
{
  path: '/describe/:id',
  name: 'Describe',
  component: Describe
}
// 页面传参
this.$router.push({
  path: `/describe/${id}`,
})
// 页面获取
this.$route.params.id

// 方案二
// 路由定义
{
  path: '/describe',
  name: 'Describe',
  component: Describe
}
// 页面传参
this.$router.push({
  name: 'Describe',
  params: {
    id: id
  }
})
// 页面获取
this.$route.params.id

//方案三
// 路由定义
{
  path: '/describe',
  name: 'Describe',
  component: Describe
}
// 页面传参
this.$router.push({
  path: '/describe',
    query: {
      id: id
  }
)
// 页面获取
this.$route.query.id
  
this.$route.params.id //获取':'或params绑定的参数
this.$route.query.id //获取query绑定参数


```

$router与$route的区别

$router表示router 实例

$route表示跳转的路由实例



query刷新后不会失效，会被拼接到url中

params刷新后会失效，不会被拼接到url中



2.嵌套路由

子路由会渲染在父路由的<router-view/>标签占用的部分

为什么有的嵌套路由需要加上父路由一起写，而有的不需要？还是都不需要？



3.vue
