<template>
  <div>
    <!-- v-model是否处于加载状态 -->
    <van-pull-refresh v-model="refreshLoading" @refresh="loadNextPage">
      <van-list @load="loadNextPage" offset="0">
        <ArticleItem
          v-for="item in articles"
          v-model="loading"
          :finished="isFinished"
          finished-text="没有更多了~~"
          :error.sync="error"
          error-text="请求错误,请重新加载"
          success-text="刷新成功"
          :key="item.art_id"
          :articleInfo="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 按需引入getArticleList函数
import { getArticleList } from '@/apis'
import ArticleItem from './ArticleItem.vue'
export default {
  data () {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      isFinished: false,
      error: false,
      refreshLoading: false
    }
  },
  props: {
    // 频道id
    id: {
      type: [String, Number],
      required: true
    }
  },
  created () {
    this.getArticleList()
  },
  methods: {
    async getArticleList () {
      try {
        // this.id 当前频道id,+new Date() 当前时间戳
        const { data } = await getArticleList(this.id, +new Date())
        // 保存第一页页码
        this.pre_timestamp = data.data.pre_timestamp
        console.log(data)
        this.articles = data.data.results
      } catch (err) {
        const status = err.response.status
        if (status === 400) {
          throw new Error(err.response.data.message)
          // console.log('参数错误')
        } else {
          this.$toast.fail('获取文章列表失败,请刷新重试')
        }
      }
    },

    async loadNextPage () {
      try {
        // 模拟错误
        // if (Math.random() < 0.7) {
        //   throw new Error('出错了')
        // }

        // 滚动条触底,加载下一页数据
        const { data } = await getArticleList(this.id, this.pre_timestamp)

        if (!data.data.pre_timestamp) {
          // 如果返回的数据没有pre_timestamp,说明下一次加载没有数据返回了,那么就把isFinished设置为true,显示没有更多文本
          this.isFinished = true
        }
        // if (下拉刷新) {
        // } else {
        //   // 滚动滚动条
        // }
        if (this.refreshLoading) {
          // 将第n页的数据,放在articles数组的前面
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }

        // 更新页数
        this.pre_timestamp = data.data.pre_timestamp
        // 手动将loading设置成false 加载下一页数据
        // this.loading = false
      } catch (error) {
        // 出错了 error设置成true,显示错误文本
        this.error = true
      } finally {
        // finially里面的内容无论正确错误都会执行
        this.loading = false
        // 当下拉刷新一次,vant内部会把refreshLoading = false 改成true
        this.refreshLoading = false
      }
    }
  },
  components: {
    ArticleItem
  }
}
</script>

<style></style>
