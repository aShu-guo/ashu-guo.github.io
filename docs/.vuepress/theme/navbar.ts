import {NavbarConfig} from "vuepress";

const navbar: false | NavbarConfig = [
    {
        text: '技术基础',
        link: '/base/',
        children: [
            {text: 'css', link: '/base/css/'}
        ]
    },
    {
        text: 'Vue',
        children: [
            {text: 'RFCs翻译', link: '/vue-ecology/rfcs/'},
            {text: 'vuepress博客搭建', link: '/vue-ecology/vuepress/'},
        ]
    }
]

export default navbar
