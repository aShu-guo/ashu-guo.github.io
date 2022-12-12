import {SidebarConfig} from "vuepress";

const sidebar: false | "auto" | SidebarConfig = {
    '/vue/': [
        {
            text: 'vue',
            children: [
                {
                    text: 'rfc',
                    link: '/vue/rfc/README.md'
                }
            ]
        }
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
