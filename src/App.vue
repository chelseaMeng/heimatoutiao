<template>
  <div>
    <!-- 移动端项目适配步骤 -->
    <!-- 1.rem动态切换 不管处于什么分辨率 1rem 始终是1/10视口大小 -->
    <!-- 下载amfe-flexible -->
    <!-- 2.px->rem -->
    <!-- 下载postcss-pxtorem -->
    <!-- vant官网 版本5.1.1-->
    <h1>黑马头条</h1>
    <span class="toutiao toutiao-dianzan"></span>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <div class="login"></div>
    <div style="background: gold; height: 200px"></div>
  </div>
</template>

<style lang="less" scoped>
.login {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
}
</style>
