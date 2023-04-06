import {defineUserConfig} from "vuepress";
import plugins from "./plugins";
import theme from "./theme/index";
// 站点基础配置
export default defineUserConfig({
    lang: 'zh-CN',
    title: 'aShu_guo技术博客',
    description: '个人技术博客，记录vue生态学习过程（例如Vue RFC翻译、新特性学习）',
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    head: [
        ['meta', {name: 'keywords', content: '技术博客,Vue RFC中文,vue-rfcs中文,英语学习,计算机图形学'}],
        ['meta', {name: 'baidu-site-verification', content: 'codeva-N62lSHdiac'}],
        ['meta', {name: 'google-site-verification', content: '50WKctzOTIJE2PQ2mSHqNE0grbjjKmmUJWFkbN1NdfA'}],
        // 向 Google 表明该网页适合移动设备
        ['meta', {name: 'viewport', content: 'width=device-width, initial-scale=1'}],
        ['script', {}, `
        var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?1018dd87d1b5e3227f4af1ff2ea60dea";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();`],
    ],
    markdown: {
        headers: {
            level: [2, 3, 4]
        },
        links: {
            //
            externalAttrs: {
                target: '_blank',
                rel: 'nofollow noopener noreferrer'
            }
        }
    },
    ...plugins,
    ...theme,
})
