<template>
  <div>
    <!-- 移动端项目适配步骤 -->
    <!-- 1.rem动态切换 不管处于什么分辨率 1rem 始终是1/10视口大小 -->
    <!-- 下载amfe-flexible -->
    <!-- 2.px->rem -->
    <!-- 下载postcss-pxtorem -->
    <!-- vant官网 版本5.1.1-->
    <!-- 一级路由出口 -->
    <router-view></router-view>
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
