# 存储系统

存储金字塔结构

![img.png](/imgs/computes-course/cache-tower.png)

## Cache的存储结构

缓存由若干缓存块（Cache Block，或Cache
Line）构成，每个缓存块存储具有连续内存地址的若干个存储单元。

每个缓存块有一个索引（Index），拼接标签值和此缓存块的索引，即可求得缓存块的内存地址。如果再加上块内偏移，就能得出任意一块数据的对应内存地址。

此外，每个缓存块还可对应若干标志位，包括有效位（valid bit）、脏位（dirty bit）、使用位（use bit）等。这些位在保证正确性、排除冲突、优化性能等方面起着重要作用。

![img.png](/imgs/computes-course/cache-structure.png)

## 内存与Cache映射规则

- 别名
    - Cache块内地址 --> 块内偏移
    - Cache块号 --> 位行号

### 直接映射

- 别名
    - 直接映射 --> 单路相联映射

每个主存块只能放在一个特定的位置，Cache块号 = 主存块号 % Cache块总数

```js
// 假设有8个Cache块，主存块号为39，那么39号主存映射到：39 % 8 = 6，即(6-1)号Cache块，因为索引是从0开始的
```

主存地址数量：256MB = 256*1024*1024B = 2<sup>28</sup>B

行长：64B = 2<sup>6</sup>B

Cache块总数：8 = 2<sup>3</sup>

![img.png](/imgs/computes-course/cache-mapping-1.png)

总结：

- 假设Cache总块数为2<sup>n</sup>，则主存块号后n位记录数据存放在Cache的块号
- Cache块的字长与主存块的字长相同

### 组相联映射

将Cache块在内部分为多个组，例如：2块为1组，每个主存块可以存放在特定组内的任意行。Cache中的组号 = 主存块号 % Cache组数

![img.png](/imgs/computes-course/cache-mapping-2.png)

总结

- 假设Cache总块数为2<sup>n</sup>，并且是k路组相联，2<sup>x</sup>=2<sup>n</sup>/k则主存块号后 x 位记录数据存放在Cache的块号
- 一个组内有几个Cache块就称为几路相联映射

### 全相联映射

内存中的数据块可以被放置到Cache的任意行

![img.png](/imgs/computes-course/cache-mapping-3.png)

总结

- 索引失效，直接通过在整个缓存空间上匹配标签进行查找

<table>
    <tbody>
    <tr>
        <th></th>
        <th>全相联</th>
        <th>直接</th>
        <th>组相联</th>
    </tr>
    <tr>
        <td>特点</td>
        <td>任意位置</td>
        <td>特定位置</td>
        <td>分组中的任意位置</td>
    </tr>
    <tr>
        <td>主存地址结构</td>
        <td>标记+块内地址</td>
        <td>标记+行号+块内地址</td>
        <td>标记+组号+块内地址</td>
    </tr>
    <tr>
        <td>优点</td>
        <td>Cache存储空间利用充分</td>
        <td>对任意地址，执行对比一个Tag，速度快</td>
        <td>折中办法</td>
    </tr>
    <tr>
        <td>缺点</td>
        <td>可以会对比所有行的标记，速度慢</td>
        <td>Cache空间利用不充分</td>
        <td>/</td>
    </tr>
    </tbody>
</table>

## 置换策略

Cache块占满之后，发生缓存失效时则必须选择一个Cache替换掉。

最理想的策略是：替换掉距离下一次访问间隔最长的Cache块，称为最久未使用算法。但是这无法真正实现，可以通过以下几种替换算法：

### RAND

随机算法，Cache失效时替换任意位置。实现简单，测试表明完全随机替换的性能近似于LRU

#### 存在的问题

存在抖动现象。

### FIFO(first input first output)

以先来先服务的方式为排队区中的人们提供服务。 先进先出，替换掉最先进去的Cache块。

#### 存在的问题

没有考虑到局部性原理，最先被调入Cache块可能是被访问最频繁的。

### LFU(Least Frequently Used)

替换掉Cache块中引用次数最少的那个

#### 实现

理想中的实现：为Cache块提供一个计数器，被引用时➕1，当发生缓存失效时剔除计数最少的那个Cache块

现实中实现时：在顶层提供一个计数器统计各个Cache块的引用数量

#### 存在的问题

当出现循环引用时，引用数会急剧升高，即使缓存失效也无法有效释放Cache块

### LRU

替换掉年龄最大的Cache块

#### 实现

需要为每个Cache块保存年龄位，而且每次使用Cache时，其他Cache块的年龄也会发生变化，发生Cache失效时替换掉年龄最大的块。

#### 存在的问题

成本高昂

## 数据一致性

CPU修改了Cache块中的数据，为了保证与下级内存的数据一致性，需要适时的把更新传播下去。一般有两种回写策略：写回（Write
back）和写通（Write through）。

### 写回（Write back）

Cache块的数据发生更改时，不会立刻写入内存。而是在Cache将要被替换时才会写入内存中，减少了内存的写操作，但是会存在数据不一致的隐患。

为了进一步减少替换时的写入操作，通常会提供一个dirty bit，标记Cache是否发生过更新数据的操作。如果在置换回内存时dirty
bit为false，则无需写入内存。

### 写通（Write through）

Cache块的数据发生更改时，立刻同时写入内存。由于会存在大量的写操作，有必要设置一个缓冲来减少硬件冲突。

## 虚拟内存


