# 变更scoped样式

## 概览

为单文件组件提供一致的自定义css拓展

## 基础用例

```vue

<style scoped>
/* deep selectors */
::v-deep(.foo) {
}

/* shorthand */
:deep(.foo) {
}

/* targeting slot content */
::v-slotted(.foo) {
}

/* shorthand */
:slotted(.foo) {
}

/* one-off global rule */
::v-global(.foo) {
}

/* shorthand */
:global(.foo) {
}
</style>
```

## 动机
