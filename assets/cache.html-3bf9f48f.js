import{_ as a,o as e,c as h,b as t}from"./app-a46f6870.js";const i="/imgs/computes-course/cache-tower.png",r="/imgs/computes-course/cache-structure.png",d="/imgs/computes-course/cache-mapping-1.png",c="/imgs/computes-course/cache-mapping-2.png",p="/imgs/computes-course/cache-mapping-3.png",s={},n=t('<h1 id="存储系统" tabindex="-1"><a class="header-anchor" href="#存储系统" aria-hidden="true">#</a> 存储系统</h1><p>存储金字塔结构</p><p><img src="'+i+'" alt="img.png"></p><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>别名：</p><p>Cache -&gt; 片上缓存</p><p>主存 -&gt; 内存（Memory）</p></div><h2 id="cache的存储结构" tabindex="-1"><a class="header-anchor" href="#cache的存储结构" aria-hidden="true">#</a> Cache的存储结构</h2><p>缓存由若干缓存块（Cache Block，或Cache Line）构成，每个缓存块存储具有连续内存地址的若干个存储单元。</p><p>每个缓存块有一个索引（Index），拼接标签值和此缓存块的索引，即可求得缓存块的内存地址。如果再加上块内偏移，就能得出任意一块数据的对应内存地址。</p><p>此外，每个缓存块还可对应若干标志位，包括有效位（valid bit）、脏位（dirty bit）、使用位（use bit）等。这些位在保证正确性、排除冲突、优化性能等方面起着重要作用。</p><p><img src="'+r+`" alt="img.png"></p><h2 id="内存与cache映射规则" tabindex="-1"><a class="header-anchor" href="#内存与cache映射规则" aria-hidden="true">#</a> 内存与Cache映射规则</h2><ul><li>别名 <ul><li>Cache块内地址 --&gt; 块内偏移</li><li>Cache块号 --&gt; 位行号</li></ul></li></ul><h3 id="直接映射" tabindex="-1"><a class="header-anchor" href="#直接映射" aria-hidden="true">#</a> 直接映射</h3><ul><li>别名 <ul><li>直接映射 --&gt; 单路相联映射</li></ul></li></ul><p>每个主存块只能放在一个特定的位置，Cache块号 = 主存块号 % Cache块总数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 假设有8个Cache块，主存块号为39，那么39号主存映射到：39 % 8 = 6，即(6-1)号Cache块，因为索引是从0开始的</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>主存地址数量：256MB = 256<em>1024</em>1024B = 2<sup>28</sup>B</p><p>行长：64B = 2<sup>6</sup>B</p><p>Cache块总数：8 = 2<sup>3</sup></p><p><img src="`+d+'" alt="img.png"></p><p>总结：</p><ul><li>假设Cache总块数为2<sup>n</sup>，则主存块号后n位记录数据存放在Cache的块号</li><li>Cache块的字长与主存块的字长相同</li></ul><h3 id="组相联映射" tabindex="-1"><a class="header-anchor" href="#组相联映射" aria-hidden="true">#</a> 组相联映射</h3><p>将Cache块在内部分为多个组，例如：2块为1组，每个主存块可以存放在特定组内的任意行。Cache中的组号 = 主存块号 % Cache组数</p><p><img src="'+c+'" alt="img.png"></p><p>总结</p><ul><li>假设Cache总块数为2<sup>n</sup>，并且是k路组相联，2<sup>x</sup>=2<sup>n</sup>/k则主存块号后 x 位记录数据存放在Cache的块号</li><li>一个组内有几个Cache块就称为几路相联映射</li></ul><h3 id="全相联映射" tabindex="-1"><a class="header-anchor" href="#全相联映射" aria-hidden="true">#</a> 全相联映射</h3><p>内存中的数据块可以被放置到Cache的任意行</p><p><img src="'+p+'" alt="img.png"></p><p>总结</p><ul><li>索引失效，直接通过在整个缓存空间上匹配标签进行查找</li></ul><table><tbody><tr><th></th><th>全相联</th><th>直接</th><th>组相联</th></tr><tr><td>特点</td><td>任意位置</td><td>特定位置</td><td>分组中的任意位置</td></tr><tr><td>主存地址结构</td><td>标记+块内地址</td><td>标记+行号+块内地址</td><td>标记+组号+块内地址</td></tr><tr><td>优点</td><td>Cache存储空间利用充分</td><td>对任意地址，执行对比一个Tag，速度快</td><td>折中办法</td></tr><tr><td>缺点</td><td>可以会对比所有行的标记，速度慢</td><td>Cache空间利用不充分</td><td>/</td></tr></tbody></table><h2 id="置换策略" tabindex="-1"><a class="header-anchor" href="#置换策略" aria-hidden="true">#</a> 置换策略</h2><p>Cache块占满之后，发生缓存失效时则必须选择一个Cache替换掉。</p><p>最理想的策略是：替换掉距离下一次访问间隔最长的Cache块，称为最久未使用算法。但是这无法真正实现，可以通过以下几种替换算法：</p><h3 id="rand" tabindex="-1"><a class="header-anchor" href="#rand" aria-hidden="true">#</a> RAND</h3><p>随机算法，Cache失效时替换任意位置。实现简单，测试表明完全随机替换的性能近似于LRU</p><h4 id="存在的问题" tabindex="-1"><a class="header-anchor" href="#存在的问题" aria-hidden="true">#</a> 存在的问题</h4><p>存在抖动现象。</p><h3 id="fifo-first-input-first-output" tabindex="-1"><a class="header-anchor" href="#fifo-first-input-first-output" aria-hidden="true">#</a> FIFO(first input first output)</h3><p>以先来先服务的方式为排队区中的人们提供服务。 先进先出，替换掉最先进去的Cache块。</p><h4 id="存在的问题-1" tabindex="-1"><a class="header-anchor" href="#存在的问题-1" aria-hidden="true">#</a> 存在的问题</h4><p>没有考虑到局部性原理，最先被调入Cache块可能是被访问最频繁的。</p><h3 id="lfu-least-frequently-used" tabindex="-1"><a class="header-anchor" href="#lfu-least-frequently-used" aria-hidden="true">#</a> LFU(Least Frequently Used)</h3><p>替换掉Cache块中引用次数最少的那个</p><h4 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h4><p>理想中的实现：为Cache块提供一个计数器，被引用时➕1，当发生缓存失效时剔除计数最少的那个Cache块</p><p>现实中实现时：在顶层提供一个计数器统计各个Cache块的引用数量</p><h4 id="存在的问题-2" tabindex="-1"><a class="header-anchor" href="#存在的问题-2" aria-hidden="true">#</a> 存在的问题</h4><p>当出现循环引用时，引用数会急剧升高，即使缓存失效也无法有效释放Cache块</p><h3 id="lru" tabindex="-1"><a class="header-anchor" href="#lru" aria-hidden="true">#</a> LRU</h3><p>替换掉年龄最大的Cache块</p><h4 id="实现-1" tabindex="-1"><a class="header-anchor" href="#实现-1" aria-hidden="true">#</a> 实现</h4><p>需要为每个Cache块保存年龄位，而且每次使用Cache时，其他Cache块的年龄也会发生变化，发生Cache失效时替换掉年龄最大的块。</p><h4 id="存在的问题-3" tabindex="-1"><a class="header-anchor" href="#存在的问题-3" aria-hidden="true">#</a> 存在的问题</h4><p>成本高昂</p><h2 id="数据一致性" tabindex="-1"><a class="header-anchor" href="#数据一致性" aria-hidden="true">#</a> 数据一致性</h2><p>CPU修改了Cache块中的数据，为了保证与下级内存的数据一致性，需要适时的把更新传播下去。一般有两种回写策略：写回（Write back）和写通（Write through）。</p><h3 id="写回-write-back" tabindex="-1"><a class="header-anchor" href="#写回-write-back" aria-hidden="true">#</a> 写回（Write back）</h3><p>Cache块的数据发生更改时，不会立刻写入内存。而是在Cache将要被替换时才会写入内存中，减少了内存的写操作，但是会存在数据不一致的隐患。</p><p>为了进一步减少替换时的写入操作，通常会提供一个dirty bit，标记Cache是否发生过更新数据的操作。如果在置换回内存时dirty bit为false，则无需写入内存。</p><h3 id="写通-write-through" tabindex="-1"><a class="header-anchor" href="#写通-write-through" aria-hidden="true">#</a> 写通（Write through）</h3><p>Cache块的数据发生更改时，立刻同时写入内存。由于会存在大量的写操作，有必要设置一个缓冲来减少硬件冲突。</p><h2 id="虚拟内存" tabindex="-1"><a class="header-anchor" href="#虚拟内存" aria-hidden="true">#</a> 虚拟内存</h2><p>计算机系统内存管理的一种技术，即把地址空间定义为“连续的虚拟内存地址”，以借此“欺骗”程序，使它们以为自己正在使用一大块的“连续”地址。</p><p>要注意的是，虚拟内存不只是<code>“用磁盘空间来扩展物理内存”</code>的意思，这只是虚拟内存技术的结果。</p><h3 id="分页技术" tabindex="-1"><a class="header-anchor" href="#分页技术" aria-hidden="true">#</a> 分页技术</h3><p>是一种操作系统里存储器管理的一种技术，使主存可以使用存储在辅助存储器中的资料。操作系统会将<code>辅助存储器（通常是磁盘）</code> 中的资料分割成固定大小的区块，称为“页”（pages）。</p><p>当不需要时，将分页由主存（通常是内存）移到辅助存储器；</p><p>当需要时，再将资料取回，加载主存中。相对于分段，分页允许存储器存储于不连续的区块以维持文件系统的整齐。</p><p>分页是磁盘和内存间传输数据块的最小单位。</p><p><strong>虚拟内存和分页技术总是同时存在的。</strong></p><h2 id="常见存储" tabindex="-1"><a class="header-anchor" href="#常见存储" aria-hidden="true">#</a> 常见存储</h2><ul><li>闪存</li><li>机械硬盘</li><li>固态</li></ul><h2 id="练习" tabindex="-1"><a class="header-anchor" href="#练习" aria-hidden="true">#</a> 练习</h2><ol><li>某文件系统采用多级索引结构，若磁盘块的大小为512字节，每个块号需占3字节，那么根索引采用一级索引时的文件最大长度为（）KB；采用二级索引时的文件最大长度为（）KB</li></ol><p>遇到计算磁盘大小的习题，首先计算<code>磁盘总块数</code>。</p><p>直接地址索引：直接存放数据块</p><p>间接地址索引：它有几个分类，一级间接地址索引、二级间接地址索引、三级间接地址索引...</p><p>计算时，直接地址索引映射一个物理块，n级间接地址索引为<code>n * 磁盘总块数</code>个物理块，再乘每个物理块的容量大小即可计算出可存储的数据大小。</p><p>答：总块数：512/3=170 一级间接地址存储容量：<code>170*512/1024</code> 一级间接地址存储容量：<code>170*512*512/1024</code></p><ol start="2"><li>数据存储的不同排列顺序，读取和处理消耗的时间计算问题</li></ol>',82),l=[n];function u(o,f){return e(),h("div",null,l)}const C=a(s,[["render",u],["__file","cache.html.vue"]]);export{C as default};