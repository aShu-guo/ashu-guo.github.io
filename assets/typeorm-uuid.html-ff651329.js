import{_ as p,r as o,o as i,c,a as s,d as n,e,b as t}from"./app-a46f6870.js";const l={},u=t(`<h1 id="typeorm-uuid作为pk" tabindex="-1"><a class="header-anchor" href="#typeorm-uuid作为pk" aria-hidden="true">#</a> typeorm UUID作为PK</h1><h2 id="原因" tabindex="-1"><a class="header-anchor" href="#原因" aria-hidden="true">#</a> 原因</h2><p>权限设计作为项目的基础模块，并且由于多个业务模块都共用该权限模块，考虑到后续业务扩展性以及跨数据库的键唯一，使用uuid作为主键。</p><p>但是如果使用<code>UUID</code>作为PK会存在性能问题：对于<code>InnoDB</code>，插入数据时并不是直接将数据放在表的末尾，而是会移动旧数据，后再插入新数据。对于大表而言，插入会非常缓慢。</p><p>另外，使用<code>varchar</code>或者<code>char</code>作为存储类型时，虽然数据行中的字段值是人类友好的格式，但是一条数据行占用的存储容量也比较大。</p><p>解决方案：</p><ol><li>设置datatype为<code>binary(16)</code>，节省存储空间</li><li>默认值设置为<code>uuid_to_bin(uuid(), 1)</code></li></ol><h2 id="实践" tabindex="-1"><a class="header-anchor" href="#实践" aria-hidden="true">#</a> 实践</h2><p>首先新建两张表：roles和users</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- auto-generated definition
create table roles
(
    id          binary(16)               not null
        primary key,
    name        varchar(36)              not null comment &#39;角色名&#39;,
    slug        varchar(36)              not null comment &#39;角色简称&#39;,
    create_time datetime default (now()) not null comment &#39;创建时间&#39;,
    update_time datetime default (now()) not null on update CURRENT_TIMESTAMP comment &#39;更新时间&#39;,
    valid       tinyint  default 1       not null comment &#39;数据是否合法&#39;
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- auto-generated definition
create table users
(
    id          binary(16)               not null
        primary key,
    role_id     binary(16)               not null comment &#39;角色表主键&#39;,
    name        varchar(10)              not null comment &#39;用户名&#39;,
    password    varchar(255)             not null comment &#39;登录密码&#39;,
    status      tinyint  default 0       not null comment &#39;用户状态：0-正常 1-冻结&#39;,
    nick_name   varchar(10)              null comment &#39;昵称&#39;,
    create_time datetime default (now()) not null comment &#39;创建时间&#39;,
    update_time datetime default (now()) not null on update CURRENT_TIMESTAMP comment &#39;更新时间&#39;,
    valid       tinyint  default 1       not null comment &#39;数据是否有效&#39;,
);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="设置默认值" tabindex="-1"><a class="header-anchor" href="#设置默认值" aria-hidden="true">#</a> 设置默认值</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>alter table users
    add uuid binary(16) default uuid_to_bin(uuid(), 1) null after id;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>mysql可能会抛出：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>statement is unsafe because it uses a system function that may return a different value on the replica
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>原因是：插入数据时的字段默认值如果使用系统函数，会造成分布式数据库存储时返回值不一致，从而导致数据不一致问题。</p><p>最佳实践是使用<code>TRIGGER</code>确保插入新记录时产生的值是相同的（<a href="#%E4%B8%BA%E4%BB%80%E4%B9%88trigger%E5%8F%AF%E4%BB%A5%E7%A1%AE%E4%BF%9D%E6%8F%92%E5%85%A5%E6%96%B0%E8%AE%B0%E5%BD%95%E6%97%B6%E4%BA%A7%E7%94%9F%E7%9A%84%E5%80%BC%E6%98%AF%E7%9B%B8%E5%90%8C%E7%9A%84">原因</a>）</p><h3 id="设置trigger" tabindex="-1"><a class="header-anchor" href="#设置trigger" aria-hidden="true">#</a> 设置<code>TRIGGER</code></h3><p>设置roles的<code>TRIGGER</code>，在插入数据时设置id</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DELIMITER ;;
CREATE TRIGGER before_insert_roles
BEFORE INSERT ON roles
FOR EACH ROW
BEGIN
  IF new.id IS NULL THEN
    SET new.id = UUID_TO_BIN(UUID(),1);
  END IF;
END
;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置users的<code>TRIGGER</code>，在插入数据时设置id</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DELIMITER ;;
CREATE TRIGGER before_insert_users
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
  IF new.id IS NULL THEN
    SET new.id = UUID_TO_BIN(UUID(),1);
  END IF;
END
;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是之前使用自增int类型pk时，可以通过<code>select last_insert_id();</code>获取上一次插入数据的ID，在同一事务中使用。但是通过<code>TRIGGER</code> 赋值给id时，<code>select last_insert_id();</code>会失效，那么如何获取插入数据的id呢？</p><p>解决方案有两种：</p><ol><li>插入数据之前，在项目中生成uuid</li><li>在数据库中通过<code>TRIGGER</code>生成uuid，后设置到mysql变量中，再select变量获取上次插入数据的id。</li></ol><p>第二种方案比较复杂，而且如果存在多个生成uuid的<code>TRIGGER</code>，那么设置mysql变量时：</p><ul><li>需要保证变量名的唯一。</li><li>存在并发问题，多个服务在插入数据时都会修改变量，除非在插入数据时加锁。</li></ul><p>故而选择第一种方案，在项目中生成uuid并在插入时给值。</p><h2 id="集成typeorm" tabindex="-1"><a class="header-anchor" href="#集成typeorm" aria-hidden="true">#</a> 集成typeorm</h2>`,29),r={href:"https://docs.nestjs.com/techniques/database",target:"_blank",rel:"nofollow noopener noreferrer"},d=s("p",null,"那么如何typeorm是如何映射binary类型的pk呢？",-1),k={href:"https://github.com/typeorm/typeorm/issues/3187",target:"_blank",rel:"nofollow noopener noreferrer"},m=t(`<div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>We were considering this before, but decided to go simple way because of complexity of implementation and the fact that
only mysql 8 support uuid functions.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>库开发者称：之前有考虑的这个问题，但是由于实现复杂度而且只有mysql-8.0版本才支持uuid函数，所以只简单的实现。</p><p>那么既然官方没有提供支持，开发者自己如何实现呢？</p><h3 id="entity" tabindex="-1"><a class="header-anchor" href="#entity" aria-hidden="true">#</a> entity</h3><p>users table的实体类如下：</p><p>其中需要注意的是<code>transformer: UUIDWithSwapTransform</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// orm-utils.ts</span>
<span class="token doc-comment comment">/**
 * mysql数据类型为binary(16)
 * ex:
 *  in: 0x11EE35B38DDECE46BA3A4215A4F8EDBC
 *  out: ec74ff16-35b3-11ee-ba3a-4215a4f8edbc
 */</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> UUIDWithSwapTransform<span class="token operator">:</span> ValueTransformer <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">to</span><span class="token operator">:</span> <span class="token punctuation">(</span>uuid<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> uuid
            <span class="token operator">?</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>
                uuid<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">14</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">)</span> <span class="token operator">+</span> uuid<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">)</span> <span class="token operator">+</span> uuid<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span> <span class="token operator">+</span> uuid<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">19</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">)</span> <span class="token operator">+</span> uuid<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token string">&#39;hex&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">)</span>
            <span class="token operator">:</span> uuid<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">from</span><span class="token operator">:</span> <span class="token punctuation">(</span>bin<span class="token operator">:</span> Buffer<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// 插入数据时，typrom返回的数据id长度有误</span>
        <span class="token keyword">return</span> bin<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token string">&#39;hex&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">32</span>
            <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>bin<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token string">&#39;hex&#39;</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>bin<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token string">&#39;hex&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>bin<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token string">&#39;hex&#39;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>bin<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>
                <span class="token string">&#39;hex&#39;</span><span class="token punctuation">,</span>
                <span class="token number">8</span><span class="token punctuation">,</span>
                <span class="token number">10</span><span class="token punctuation">,</span>
            <span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>bin<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token string">&#39;hex&#39;</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
            <span class="token operator">:</span> bin<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token string">&#39;hex&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// users.entity.ts</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Entity</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>name<span class="token operator">:</span> <span class="token string">&#39;users&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">UsersEntity</span> <span class="token punctuation">{</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">PrimaryColumn</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        type<span class="token operator">:</span> <span class="token string">&#39;binary&#39;</span><span class="token punctuation">,</span>
        length<span class="token operator">:</span> <span class="token number">16</span><span class="token punctuation">,</span>
        generated<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        transformer<span class="token operator">:</span> UUIDWithSwapTransform<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    id<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

    <span class="token decorator"><span class="token at operator">@</span><span class="token function">Column</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        name<span class="token operator">:</span> <span class="token string">&#39;role_id&#39;</span><span class="token punctuation">,</span>
        type<span class="token operator">:</span> <span class="token string">&#39;binary&#39;</span><span class="token punctuation">,</span>
        length<span class="token operator">:</span> <span class="token number">16</span><span class="token punctuation">,</span>
        transformer<span class="token operator">:</span> UUIDWithSwapTransform<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    roleId<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

    <span class="token decorator"><span class="token at operator">@</span><span class="token function">Column</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

    <span class="token decorator"><span class="token at operator">@</span><span class="token function">Column</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    password<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

    <span class="token decorator"><span class="token at operator">@</span><span class="token function">Column</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>name<span class="token operator">:</span> <span class="token string">&#39;nick_name&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    nickName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

    <span class="token decorator"><span class="token at operator">@</span><span class="token function">Column</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    status<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>

    <span class="token decorator"><span class="token at operator">@</span><span class="token function">Column</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        name<span class="token operator">:</span> <span class="token string">&#39;create_time&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    createTime<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

    <span class="token decorator"><span class="token at operator">@</span><span class="token function">Column</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        name<span class="token operator">:</span> <span class="token string">&#39;update_time&#39;</span><span class="token punctuation">,</span>
        <span class="token keyword">default</span><span class="token operator">:</span> <span class="token function">dayjs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&#39;YYYY-MM-DD HH:mm:ss&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    updateTime<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

    <span class="token decorator"><span class="token at operator">@</span><span class="token function">Column</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token keyword">default</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    valid<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>userService</code>调用<code>userRepository</code>插入数据库时，需要自行设置id：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>v1 <span class="token keyword">as</span> uuidv1<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;uuid&#39;</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span>
    <span class="token comment">// inject Repository</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">InjectRepository</span></span><span class="token punctuation">(</span>UsersEntity<span class="token punctuation">)</span> <span class="token keyword">private</span> userRepository<span class="token operator">:</span> Repository<span class="token operator">&lt;</span>UsersEntity<span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// new entity</span>
        <span class="token keyword">const</span> entity <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserEntity</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        entity<span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token function">uuidv1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// insert database</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>userRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>entity<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有读者发现transform中的from函数为什么需要首先判断<code>bin.toString(&#39;hex&#39;).length === 32</code>，原因是在实践过程中发现，如果from没有这个判断：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token function-variable function">from</span><span class="token operator">:</span> <span class="token punctuation">(</span>bin<span class="token operator">:</span> Buffer<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 插入数据时，typrom返回的数据id长度有误</span>
    <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>bin<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token string">&#39;hex&#39;</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>bin<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token string">&#39;hex&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>bin<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token string">&#39;hex&#39;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>bin<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>
        <span class="token string">&#39;hex&#39;</span><span class="token punctuation">,</span>
        <span class="token number">8</span><span class="token punctuation">,</span>
        <span class="token number">10</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>bin<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token string">&#39;hex&#39;</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在userService调用<code>save</code>函数时返回的实体id有问题，发现id重复了6遍：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;295c0610-3742-11ee-a82c-4d8752150610-295c0610-3742-11ee-a82c-4d8752150610-295c0610-3742-11ee-a82c-4d8752150610-295c0610-3742-11ee-a82c-4d8752150610-295c0610-3742-11ee-a82c-4d8752150610&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;roleId&quot;</span><span class="token operator">:</span> <span class="token string">&quot;8ddece46-35b3-11ee-ba3a-4215a4f8edbc&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xiaohuang&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;updateTime&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2023-08-10 13:53:00&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加<code>bin.toString(&#39;hex&#39;).length === 32</code>执行save时，返回的数据时正常的：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;65146a30-3742-11ee-bcd9-e1f122158786&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;roleId&quot;</span><span class="token operator">:</span> <span class="token string">&quot;8ddece46-35b3-11ee-ba3a-4215a4f8edbc&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xiaohuang&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;updateTime&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2023-08-10 13:54:40&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="q-a" tabindex="-1"><a class="header-anchor" href="#q-a" aria-hidden="true">#</a> Q&amp;A</h2><h3 id="为什么trigger可以确保插入新记录时产生的值是相同的" tabindex="-1"><a class="header-anchor" href="#为什么trigger可以确保插入新记录时产生的值是相同的" aria-hidden="true">#</a> 为什么<code>TRIGGER</code>可以确保插入新记录时产生的值是相同的？</h3><p>为什么在master/slave的数据库中，<code>TRIGGER</code>可以确保插入新记录时产生的值是相同的呢？</p><blockquote><p>With statement-based replication, triggers executed on the master also execute on the slave. With row-based replication, triggers executed on the master do not execute on the slave. Instead, the row changes on the master resulting from trigger execution are replicated and applied on the slave.</p></blockquote><p>最后一句：<code>master</code>上<code>TRIGGER</code>产生的行为也会应用到<code>slave</code>上</p><p>参考：</p>`,21),v={href:"https://github.com/typeorm/typeorm/issues/3187",target:"_blank",rel:"nofollow noopener noreferrer"},b={href:"https://dev.mysql.com/doc/refman/8.0/en/replication-features-triggers.html",target:"_blank",rel:"nofollow noopener noreferrer"};function g(h,f){const a=o("ExternalLinkIcon");return i(),c("div",null,[u,s("p",null,[n("此处参考"),s("a",r,[n("nestjs官方文档"),e(a)]),n("即可")]),d,s("p",null,[n("在"),s("a",k,[n("issue#3187"),e(a)]),n("中提到：")]),m,s("p",null,[n("【1】"),s("a",v,[n("Store UUID as binary type in MySQL"),e(a)])]),s("p",null,[n("【2】"),s("a",b,[n("17.5.1.36 Replication and Triggers"),e(a)])])])}const E=p(l,[["render",g],["__file","typeorm-uuid.html.vue"]]);export{E as default};
