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
            {text: 'vuepress博客搭建', link: '/vue-ecology/vuepress/'},
            {text: 'Vue3迁移升级日志', link: '/vue-ecology/migrate/'},
            {text: '疑难问题', link: '/vue-ecology/problems/'},
        ]
    },
    {
        text: '英语学习',
        link: '/english-study/',
    },
    {
        text: '计算机图形学',
        link: '/computer-graphics/',
    },
    {
        text: 'WebGIS',
        link: '/webgis/',
    },
]

export default navbar
