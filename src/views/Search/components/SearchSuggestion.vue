<template>
  <div>
    <!-- 实现功能:输入关键字,搜索建议的内容总包含关键字高亮
    1.干掉 van- cell标签中的属性:title="item"
    2.添加插槽
    -->
    <van-cell
      v-for="(item, index) in highLightSuggestions"
      :key="index"
      icon="search"
      @click="clickSearchSuggestions(index)"
    >
      <template #title> <span v-html="item"></span> </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSeggestionsApi } from '@/apis'
import { debounce } from 'lodash'
// 1.动态正则
// -字面量 /a/ig   i是不区分大小写 g是全局匹配
// -new RegExp(变量,'ig')
// 2.字符串的replace

/*
'Anglar'.replace(/a/ig,function(match){
    return `<span>${match}</span>`
})
*/
// 第一个参数可以是正则
// 第二个参数可以是函数,函数的返回值是要替换的字符串
// match:正则匹配上的字符
export default {
  name: 'SearchSuggestion',
  data () {
    return {
      suggestions: []
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  methods: {
    // 获取搜索建议
    // 防抖
    // 1.延迟执行
    // 2.干掉上一次的定时器
    // -clearTimeOut(id)
    // 处理搜索建议-->防抖
    // 单一职责原则(设计模式之一)
    getSearchSeggestions: debounce(async function () {
      try {
        const { data } = await getSearchSeggestionsApi(this.keywords)
        // console.log(data)
        this.suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        this.$toast.fail('获取搜索建议失败')
      }
    }, 300),
    // 点击后获取搜索结果
    clickSearchSuggestions (ind) {
      // 改变父元素的keywords
      this.$parent.keywords = this.suggestions[ind]
      // this.$parent.history.unshift(this.suggestion[ind])
      // 改变父元素的isShowSearchResult的值,显示搜索结果
      this.$parent.isShowSearchResult = true
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler () {
        this.getSearchSeggestions()
      }
    }
  },
  computed: {
    // map:是数组的一个方法 本质是映射 返回一个新数组 新数组的长度和原数组是一样的
    highLightSuggestions () {
      // 创建一个keywords的正则 与返回的数据进行匹配
      const reg = new RegExp(this.keywords, 'ig') // this.keywords是一个变量
      return this.suggestions.map((item) =>
        // item 是map遍历的每一项 match是正则匹配到的字符串 例如:keywords是a  返回的数据时Anglar  match 就是正则匹配到的A和a
        item.replace(reg, (match) => `<span style='color:red'>${match}</span>`)
      )
    }
  }
}
</script>

<style></style>
