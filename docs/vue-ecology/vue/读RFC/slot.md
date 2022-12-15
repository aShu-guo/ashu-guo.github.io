> 作用域slot

在2.5版本之前，使用slot-scope必须配合template；为了代码更简，在2.5版本中，不再有必须使用template的限制。但是也导致了更多的问题



```
https://codesandbox.io/s/crimson-meadow-k40v6d?file=/src/views/Home.vue:0-783
```



```vue
// foo.vue
<div>
    <div>我是一个slot</div>
    <slot :text="text" :student="student"></slot>
</div>

<script>
export default{
  name:'Foo',
  data(){
    return {
      text:'123123',
      student:{name:'xiaoming',age:25}
    }
  }
}
</script>
```



由于取消了template的限制，那么slot-scope可以添加在普通元素以及组件上

```vue
<!-- 将传入slot的props作为一个对象传递 -->
<foo>
	<div slot-scope="slotProps">
    
  </div>
</foo>

<!-- 当然也可以使用解构 -->
<foo>
	<div slot-scope="{text,student}">
    
  </div>
</foo>
```



那么当深层嵌套时，由于存在作用域链，并不能清楚的确认slot-scope中变量是哪个组件传递过来的



> v-slot

在RFC：https://github.com/vuejs/rfcs/blob/master/active-rfcs/0001-new-slot-syntax.md 中新增v-slot指令，解决作用域指向不明确的问题



```vue
// bar.vue
<template>
  <div>
    <slot :text="text"></slot>
  </div>
</template>

<script>
export default {
  name: 'Bar',
  data() {
    return {
      text:'bar',
    }
  },
}
</script>
```



```vue
// foo.vue
<template>
  <div>
    <div>我是一个slot</div>
    <slot :text="text" :student="student"></slot>
  </div>
</template>

<script>
export default {
  name: 'Foo',
  data() {
    return {
      text:'foo',
      student:{name:'xiaoming',age:25}
    }
  },
}
</script>
```



```vue
// home.vue 
<template>
  <div class="swiper">
    <Foo v-slot="{text,student}">
      {{text}}
      <Bar v-slot="{text}">
        {{text}}
        {{student}}
      </Bar>
    </Foo>
  </div>
</template>

<script>
import Foo from '@/components/foo.vue'
import Bar from '@/components/bar.vue'

export default {
  name: "Home",
  components:{Foo,Bar  },
};
</script>
```



![image-20220825180458711](/Users/guochengli/Library/Application Support/typora-user-images/image-20220825180458711.png)



切断了作用域链构成的父子之间的联系，父组件插槽中的变量不会覆盖子组件插槽中的变量



> 作用域插槽中变量的**响应性**

在vue2.x中都是非响应式的

在vue3中是响应式的

