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
            {text: 'rfc', link: '/vue/rfc/'}
        ]
    }
]

export default navbar
