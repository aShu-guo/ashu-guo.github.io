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
        text: 'Vue',
        link: '/vue-ecology/',
        children: [
            {text: 'RFCs翻译', link: '/vue-ecology/rfcs/'},
            {text: 'vuepress博客搭建', link: '/vue-ecology/vuepress/'},
        ]
    }
]

export default navbar
