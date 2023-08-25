import{_ as i,r as t,o as d,c as o,a as n,d as e,e as s,b as l}from"./app-a46f6870.js";const c="/imgs/db/uuid-datatype.png",r="/imgs/db/uuid-pk.png",p="/imgs/db/uuid-insert-last-id.png",u={},m=l('<h1 id="主键" tabindex="-1"><a class="header-anchor" href="#主键" aria-hidden="true">#</a> 主键</h1><h2 id="q-a" tabindex="-1"><a class="header-anchor" href="#q-a" aria-hidden="true">#</a> Q&amp;A</h2><h3 id="自增长主键存在哪些问题" tabindex="-1"><a class="header-anchor" href="#自增长主键存在哪些问题" aria-hidden="true">#</a> 自增长主键存在哪些问题？</h3><p>自增长主键会暴露<code>场外信息</code>，竞品可能通过注册账号判断产品的月获客数量。</p><p>但是如果使用UUID作为PK会存在性能问题：对于InnoDB，插入数据时并不是将数据放在表的末尾，而是会移动旧数据，后再插入新数据。对于大表而言，插入会非常缓慢。使用<code>varchar</code> 作为存储类型时，一条数据行占用的存储容量也比较大。</p><p>解决方案：</p><ol><li>设置datatype为<code>binary(16)</code></li><li>默认值设置为<code>uuid_to_bin(uuid(), 1)</code></li></ol><p><img src="'+c+`" alt="img.png"></p><p>但是对于master/slave，设置uuid为默认值会导致值不相同，mysql会抛出</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>statement is unsafe because it uses a system function that may return a different value on the replica
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最佳实践是设置<code>TRIGGER</code>，在插入数据时生成uuid：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>DELIMITER <span class="token punctuation">;</span><span class="token punctuation">;</span>
CREATE TRIGGER before_insert_tablename
BEFORE INSERT ON tablename
FOR EACH ROW
BEGIN
  IF new.id IS NULL THEN
    SET new.id <span class="token operator">=</span> UUID_TO_BIN<span class="token punctuation">(</span>UUID<span class="token punctuation">(</span><span class="token punctuation">)</span>,1<span class="token punctuation">)</span><span class="token punctuation">;</span>
  END IF<span class="token punctuation">;</span>
END
<span class="token punctuation">;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+r+`" alt="img.png"></p><p>观察id发现它们之间有很多相同的部分，似乎可以预测。原因是mysql中的<code>uuid()</code> 使用的是v1，而且uuid并不是被设计为不可预测的，如果希望生成完全不相同的uuid，可以使用v4来生成。</p><p>因为存储的是二进制的uuid，在查询时需要decode下，转换成真实的uuid查询：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">select</span> * from <span class="token function">users</span> where <span class="token assign-left variable">user_id</span><span class="token operator">=</span>uuid_to_bin<span class="token punctuation">(</span><span class="token string">&#39;2edc7cee-3596-11ee-ba3a-4215a4f8edbc&#39;</span>, <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment"># or</span>

<span class="token keyword">select</span> * from <span class="token function">users</span> where bin_to_uuid<span class="token punctuation">(</span>user_id, <span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">=</span><span class="token string">&#39;2edc7cee-3596-11ee-ba3a-4215a4f8edbc&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="优缺点" tabindex="-1"><a class="header-anchor" href="#优缺点" aria-hidden="true">#</a> 优缺点</h4><p>优点：</p><ol><li>任何时候都是唯一的，这在跨数据库上是有利的</li><li>使迁移、复制备份变得容易</li><li>可以离线生成</li></ol><p>缺点：</p><ol><li>很吃存储，但是存储并不贵</li><li>无法根据id获取插入顺序</li><li>url上看着很丑</li></ol><p>对于数据库的拓展以及迁移成本而言，个人更倾向于使用uuid作为主键。如果一开始设置为自增主键作为id，随着业务数据的不断膨胀以及多个分布式业务表数据相互交织，自增主键id的缺点便会变得愈发明显。</p><h4 id="拓展" tabindex="-1"><a class="header-anchor" href="#拓展" aria-hidden="true">#</a> 拓展</h4><ol><li>删除<code>TRIGGER</code>的命令：</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>DROP TRIGGER <span class="token punctuation">[</span>IF EXISTS<span class="token punctuation">]</span> <span class="token punctuation">[</span>schema_name.<span class="token punctuation">]</span>trigger_name<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>如果使用<code>TRIGGER</code>自动生成插入数据的id，那如何获取上次插入数据的uuid呢？</li></ol><p>测试发现<code>LAST_INSERT_ID()</code>并没有效果：</p><p><img src="`+p+'" alt="img.png"></p><p>解决方案：</p><ul><li>不使用<code>TRIGGER</code>自动生成id，在项目中生成uuid，如此便可以事先知道要插入数据的id；</li><li>在<code>TRIGGER</code>中设置变量，插入后查询变量的值；</li></ul>',30),v={href:"https://stackoverflow.com/questions/61650560/generating-completely-different-uuid-for-mysql",target:"_blank",rel:"nofollow noopener noreferrer"},h={href:"https://lefred.be/content/mysql-uuids/",target:"_blank",rel:"nofollow noopener noreferrer"},b={href:"https://stackoverflow.com/questions/45399/advantages-and-disadvantages-of-guid-uuid-database-keys",target:"_blank",rel:"nofollow noopener noreferrer"};function k(g,_){const a=t("ExternalLinkIcon");return d(),o("div",null,[m,n("p",null,[e("参考： 【1】"),n("a",v,[e("generating completely different uuid for mysql"),s(a)])]),n("p",null,[e("【2】"),n("a",h,[e("MySQL & UUIDs"),s(a)])]),n("p",null,[e("【3】"),n("a",b,[e("Advantages and disadvantages of GUID / UUID database keys"),s(a)])])])}const I=i(u,[["render",k],["__file","primary-key.html.vue"]]);export{I as default};
