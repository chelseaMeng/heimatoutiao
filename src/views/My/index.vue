<template>
  <div class="my">
    <!-- 头部 -->
    <header>
      <!-- 登录和注册 -->
      <div v-if="isLogin" class="user-info banner">
        <van-row></van-row>
        <!-- 头部第二行 -->
        <van-row class="row-2">
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <!-- 头像 -->
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="userInfo.photo"
              />
              <!-- 手机号 -->
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="11">
            <van-row class="code-row" type="flex" align="center" justify="end">
              <van-button class="code-btn" size="mini" round
                >编辑资料</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <!-- 头部第三行 -->
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon> {{ userInfo.art_count }} </template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon> {{ userInfo.fans_count }} </template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon> {{ userInfo.follow_count }} </template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon> {{ userInfo.like_count }} </template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录 -->
      <div v-else class="login-register banner">
        <div class="wrap" @click="goLogin">
          <img src="../../assets/images/mobile.png" alt="" />
          <span>登录/注册</span>
        </div>
      </div>
    </header>
    <!-- 主体 -->
    <main>
      <div>
        <van-grid column-num="2" class="grid" clickable>
          <van-grid-item text="收藏">
            <template #icon>
              <span class="toutiao toutiao-shoucang"></span>
            </template>
          </van-grid-item>
          <van-grid-item text="历史">
            <template #icon>
              <span class="toutiao toutiao-lishi"></span>
            </template>
          </van-grid-item>
        </van-grid>

        <!-- 消息通知/小智同学 -->
        <div class="link">
          <van-cell value="消息通知" is-link />
          <van-cell value="小智同学" is-link />
        </div>
      </div>
    </main>
    <!-- 退出按钮 -->
    <van-button v-if="isLogin" block class="login-btn" @click="logout"
      >退出</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/apis'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    // 标识是否登录
    isLogin () {
      // !!$store.state.user.token
      return !!this.$store.state.user.token
    }
  },
  methods: {
    // 退出登录
    logout () {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否确定要退出登录'
        })
        .then(() => {
          // 确认走这里
          // on confirm
          this.$store.commit('setUser', {})
        })
        .catch(() => {
          // 取消什么都不做
          // on cancel
        })
    },
    // 去登录
    goLogin () {
      this.$router.push('/login')
    },
    // 获取用户信息,病处理数据
    async getUserInfo () {
      // 如果用户登录了再获取用户信息
      if (this.isLogin) {
        try {
          // const res = await getUserInfo()
          // console.log(res)
          const {
            data: { data }
          } = await getUserInfo()
          console.log(data)
          this.userInfo = data
        } catch (err) {
          this.$toast.fail('请重新登录')
        }
      }
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style scoped lang="less">
.banner {
  width: 100%;
  height: 400px;
  //                                      background-position 0 0  cover-填充类型
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
}
// 用户信息样式
.user-info {
  display: flex;
  flex-direction: column;

  > .van-row {
    flex: 1;
  }

  .row-2 {
    .van-col {
      height: 100%;
    }
  }
  .mobile {
    font-size: 0.4rem;
    color: #fff;
  }
  .code-btn {
    width: 1.53333rem;
    height: 0.42667rem;
    background: #fff;
    border-radius: 0.21333rem;
    font-size: 0.26667rem;
    color: #666;
    padding: 0;
  }

  .code-row {
    height: 100%;
  }
  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    color: #fff;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }
}
// 主体区域
main {
  .grid {
    color: #646566;
    // 字体图标
    .toutiao {
      font-size: 0.6rem;

      &.toutiao-lishi {
        color: #ffb31d;
      }
      &.toutiao-shoucang {
        color: #ed5253;
      }
    }
  }
  .link {
    margin: 10px 0 0 10px;
  }
}

//退出按钮
.my {
  background-color: #f5f7f9;
  //          一视口高度-底部tabbar高度
  height: calc(100vh - 100px);
}

.login-btn {
  // :deep(.van-button_text) {
  //   color: red;
  // }
  margin-top: 10px;
  color: red;
}

//未登录
.login-register {
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  color: #fff;
  img {
    margin-bottom: 10px;
    width: 100px;
    height: 100px;
  }
  span {
    font-size: 30px;
  }
}
</style>
