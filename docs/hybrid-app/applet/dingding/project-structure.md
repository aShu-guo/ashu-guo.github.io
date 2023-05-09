# 项目结构

## 概览

- 介绍全局文件`app.json`、`app.js`、`app.acss`、`mini.project.json`
- 介绍组件文件与页面文件
- 第三方依赖引入

## 全局文件

- app.json
    - 应用的全局配置，如果页面没有自定义配置，那么则取全局配置
    - 仅支持3个属性：window、pages、tabBar
- app.js
    - 用于注册小程序，提供了应用级别的生命周期
- mini.project.json（没有在钉钉文档中提及，但是是可用的，
  需要参考支付宝提供的[文档](https://opendocs.alipay.com/mini/03dbc3?pathHash=e876dc50)）
    - 项目配置，用于自定义项目编译、开发的功能
    - 提供了编译less变量的能力，可用于自定义UI框架的主题

## 组件文件和页面文件

钉钉小程序将axml文件分为了组件文件和页面文件，组件文件一般存放在`components`目录下，页面文件一般存放在`pages`目录下

### 组件文件

用于存放组件，用户交互触发的方法需要放在`methods`中

```js
Component({
    data: {
        name: 'component file'
    },
    methods: {
        tabChange() {

        },
        imgPreview() {

        }
    }
})
```

### 页面文件

用于存放页面，用户交互触发的方法可直接放在`data`同级下

```js
Component({
    data: {
        name: 'component file'
    },
    tabChange() {

    },
    imgPreview() {

    }
})
```

## 第三方依赖引入

需要自行初始化`package.json`文件

注意⚠️：引入的第三方依赖不能依赖`window`、`global`等浏览器提供的全局变量
