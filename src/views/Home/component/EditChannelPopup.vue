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
          <van-button
            size="small"
            round
            class="edit-btn"
            @click="isEdit = !isEdit"
            >{{ isEdit ? '完成' : '编辑' }}</van-button
          >
        </van-cell>
        <!-- 我的频道宫格部分 -->
        <van-grid gutter="10px" :border="false">
          <van-grid-item
            v-for="(item, index) in myChannel"
            :text="item.name"
            :key="index"
            @click="onMyChannelClick(item, index)"
          >
            <van-icon v-show="isEdit" name="clear" slot="icon"></van-icon>
            <span
              class="text"
              :class="{ active: active === index }"
              slot="text"
              >{{ item.name }}</span
            >
          </van-grid-item>
        </van-grid>
        <!-- :class="{ active: active === item.id }"
           -->
      </div>
      <!-- 推荐频道 -->
      <div class="recommend-channel">
        <!-- 推荐频道标题 -->
        <van-cell title="推荐频道"> </van-cell>
        <!-- 推荐频道宫格部分   icon="plus"-->
        <van-grid gutter="10px" :border="false">
          <van-grid-item
            :text="item.name"
            v-for="item in recommendChannels"
            :key="item.id"
            @click="onAddChannel(item)"
          >
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels, setUserChannels, deleteUserChannels } from '@/apis'
// import { setToken } from '@/utils'
export default {
  data () {
    return {
      isShow: false, // 控制弹层状态
      allChannels: [], // 所有频道
      myChannel: this.myChannels,
      isEdit: false // 控制编辑状态显示
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels () {
      const { data } = await getAllChannels()
      // console.log(data)
      this.allChannels = data.data.channels
    },
    async onAddChannel (channel) {
      this.myChannel.push(channel)
      // console.log(this.myChannel)
      // 数据持久化
      if (this.user) {
        // 如果已登录,频道列表数据存储到线上
        try {
          const res = await setUserChannels({
            id: channel.id, // 点击时频道的id
            seq: this.myChannel.length // 请求时携带的参数是一个序号===频道的总长度
          })
          console.log(res)
        } catch (err) {
          this.$toast.fail('添加失败, 请稍后重试')
        }
      } else {
        // 如果未登录,频道列表数据存储到本地
        localStorage.setItem('TOUTIAO_CHANNEL', JSON.stringify(this.myChannel))
      }
    },
    onMyChannelClick (channel, index) {
      // console.log(channel, index)
      if (this.isEdit) {
        // 如果删除的是高亮前面的数据,那么就index=this.active-1
        // true这个参数是控制弹层的关闭状态但是我的van-popup在子组件,所以不用加this.isShow = true
        if (index <= this.active) {
          this.$emit('updateActive', this.active - 1)
          this.isShow = true
        }
        // console.log(this.myChannel)
        // 如果是编辑状态，就是删除频道
        this.myChannel.splice(index, 1)
        // 删除频道数据持久化调用
        this.deleteChannel(channel)
      } else {
        // 非编辑状态,就是切换频道
        this.$emit('updateActive', index)
        this.isShow = false
      }
    },
    // 删除频道数据持久化
    async deleteChannel (channel) {
      try {
        if (this.user) {
          // 登录状态-->存线上
          await deleteUserChannels(channel.id)
        } else {
          // 非登录状态-->存本地
          localStorage.setItem(
            'TOUTIAO_CHANNEL',
            JSON.stringify(this.myChannel)
          )
        }
      } catch (err) {
        this.$toast.fail('删除失败,请重试')
      }
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
        (item) => !this.myChannel.find((i) => i.id === item.id)
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
      .van-grid-item__text {
        color: #646566;
        font-size: 0.32rem;
        line-height: 1.5;
        word-break: break-all;
        // .van-icon-clear {
        //   position: absolute;
        //   right: -36px;
        //   top: -23px;
        //   font-size: 0.4rem;
        // }
      }
      .text {
        font-size: 0.32rem;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
        top: 0;
        right: 0;

        .van-icon-clear {
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
  .active {
    color: red;
  }
}
</style>
