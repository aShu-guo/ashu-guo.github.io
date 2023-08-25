import{_ as o,r as t,o as p,c as r,a as s,d as n,e as a,b as i}from"./app-a46f6870.js";const l="/imgs/init-press/config-1.png",c="/imgs/init-press/vuepress-config.png",d="/imgs/init-press/frontmatter.png",u="/imgs/init-press/init-sidebar.png",v={},m=i('<h1 id="项目配置" tabindex="-1"><a class="header-anchor" href="#项目配置" aria-hidden="true">#</a> 项目配置</h1><p>vuepress可以自定义站点配置，也可以为每个页面自定义配置（Frontmatter）</p><h2 id="站点配置" tabindex="-1"><a class="header-anchor" href="#站点配置" aria-hidden="true">#</a> 站点配置</h2><p>站点配置的存放路径有以下约定，默认配置存放路径为之前新建的docs目录下</p><p>默认的配置文件的搜索顺序为</p><ul><li>根目录下 <ul><li>vuepress.config.ts</li><li>vuepress.config.js</li><li>vuepress.config.mjs</li></ul></li><li>源文件目录下 <ul><li>vuepress/config.ts</li><li>vuepress/config.js</li><li>vuepress/config.mjs</li></ul></li></ul><p>所以配置文件有两种存放位置：</p><ol><li>存放在<code>根目录</code>下</li></ol><p><img src="'+l+'" alt="img.png"></p><ol start="2"><li>存放在<code>源文件目录</code>下</li></ol><p><img src="'+c+`" alt="img.png"></p><p>当然vuepress也提供了<code>--config</code>参数，提供任意指定配置文件的能力</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>vuepress dev docs <span class="token parameter variable">--config</span> my-config.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果你选择了自行指定配置文件，那么需要将上述命令更新到<code>package.json</code>的<code>scripts</code>脚本中，用于方便运行</p><h2 id="页面配置" tabindex="-1"><a class="header-anchor" href="#页面配置" aria-hidden="true">#</a> 页面配置</h2><p>vuepress支持在每个md文件最顶层包含一个YAML Frontmatter，并且首尾都需要用<code>---</code>包裹，并且被包裹的内容需要符合<code>YAML</code>语法规范</p><p><img src="`+d+'" alt="img.png"></p><blockquote><p>可以通过两种方式校验自己的Frontmatter页面配置是否规范</p></blockquote><ol><li>将自己的编写的Frontmatter通过以下地址校验</li></ol>',19),g={href:"https://www.bejson.com/validators/yaml_editor/",target:"_blank",rel:"nofollow noopener noreferrer"},b=i(`<ol start="2"><li>随意新建一个yml文件，在其中编写时对缩进更加敏感</li></ol><h2 id="拓展" tabindex="-1"><a class="header-anchor" href="#拓展" aria-hidden="true">#</a> 拓展</h2><p>在搭建过程中遇到一个容易迷惑的问题是自定义sidebar时，如果没有正确配置，会导致无法渲染除锚点</p><p>官方文档中指出，sidebar有4种类型，分别是：</p><p><code>false | &#39;auto&#39; | SidebarConfigArray | SidebarConfigObject</code></p><p>并且默认值为<code>auto</code></p><ul><li>false 表示禁用侧边栏，即在页面中不渲染侧边栏</li><li>auto 表示侧边栏会根据md文件中的标题（一级标题、二级标题...，深度可以自定义）自动生成</li><li>SidebarConfigArray 表示侧边栏可以是一个数组，数组中的元素可以是以下几种类型：<code>SidebarItem | SidebarGroup | string</code></li><li>SidebarConfigObject 表示侧边栏是一个key为string的对象</li></ul><p>需要注意的是如果想要自定义sidebar的同时，又想要自动生成md文件的锚点，那么需要如下配置：</p><ol><li>sidebar配置</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> sidebar <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&#39;/vue-ecology/vuepress/&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;基于vuepress搭建博客&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token string">&#39;/vue-ecology/vuepress/README.md&#39;</span><span class="token punctuation">,</span>
                <span class="token string">&#39;/vue-ecology/vuepress/初始化.md&#39;</span><span class="token punctuation">,</span>
                <span class="token string">&#39;/vue-ecology/vuepress/配置.md&#39;</span><span class="token punctuation">,</span>
                <span class="token string">&#39;/vue-ecology/vuepress/YAML规范.md&#39;</span><span class="token punctuation">,</span>
                <span class="token string">&#39;/vue-ecology/vuepress/部署.md&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>/vue-ecology/vuepress/初始化.md中需要指定标题</li></ol><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 初始化</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>否则sidebar会渲染为带有md后缀的标题</p><p><img src="`+u+'" alt="img.png"></p><p>由于vuepress的设计逻辑为：</p><p>如果开发者自定义的一个对象用于sidebar，那么会使用开发者自定义的配置。</p><p>只有当开发者没有自定义一个对象，而是通过字符串配置时才会自动渲染锚点</p><p>参考：</p>',18),k={href:"https://github.com/vuepress/vuepress-next/issues/824",target:"_blank",rel:"nofollow noopener noreferrer"};function h(f,_){const e=t("ExternalLinkIcon");return p(),r("div",null,[m,s("p",null,[s("a",g,[n("YAML在线校验地址"),a(e)])]),b,s("p",null,[s("a",k,[n("issue#824"),a(e)])])])}const x=o(v,[["render",h],["__file","config.html.vue"]]);export{x as default};
