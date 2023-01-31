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
    head: [
        ['script', {}, `
        var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?1018dd87d1b5e3227f4af1ff2ea60dea";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();`]
    ],
    markdown: {
        headers: {
            level: [2, 3, 4]
        }
    },
    ...plugins,
    ...theme,
})
