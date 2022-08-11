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

/**
 * @param {string,Number} //获取文章详情
 */
export const getArticleById = (articleId) => {
  return request({
    url: `/v1_0/articles/${articleId}`,
    method: 'get'
  })
}

/**
 * @param  //收藏文章
 */
export const AddCollect = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * @param  //取消收藏文章
 */
export const DeleteCollect = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}
/**
 * @param  //点赞文章
 */
export const AddLike = (target) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * @param  //取消点赞
 */
export const CancelLike = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}
