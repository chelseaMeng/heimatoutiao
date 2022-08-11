<template>
  <div class="article-container" @click="jumpToArticleDetail">
    <!-- 渲染无图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 0"
      :title="articleInfo.title"
      :label="articleDesc"
    ></van-cell>
    <!-- 渲染一张图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      :label="articleDesc"
    >
      <van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
      />
    </van-cell>
    <!-- 渲染三张图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 3"
      :title="articleInfo.title"
      :label="articleDesc"
    >
      <template #label>
        <div>
          <!-- 三张图片 -->
          <van-image
            width="2.5rem"
            height="2rem"
            v-for="(item, index) in articleInfo.cover.images"
            :key="index"
            :src="item"
            style="margin-right: 5px"
          ></van-image>
          <!-- 描述文字 -->
          <div>{{ articleDesc }}</div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    articleInfo: {
      required: true,
      type: Object
    }
  },
  computed: {
    articleDesc () {
      const art = this.articleInfo
      const relativeTime = dayjs(art.pubdate).fromNow()
      return `${art.aut_name} ${art.comm_count}评论 ${relativeTime}`
    }
  },
  methods: {
    jumpToArticleDetail () {
      // console.log(this.articleInfo)
      this.$router.push({
        path: `/article/${this.articleInfo.art_id}`
      })
    }
  }
}
</script>

<style></style>
