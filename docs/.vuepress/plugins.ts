// 开启google分析
import {googleAnalyticsPlugin} from "@vuepress/plugin-google-analytics";
// 开启本地搜索
import {searchPlugin} from "@vuepress/plugin-search";
// 开启语法高亮
import {prismjsPlugin} from '@vuepress/plugin-prismjs'

export default {
    plugins: [
        googleAnalyticsPlugin({id: '4349098458'}),
        searchPlugin({}),
        prismjsPlugin({}),
    ]
}
