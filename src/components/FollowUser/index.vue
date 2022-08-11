<template>
  <van-button
    v-if="is_followed"
    :loading="loading"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    >关注</van-button
  >
  <van-button
    v-else
    :loading="loading"
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
    >已关注</van-button
  >
</template>

<script>
import { AddFollow, DeleteFollow } from '@/apis'
export default {
  name: 'FollowUser',
  data () {
    return {
      loading: false
    }
  },
  props: {
    is_followed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onFollow () {
      // 展示关注按钮的loading状态
      this.loading = true
      try {
        if (this.is_followed) {
          // 已关注 取消关注
          await DeleteFollow(this.userId)
          // this.article.is_followed = false
        } else {
          // 未关注 添加关注
          await AddFollow(this.userId)
          // this.article.is_followed = true
        }
        // 更新视图状态
        this.$emit('update-is_followed', !this.is_followed)
        // this.article.is_followed = !this.article.is_followed
      } catch (e) {
        let msg = '操作失败,请稍后重试'
        if (e.response && e.response.status === 400) {
          msg = '不能关注自己'
        }
        this.$toast.fail(msg)
      }
      // 关闭按钮的loading状态
      this.loading = false
    }
  }
}
</script>

<style></style>
