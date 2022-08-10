<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        :title="item.title"
        v-for="(item, index) in searchResult"
        :key="index"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultsApi } from '@/apis/search'
export default {
  name: 'SearchResult',
  data () {
    return {
      searchResult: [],
      page: 1, // 当前搜索结果的页码
      perPage: 10,
      loading: false,
      finished: false
    }
  },
  created () {
    this.getSearchResults()
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  methods: {
    async getSearchResults () {
      try {
        const { data } = await getSearchResultsApi(
          this.keywords,
          this.page,
          this.perPage
        )
        // console.log(data)
        // 请求回来1页,10条数据
        this.searchResult = data.data.results
      } catch (err) {
        this.$toast.fail('获取失败,请重试')
      }
    },
    // 加载事件
    async onLoad () {
      const { data } = await getSearchResultsApi(
        this.keywords,
        this.page,
        this.perPage
      )
      // console.log(data)
      this.searchResult.push(...data.data.results)
      // 数据更新完毕后，将 loading 设置成 false 即可
      this.loading = false
      if (data.data.results.length) {
        // 如果有返回的数据,就更新页码
        this.page++
      } else {
        // 如果没有返回的数据,就不再加载
        this.finished = true
      }
    }
  }
}
</script>

<style></style>
