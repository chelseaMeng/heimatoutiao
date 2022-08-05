<template>
  <div>
    <!-- 头部搜索 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button type="primary" round @click="$router.push('/search')">
          <van-icon name="search"></van-icon>
          搜索</van-button
        >
      </template>
    </van-nav-bar>

    <!-- tab选项卡 -->
    <van-tabs v-model="active" swipeable>
      <!-- 标签 -->
      <van-tab v-for="item in myChannels" :key="item.id" :title="item.name">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>

      <!-- 更多 -->
      <span class="toutiao toutiao-gengduo" @click="showPopUp"></span>
    </van-tabs>

    <!-- 弹出层 -->
    <EditChannelPopup ref="popup" :myChannels="myChannels"></EditChannelPopup>
  </div>
</template>

<script>
import EditChannelPopup from './component/EditChannelPopup.vue'
import { getMyChannels } from '@/apis'
import ArticleList from './component/ArticleList.vue'
export default {
  name: 'Home',
  data () {
    return {
      active: 2,
      myChannels: []
    }
  },
  methods: {
    // 封装我的频道列表
    async getMyChannels () {
      try {
        // 发送请求获取我的频道列表
        const { data } = await getMyChannels()
        console.log(data)
        this.myChannels = data.data.channels
      } catch (err) {
        this.$toast.fail('请重新获取')
      }
    },
    showPopUp () {
      // this.isShow = true
      // 父组件中没有isShow属性,通过ref标识弹出层组件,获取他身上的isShow属性
      this.$refs.popup.isShow = true
    }
  },
  components: {
    ArticleList,
    EditChannelPopup
  },
  created () {
    this.getMyChannels()
  }
}
</script>

<style scoped lang="less">
//头部搜索
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--primary {
    border: 0.02667rem solid #5babfb;
  }
}
// tabs
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  z-index: 999;
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
