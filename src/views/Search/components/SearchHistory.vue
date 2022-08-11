<template>
  <div classs="SearchHistory-container">
    <!-- 1.标题 -->
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clearAll')">全部删除</span>
        &nbsp; &nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete-o" @click="isDeleteShow = true" />
    </van-cell>

    <!-- 2.历史记录 -->
    <van-cell
      :title="item"
      v-for="(item, index) in history"
      :key="index"
      @click="onSearchItemClick(item, index)"
    >
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon v-show="isDeleteShow" name="close" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  data () {
    return {
      isDeleteShow: false // 控制图标的显示和隐藏
    }
  },
  // prop 数据
  // 如果是普通数据(数字/字符串/布尔值) 绝对不能修改 即便修改也不能传递给父组件
  // 如果是引用类型数据(数组/对象)
  // 可以修改 例如 [].push()
  // 但是不能重新赋值 xxx=[]
  props: {
    keywords: {
      type: String,
      required: true
    },
    history: {
      type: Array,
      required: true
    }
  },
  methods: {
    onSearchItemClick (item, index) {
      // 删除状态,删除该项搜索历史
      if (this.isDeleteShow) {
        this.$parent.history.splice(index, 1)
      } else {
        // 非删除状态切换显示搜索结果
        this.$parent.keywords = item
        this.$parent.isShowSearchResult = true
        // this.$emit('search', item)
      }
    }
  }
}
</script>

<style></style>
