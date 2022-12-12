import {defineUserConfig} from "vuepress";
import plugins from "./plugins";
import theme from "./theme/index";
// 站点基础配置
export default defineUserConfig({
    lang: 'zh-CN',
    title: 'ashu-guo',
    description: '个人技术博客:技术思考、技术方案，标准的阅读和翻译、Vue RFC阅读',
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    ...plugins,
    ...theme,
})
