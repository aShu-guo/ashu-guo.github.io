import {SidebarConfig} from "vuepress";

const sidebar: false | "auto" | SidebarConfig = {
    '/base/git/': [
        {
            text: 'git操作',
            children: [
                '/base/git/repo-opt.md',
                '/base/git/branch-opt-base.md',
                '/base/git/branch-opt-advance.md'
            ]
        }
    ],
    '/hybrid-app/applet/dingding/': [
        {
            text: '钉钉小程序',
            children: [
                '/hybrid-app/applet/dingding/README.md',
                '/hybrid-app/applet/dingding/definition.md',
                '/hybrid-app/applet/dingding/project-structure.md',
                '/hybrid-app/applet/dingding/syntax.md',
                '/hybrid-app/applet/dingding/publish.md',
            ]
        }
    ],
    '/base/performance/': [
        {
            text: 'Performance 性能优化手册',
            children: [
                '/base/performance/README.md',
                '/base/performance/FMP.md',
                '/base/performance/vitals-metrics.md'
            ]
        }
    ],
    '/vue-ecology/rfcs/': [
        {
            text: 'Vue RFCs翻译',
            children: [
                '/vue-ecology/rfcs/README.md',
                '/vue-ecology/rfcs/what\'s RFC.md',
                {
                    text: '0001-new-slot-syntax',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0001-prepare.md',
                        '/vue-ecology/rfcs/0001-new-slot-syntax.md',
                    ]
                },
                {
                    text: '0002-slot-syntax-shorthand',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0002-prepare.md',
                        '/vue-ecology/rfcs/0002-slot-syntax-shorthand.md',
                    ]
                },
                {
                    text: '0003-dynamic-directive-arguments',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0003-prepare.md',
                        '/vue-ecology/rfcs/0003-dynamic-directive-arguments.md',
                    ]
                },
                {
                    text: '0004-global-api-treeshaking',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0004-global-api-treeshaking.md',
                    ]
                },
                {
                    text: '0005-replace-v-bind-sync-with-v-model-argument',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0005-prepare.md',
                        '/vue-ecology/rfcs/0005-replace-v-bind-sync-with-v-model-argument.md',
                    ]
                },
                {
                    text: '0006-slots-unification',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0006-slots-unification.md',
                    ]
                },
                {
                    text: '0007-functional-async-api-change',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0007-prepare.md',
                        '/vue-ecology/rfcs/0007-functional-async-api-change.md',
                    ]
                },
                {
                    text: '0008-render-function-api-change',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0008-prepare.md',
                        '/vue-ecology/rfcs/0008-render-function-api-change.md',
                    ]
                },
                {
                    text: '0009-global-api-change',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0009-prepare.md',
                        '/vue-ecology/rfcs/0009-global-api-change.md',
                    ]
                },
                {
                    text: '0011-v-model-api-change',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0011-v-model-api-change.md',
                    ]
                },
                {
                    text: '0012-custom-directive-api-change',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0012-prepare.md',
                        '/vue-ecology/rfcs/0012-custom-directive-api-change.md',
                    ]
                },
                {
                    text: '0013-composition-api',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0013-prepare.md',
                        '/vue-ecology/rfcs/0013-composition-api.md',
                    ]
                },
                {
                    text: '0014-drop-keycode-support',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0014-prepare.md',
                        '/vue-ecology/rfcs/0014-drop-keycode-support.md',
                    ]
                },
                {
                    text: '0015-remove-filters',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0015-prepare.md',
                        '/vue-ecology/rfcs/0015-remove-filters.md',
                    ]
                },
                {
                    text: '0016-remove-inline-templates',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0016-prepare.md',
                        '/vue-ecology/rfcs/0016-remove-inline-templates.md',
                    ]
                },
                {
                    text: '0017-transition-as-root',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0017-prepare.md',
                        '/vue-ecology/rfcs/0017-transition-as-root.md',
                    ]
                },
                {
                    text: '0018-transition-class-change',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0018-transition-class-change.md',
                    ]
                },
                {
                    text: '0019-remove-data-object-declaration',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0019-prepare.md',
                        '/vue-ecology/rfcs/0019-remove-data-object-declaration.md',
                    ]
                },
                {
                    text: '0020-events-api-change',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0020-prepare.md',
                        '/vue-ecology/rfcs/0020-events-api-change.md',
                    ]
                },
                {
                    text: '0021-router-link-scoped-slot',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0021-prepare.md',
                        '/vue-ecology/rfcs/0021-router-link-scoped-slot.md',
                    ]
                },
                {
                    text: '0022-router-merge-meta-routelocation',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0022-router-merge-meta-routelocation.md',
                    ]
                },
                {
                    text: '0023-scoped-styles-changes',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0023-prepare.md',
                        '/vue-ecology/rfcs/0023-scoped-styles-changes.md',
                    ]
                },
                {
                    text: '0024-attribute-coercion-behavior',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0024-prepare.md',
                        '/vue-ecology/rfcs/0024-attribute-coercion-behavior.md',
                    ]
                },
                {
                    text: '0026-async-component-api',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0026-prepare.md',
                        '/vue-ecology/rfcs/0026-async-component-api.md',
                    ]
                },
                {
                    text: '0034-router-view-keep-alive-transitions',
                    collapsible: true,
                    children: [
                        '/vue-ecology/rfcs/0034-prepare.md',
                        '/vue-ecology/rfcs/0034-router-view-keep-alive-transitions.md',
                    ]
                },
            ]
        },
    ],
    '/base/network/': [
        {
            text: '网络相关知识',
            children: [
                '/base/network/nginx.md',
                '/base/network/samesite.md',
                '/base/network/cors.md'
            ]
        }
    ],
    '/vue-ecology/vuepress/': [
        {
            text: '基于vuepress搭建博客',
            children: [
                '/vue-ecology/vuepress/README.md',
                '/vue-ecology/vuepress/init.md',
                '/vue-ecology/vuepress/config.md',
                '/vue-ecology/vuepress/yaml-standard.md',
                '/vue-ecology/vuepress/deploy.md',
            ]
        },
    ],
    '/vue-ecology/problems/': [
        {
            text: '疑难问题',
            children: [
                '/vue-ecology/problems/README.md',
                '/vue-ecology/problems/keep-alive.md',
                '/vue-ecology/problems/table.md',
                '/vue-ecology/problems/think-of-architect.md',
            ]
        }
    ],
    '/vue-ecology/migrate/': [
        {
            text: '2.x迁移至3.x+vite',
            children: [
                '/vue-ecology/migrate/README.md',
                '/vue-ecology/migrate/day-1.md',
                '/vue-ecology/migrate/day-2.md',
                '/vue-ecology/migrate/day-3.md',
            ]
        }
    ],
    '/webgis/': [
        {
            text: 'WebGIS技术总结',
            children: [
                '/webgis/README.md',
                '/webgis/coordinate.md'
            ]
        }
    ],
    '/english-study/': [
        {
            text: '英语学习记录',
            children: [
                '/english-study/README.md',
                '/english-study/句子结构.md',
                '/english-study/短语.md'
            ]
        }
    ],
    '/base/css': [
        {
            text: 'css',
            children: [
                {
                    text: '渐变色',
                    collapsible: true,
                    children: [
                        '/base/css/gradual/font.md',
                        '/base/css/gradual/background.md',
                    ]
                },
                {
                    text: '动画',
                    collapsible: true,
                    children: [
                        '/base/css/animation/README.md',
                        '/base/css/animation/animation.md',
                        '/base/css/animation/transition.md',
                        '/base/css/animation/transform.md',
                    ]
                },
                {
                    text: '像素单位px',
                    collapsible: true,
                    children: [
                        '/base/css/unit/px.md',
                        '/base/css/unit/viewport.md',
                    ]
                },
            ]
        },
    ],
    '/base/es6-above': [
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
}

export default sidebar
