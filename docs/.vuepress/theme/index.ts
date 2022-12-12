import {defaultTheme} from "vuepress";
import navbar from './navbar'
import sidebar from "./sidebar";

export default {
    theme: defaultTheme({
        repo: 'https://github.com/aShu-guo/ashu-guo.github.io',
        editLink: true,
        editLinkText: '编辑此页',
        docsBranch: 'master',
        lastUpdated: true,
        lastUpdatedText: '最近更新时间',
        backToHome: '返回首页',
        openInNewWindow: '在新窗口打开',
        toggleColorMode: '切换颜色',
        toggleSidebar: '切换侧边栏',
        contributors: true,
        navbar,
        sidebarDepth: 4,
        sidebar
    })
}
