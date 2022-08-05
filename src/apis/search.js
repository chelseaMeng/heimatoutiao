import request from '@/utils/request'
/**
 *获取搜索建议
 * @param {String} q 传递的参数为搜索关键词
 * @returns Promise
 */
export const getSearchSeggestionsApi = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
    // method: 'get'
  })
}
