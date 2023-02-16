import {NavbarConfig} from "vuepress";

const navbar: false | NavbarConfig = [
    {
        text: '技术基础',
        link: '/base/',
        children: [
            {text: 'css', link: '/base/css/'},
            {text: 'markdown语法', link: '/base/markdown/'},
            {text: 'git入门及进阶教程', link: '/base/git/'}
        ]
    },
    {
        text: 'Vue生态',
        link: '/vue-ecology/',
        children: [
            {text: '核心库RFCs翻译', link: '/vue-ecology/rfcs/'},
            {text: 'vuepress博客搭建', link: '/vue-ecology/vuepress/'},
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
    {
        text: 'css动画',
        link: '/animation/',
    }
]

export default navbar
