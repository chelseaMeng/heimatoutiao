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

/**
 *获取搜索结果
 * @param {String}
 * @returns Promise
 */
export const getSearchResultsApi = (q, page, perPage) => {
  return request({
    url: '/v1_0/search',
    params: {
      q,
      page,
      per_page: perPage
    }
    // method: 'get'
  })
}
