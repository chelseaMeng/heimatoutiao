module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      //1rem的大小
      //vant组件库根据37.5
      // rootValue: 37.5,
      // vant组件和其他组件的适配
      rootValue: (module) => (/vant/gi.test(module.file) ? 37.5 : 75),

      // if (/vant/gi.test(module.file)) {
      //   return 37.5
      // } else {
      //   return 75
      // }

      //适配的属性
      propList: ['*'],
      //配置不要转换的样式资源
      exclude: 'github-markdown'
    }
  }
}
