// 开启google分析
// import {googleAnalyticsPlugin} from "@vuepress/plugin-google-analytics";
// 开启本地搜索
// import {searchPlugin} from "@vuepress/plugin-search";
// 为你的文档网站提供搜索功能
// import {docsearchPlugin} from '@vuepress/plugin-docsearch'
// import {tocPlugin} from '@vuepress/plugin-toc'
// @ts-ignore
import {seoPlugin} from "vuepress-plugin-seo2";
import {sitemapPlugin} from "vuepress-plugin-sitemap2";
import {copyCodePlugin} from "vuepress-plugin-copy-code2";
import {commentPlugin} from "vuepress-plugin-comment2";
import {copyrightPlugin} from "vuepress-plugin-copyright2";

export default {
    plugins: [
        seoPlugin({
            hostname: 'ashu-guo.github.io',
            author: {
                name: 'ashu_guo',
                url: 'http://ashu-guo.github.io/'
            },
            autoDescription: true,
            canonical: 'https://ashu-guo.github.io/vue-ecology/rfcs/'
        }),
        sitemapPlugin({
            hostname: 'ashu-guo.github.io',
        }),
        copyCodePlugin({
            showInMobile: true,
        }),
        commentPlugin({
            provider: 'Giscus',
            repo: 'https://github.com/aShu-guo/giscus-discussions',
            repoId: 'R_kgDOJThJwQ',
            category: 'General',
            categoryId: 'DIC_kwDOJThJwc4CVlrP',
        }),
        copyrightPlugin({
            author: 'ashu_guo',
            license: 'MIT',
            global: true,
        }),
    ]
}
