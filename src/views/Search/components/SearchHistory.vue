<template>
  <div classs="SearchHistory-container">
    <!-- 标题 -->
    <van-cell title="搜索历史">
      <template #right-icon>
        <van-icon name="delete-o" />
      </template>
    </van-cell>
    <!-- 历史记录 -->
    <van-cell :title="item" v-for="(item, index) in history" :key="index">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon name="close" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  data () {
    return {}
  },
  props: {
    keywords: {
      type: String,
      required: true
    },
    history: {
      type: Array,
      required: true
    }
  }
}
</script>

<style></style>
