<template>
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{ collected: value }"
    :loading="loading"
    @click="onCollect"
  />
</template>

<script>
import { AddCollect, DeleteCollect } from '@/apis'
export default {
  name: 'CollectArticle',
  data () {
    return {
      loading: false
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    artId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onCollect () {
      this.loading = true
      try {
        if (this.value) {
          // 已收藏 取消收藏
          await DeleteCollect(this.artId)
        } else {
          // 没收藏 添加收藏
          await AddCollect(this.artId)
        }
        // 更新视图
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        this.$toast.fail('收藏失败,稍后重试')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.collected {
  color: #ffa500;
}
</style>
