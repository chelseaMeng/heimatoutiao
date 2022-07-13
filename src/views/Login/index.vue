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
    <van-form class="form" @submit="login">
      <!-- 手机 -->
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写用户名', trigger: 'onChange' }
        ]"
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
        type="password"
        name="code"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请填写密码' }]"
      >
        <!-- 输入框左侧插槽锁 -->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <!-- 输入框右侧插槽:发送验证码 -->
        <template #right-icon>
          <van-button class="code-btn" round size="mini">发送验证码</van-button>
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
import { login } from '@/apis/user.js'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    backToPrePage () {
      this.$router.back()
    },

    async login () {
      const res = await login(this.mobile, this.code)
      console.log(res)
    }
  }
  // created () {
  //   // console.dir(request)
  // }
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
