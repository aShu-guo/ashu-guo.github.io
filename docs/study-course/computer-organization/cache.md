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

- Cache块的字长与主存块的字长相同

### 直接映射

每个主存块只能放在一个特定的位置，Cache块号=主存块号 % Cache块总数

```js
// 假设有8个Cache块，主存块号为39，那么39号主存映射到：39 % 8 = 6，即(6-1)号Cache块，因为索引是从0开始的
```

主存地址数量：256MB = 256*1024*1024B = 2^28B

行长：64B = 2^6B

Cache块总数：8 = 2^3

![img.png](/imgs/computes-course/cache-mapping-1.png)

总结：

- 
