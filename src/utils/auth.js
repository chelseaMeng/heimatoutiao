// 对storage中的函数进行二次封装,返回一个函数
import storage from './storage.js'
const TOKEN_KEY = 'HEIMA_TOUTIAO_TOKEN'
export const getToken = () => storage.get(TOKEN_KEY)
export const setToken = (token) => storage.set(TOKEN_KEY, token)
export const removeToken = (TOKEN_KEY) => storage.remove(TOKEN_KEY)
