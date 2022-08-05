<template>
  <van-popup
    v-model="isShow"
    position="bottom"
    :style="{ height: '90%' }"
    closeable
  >
    <div class="popupMain">
      <!-- 我的频道 -->
      <div class="my-channel">
        <!-- 我的频道标题 -->
        <van-cell title="我的频道">
          <van-button size="small" round class="edit-btn">编辑</van-button>
        </van-cell>
        <!-- 我的频道宫格部分 -->
        <van-grid gutter="10px" :border="false">
          <van-grid-item
            v-for="item in myChannels"
            :text="item.name"
            :key="item.id"
          >
            <template #icon><van-icon name="cross" /></template>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 推荐频道 -->
      <div class="recommend-channel">
        <!-- 推荐频道标题 -->
        <van-cell title="推荐频道"> </van-cell>
        <!-- 推荐频道宫格部分 -->
        <van-grid gutter="10px" :border="false">
          <van-grid-item
            :text="item.name"
            icon="plus"
            v-for="item in recommendChannels"
            :key="item.id"
          ></van-grid-item>
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels } from '@/apis'
export default {
  data () {
    return {
      isShow: false,
      allChannels: []
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels () {
      const { data } = await getAllChannels()
      console.log(data)
      this.allChannels = data.data.channels
    }
  },
  computed: {
    recommendChannels () {
      // 在所有的频道中 减去 我的频道
      // 在所有的频道中 筛选 我的频道 如果我的频道中包含所有频道中的这一项,就返回false,如果不包含就返回true,
      // 返回的这一项会通过find方法存储到新的数组中
      // return this.allChannels.filter((item) => {
      // const result = this.myChannels.find((i) => i.id === item.id)
      // if (result) {
      //   return false
      // } else {
      //   return true
      // }
      // })
      // 优化写法
      return this.allChannels.filter(
        (item) => !this.myChannels.find((i) => i.id === item.id)
      )
    }
  }
}
</script>

<style scoped lang="less">
.popupMain {
  padding-top: 100px;
  //按钮的样式
  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 0.02667rem solid red;
  }
  //我的频道样式
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;
      background-color: #eee;

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          line-height: 0.32rem;
          font-size: 24px;
        }
      }
    }
  }

  //推荐频道样式
  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;
      background-color: #eee;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
