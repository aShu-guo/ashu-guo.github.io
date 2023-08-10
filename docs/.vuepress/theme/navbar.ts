import {NavbarConfig} from "vuepress";

const navbar: false | NavbarConfig = [
    {
        text: '技术基础',
        link: '/base/',
        children: [
            {text: 'CSS', link: '/base/css/'},
            {text: 'ES6', link: '/base/es6-above/'},
            {text: 'TypeScript', link: '/base/ts/'},
            {text: 'markdown语法', link: '/base/markdown/'},
            {text: '网络基础', link: '/base/network/'},
            {text: 'git入门及进阶教程', link: '/base/git/'},
            {text: '性能优化', link: '/base/performance/'}
        ]
    },
    {
        text: '框架',
        link: '/framework/',
        children: [
            {
                text: 'Vue生态',
                link: '/framework/vue-ecology/',
                children: [
                    {text: '核心库RFCs翻译', link: '/framework/vue-ecology/rfcs/'},
                    {text: 'Vue2.x', link: '/framework/vue-ecology/2.x'},
                    {text: 'Vue3.x', link: '/framework/vue-ecology/3.x'},
                    {text: 'vuepress博客搭建', link: '/framework/vue-ecology/vuepress/'},
                    {text: 'Vue3迁移日志', link: '/framework/vue-ecology/migrate/'},
                    {text: '疑难问题', link: '/framework/vue-ecology/problems/'},
                ]

            },
            {
                text: 'React生态',
                link: '/framework/react-ecology/',
                children: [
                    {text: '入门教程', link: '/framework/react-ecology/rfcs/'},
                ]

            }
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
        text: 'node',
        link: '/node-server/',
        children: [
            {text: 'nestjs', link: '/node-server/nest/'},
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
