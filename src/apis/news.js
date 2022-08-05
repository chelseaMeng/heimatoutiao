import request from '@/utils/request'
/**
 *
 * @param {*} ChannelId  频道的id
 * @param {*} timestamp  如果获取第一页的文章,传当前的timestamp,如果是上一页的文章数据,传pre_timestamp
 * @returns
 */
export const getArticleList = (ChannelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    // method: 'get',
    params: {
      channel_id: ChannelId,
      timestamp
    }
  })
}
