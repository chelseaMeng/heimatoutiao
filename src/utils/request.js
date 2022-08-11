import axios from 'axios'
import store from '../store'
import JSONBig from 'json-bigint'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  // timeout: 3000
  // 自定义后端返回的原始数据
  transformResponse: [
    function (data) {
      try {
        return JSONBig.parse(data)
      } catch (err) {
        return data
      }
    }
    // axios默认会在内部这样来处理后端返回的数据
    // return JSON.parse(data)
  ]
})

// 请求拦截器
request.interceptors.request.use(
  // 想在发送请求前做什么
  // config 本次请求的配置 必须要返回出去 里面包含url
  (config) => {
    const token = store.state.user.token
    // console.log(config)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  // 请求错误的时候,处理的方法
  (err) => {
    return Promise.reject(err)
  }
)

export default request
