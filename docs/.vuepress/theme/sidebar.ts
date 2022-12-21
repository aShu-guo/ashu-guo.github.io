import {SidebarConfig} from "vuepress";

const sidebar: false | "auto" | SidebarConfig = {
    '/vue-ecology/rfcs/': [
        {
            text: 'Vue RFCs翻译',
            children: [
                '/vue-ecology/rfcs/README.md',
                '/vue-ecology/rfcs/什么是RFC.md',
                '/vue-ecology/rfcs/0001-准备篇.md',
                '/vue-ecology/rfcs/0001-new-slot-syntax.md',
                '/vue-ecology/rfcs/0002-准备篇.md',
                '/vue-ecology/rfcs/0002-slot-syntax-shorthand.md',
                '/vue-ecology/rfcs/0003-准备篇.md'
            ]
        },
    ],
    '/vue-ecology/vuepress/': [
        {
            text: '基于vuepress搭建博客',
            children: [
                '/vue-ecology/vuepress/README.md',
                '/vue-ecology/vuepress/初始化.md',
                '/vue-ecology/vuepress/配置.md',
                '/vue-ecology/vuepress/YAML规范.md',
                '/vue-ecology/vuepress/部署.md',
            ]
        },
    ],
    '/base/': [
        {
            text: '技术基础',
            children: [
                {
                    text: 'css',
                    children: [
                        {
                            text: '单位辨析',
                            link: '/base/css/css单位辨析.md'
                        },
                        {
                            text: '像素辨析',
                            link: '/base/css/像素辨析.md'
                        },
                        {
                            text: '动画入门',
                            link: '/base/css/动画入门.md'
                        },
                        {
                            text: '字体渐变色',
                            link: '/base/css/字体渐变色.md'
                        }
                    ]
                },
                {
                    text: 'es6+',
                    children: [
                        {
                            text: 'array',
                            link: '/base/es6-above/array.md'
                        },
                        {
                            text: 'async和await',
                            link: '/base/es6-above/async和await.md'
                        },
                        {
                            text: 'es6疑难点',
                            link: '/base/es6-above/es6疑难点.md'
                        },
                        {
                            text: 'generator',
                            link: '/base/es6-above/generator.md'
                        },
                        {
                            text: 'promise',
                            link: '/base/es6-above/promise.md'
                        },
                        {
                            text: '空值容错',
                            link: '/base/es6-above/空值容错.md'
                        },
                        {
                            text: '解构',
                            link: '/base/es6-above/解构.md'
                        }
                    ]
                },
            ]
        },
    ]
}

export default sidebar
