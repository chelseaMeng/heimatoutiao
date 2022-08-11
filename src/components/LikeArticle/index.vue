<template>
  <van-button
    :icon="value ? 'good-job' : 'good-job-o'"
    :class="{ like: value }"
    :loading="loading"
    @click="onCollect"
  />
</template>

<script>
import { AddLike, CancelLike } from '@/apis'
export default {
  name: 'LikeArticle',
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
          await AddLike(this.artId)
        } else {
          // 没收藏 添加收藏
          await CancelLike(this.artId)
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
.like {
  color: orange;
}
</style>
