> enum

> const enum 与 enum区别


> enum 与 as const 区别


> 遍历enum

1. for...in...

```typescript
// number enum
enum AA{
  aa,
  bb,
  cc
}

// output: {'aa':0,0:'aa','bb':1,1:'bb','cc':2,2:'cc'}
console.log(AA)

for (const item in AA) {
  if(isNaN(Number(item))){
    console.log(item)
  }
}
```



2. Object.keys(obj)

```typescript
// string enum
enum BB {
  aa = 'aa',
  bb = 'bb'
}

(Object.keys(BB) as Array<keyof typeof BB>).map(key => {
  console.log(BB[key]);
});
```

