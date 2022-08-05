// 引入dayjs
import dayjs from 'dayjs'
// 配置相对时间
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
// dayjs是对new Date()的封装 使用时调用dayjs()
// dayjs()
// console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))
// 改变语言配置
require('dayjs/locale/zh-cn')
// 全局使用简体中文
dayjs.locale('zh-cn')

export default dayjs
