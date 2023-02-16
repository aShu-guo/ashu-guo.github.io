// 开启google分析
// import {googleAnalyticsPlugin} from "@vuepress/plugin-google-analytics";
// 开启本地搜索
// import {searchPlugin} from "@vuepress/plugin-search";
// 为你的文档网站提供搜索功能
// import {docsearchPlugin} from '@vuepress/plugin-docsearch'
import {tocPlugin} from '@vuepress/plugin-toc'

export default {
    plugins: [
        tocPlugin({})
        // googleAnalyticsPlugin({id: 'G-0H3Z4EZZYF'}),
        // docsearchPlugin({}),
        // searchPlugin({}),
    ]
}
