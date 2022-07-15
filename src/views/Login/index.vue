<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar class="navbar" title="登录" @click-left="backToPrePage">
      <!-- 头部插槽x -->
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- 表单 -->
    <van-form ref="form" class="form" @submit="login">
      <!-- 手机 -->
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <!-- 输入框左侧插槽手机 -->
        <!-- label输入框左侧文本 -->
        <!-- label自定义输入框 label 标签 -->
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <!-- 验证码 -->
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <!-- 输入框左侧插槽锁 -->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <!-- 输入框右侧插槽:发送验证码 -->
        <template #right-icon>
          <!-- 倒计时 -->
          <!-- v-bind:time后面跟表达式"3 * 1000" -->
          <van-count-down
            v-if="isShowCountDown"
            :time="3 * 1000"
            @finish="isShowCountDown = false"
          />
          <!-- 发送验证码 -->
          <van-button
            v-else
            class="code-btn"
            round
            size="mini"
            @click="sendCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <!-- 登陆 -->
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// import { Toast } from 'vant'
// import request from '@/utils/request'
import { login, sendCode } from '@/apis/user.js'
import { mobileRules, codeRules } from './rules'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCountDown: false
    }
  },
  methods: {
    backToPrePage () {
      this.$router.back()
    },

    async login () {
      this.$toast.loading({
        message: '加载中...',
        // loading时,禁止点击页面其他内容
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        // login(this.mobile, this.code) 返回一个Promise实例
        // res是promise实例resolve的结果
        // 服务器返回的真正数据在res.data中
        // 服务器返回的状态码在res.status中
        // console.log(res)
        // console.log(res.status)
        // 登录之后获取token
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')
        this.$router.push('/profile')
      } catch (err) {
        // err是promise实例reject的结果
        // 服务器返回的真正数据在err.response.data中
        // 服务器返回的状态码在err.response.status中
        // this.$toast.fail('登录失败')
        const status = err.response.status
        //  console.log(status)
        // 提示错误方式一:
        // switch (status) {
        //   // 400 参数错误
        //   case 400:
        //     this.$toast.fail(err.response.data.messsage)
        //     break
        //   // 服务器错误
        //   case 507:
        //     this.$toast.fail('服务器异常,请刷新')
        //     break
        //   default:
        //     this.$toast.fail('登录错误,请刷新')
        // }
        // 提示错误方式二:
        const message = '登录错误,请刷新'
        if (status === 400) {
          this.$toast.fail(err.response.data.messsage)
        }
        this.$toast.fail(message)
      }
    },
    async sendCode () {
      try {
        // 验证手机号
        await this.$refs.form.validate('mobile') // this.$refs.from.validate('mobile') 返回Promise对象
        // 发送请求,获取验证码
        await sendCode(this.mobile)
        // console.log(res)

        // 显示倒计时
        this.isShowCountDown = true
      } catch (err) {
        // this.$toast.fail('手机号非法')
        if (!err.response) {
          this.$toast.fail('手机号格式不正确')
        } else {
          // 校验码导致失败
          const status = err.response.status
          if (status === 400 || status === 429) {
            this.$toast.fail(err.response.data.message)
          }
        }
      }
    }
    // created () {
    //   // console.dir(request)
    // }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}

// 表单
.form {
  :deep(.van-field__label) {
    flex: 1;
  }
  :deep(.van-field__value) {
    flex: 20;
  }
  .toutiao {
    font-size: 0.49333rem;
  }
  .code-btn {
    background-color: #eee;
    padding: 0 10px;
    color: #666;
  }
}
</style>
