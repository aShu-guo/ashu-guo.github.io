// 开启google分析
import {googleAnalyticsPlugin} from "@vuepress/plugin-google-analytics";
// 开启本地搜索
import {searchPlugin} from "@vuepress/plugin-search";
// 开启语法高亮
// import {prismjsPlugin} from '@vuepress/plugin-prismjs'

// 添加一个 返回顶部 按钮
import {backToTopPlugin} from '@vuepress/plugin-back-to-top'
// 为图片提供可缩放的功能
import {mediumZoomPlugin} from '@vuepress/plugin-medium-zoom'
// 为你的文档网站提供搜索功能
import {docsearchPlugin} from '@vuepress/plugin-docsearch'
// 收集你页面的 Git 信息，包括创建和更新时间、贡献者等。
import {gitPlugin} from '@vuepress/plugin-git'
// 提供一个目录 (table-of-contents, TOC) 组件
import {tocPlugin} from '@vuepress/plugin-toc'

export default {
    plugins: [
        googleAnalyticsPlugin({id: 'G-0H3Z4EZZYF'}),
        // backToTopPlugin(),
        // mediumZoomPlugin(),
        // gitPlugin(),
        // tocPlugin(),
        // docsearchPlugin({}),
        // searchPlugin({}),
        // prismjsPlugin({}),
    ]
}
