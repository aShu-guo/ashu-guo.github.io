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
        link: '/vue/',
        children: [
            {text: 'RFC', link: '/vue/rfc/'},
        ]
    }
]

export default navbar
