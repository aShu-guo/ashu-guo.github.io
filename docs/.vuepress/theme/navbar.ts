import {NavbarConfig} from "vuepress";

const navbar: false | NavbarConfig = [
    {
        text: '技术基础',
        link: '/base/',
        children: [
            {text: 'CSS', link: '/base/css/'},
            {text: 'ES6', link: '/base/es6-above/'},
            {text: 'markdown语法', link: '/base/markdown/'},
            {text: '网络基础', link: '/base/network/'},
            {text: 'git入门及进阶教程', link: '/base/git/'},
            {text: '性能优化', link: '/base/performance/'}
        ]
    },
    {
        text: 'Vue生态',
        link: '/vue-ecology/',
        children: [
            {text: '核心库RFCs翻译', link: '/vue-ecology/rfcs/'},
            {text: 'Vue3 源码解析', link: '/vue-ecology/debugger/'},
            {text: 'vuepress博客搭建', link: '/vue-ecology/vuepress/'},
            {text: 'Vue3迁移升级日志', link: '/vue-ecology/migrate/'},
            {text: '疑难问题', link: '/vue-ecology/problems/'},
        ]
    },
    {
        text: '混合应用开发',
        link: '/hybrid-app/',
        children: [
            {text: '小程序', children: ['/hybrid-app/applet/dingding/', '/hybrid-app/applet/wx/']},
            {
                text: '跨端解决方案',
                children: [
                    '/hybrid-app/cross/uniapp/',
                ]
            },
        ]
    },
    {
        text: '计算机课程学习记录',
        link: '/study-course/',
        children: [
            '/study-course/computer-graphics/',
            '/study-course/computer-organization/',
        ]
    },
    {
        text: '英语学习',
        link: '/english-study/',
    },
    {
        text: 'WebGIS',
        link: '/webgis/',
    },
]

export default navbar
