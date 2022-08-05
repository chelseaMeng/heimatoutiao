import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getToken() || {}
  },

  mutations: {
    setUser (state, payload) {
      // payload 是调用方法时传递的参数
      // 把token存储到vuex中
      state.user = payload
      // 本地存储token
      setToken(payload)
    }
  }
})
