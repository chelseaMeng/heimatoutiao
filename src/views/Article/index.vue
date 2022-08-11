<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <!-- 关注组件挂载点 -->
          <FollowUser
            :is_followed="article.is_followed"
            :userId="article.aut_id"
            class="follow-btn"
            @update-is_followed="article.is_followed = $event"
          ></FollowUser>
          <!-- 模板中的$event就是事件参数-->
          <!-- 模板中的$event就是子组件传递过来的 is_followed-->
          <!-- <van-button
            v-if="article.is_followed"
            :loading="FollowLoading"
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="onFollow"
            >关注</van-button
          >
          <van-button
            v-else
            :loading="FollowLoading"
            class="follow-btn"
            round
            size="small"
            @click="onFollow"
            >已关注</van-button
          >-->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small"
            >写评论</van-button
          >
          <van-icon name="comment-o" info="123" color="#777" />
          <!-- <van-icon color="#777" name="star-o" /> -->
          <!-- 子组件的收藏状态既要用也要改所以用v-model绑定 -->
          <!-- 收藏 -->
          <CollectArticle
            v-model="article.is_collected"
            :artId="article.art_id"
          ></CollectArticle>
          <!-- 点赞 -->
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <LikeArticle
            v-model="article.attitude"
            :artId="article.art_id"
          ></LikeArticle>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
// import { getArticleById, AddFollow, DeleteFollow } from '@/apis'
import { getArticleById } from '@/apis'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/FollowUser'
import CollectArticle from '@/components/CollectArticle'
import LikeArticle from '@/components/LikeArticle'
// ImagePreview({
//   images: [
//     'https://img01.yzcdn.cn/vant/apple-1.jpg',
//     'https://img01.yzcdn.cn/vant/apple-2.jpg'
//   ],
//   // 起始位置,从0开始
//   startPosition: 1,
//   onClose () {
//     console.log('关闭')
//   }
// })

export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle
  },
  props: {
    articleId: {
      // 如果是通过导航栏跳转,articleId是Number类型,
      // 如果是通过列表项跳转,articleId是String类型
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      article: {}, // 获取的文章数据
      loading: true,
      errStatus: 0, // 失败的状态码
      FollowLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    async loadArticle () {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        console.log(data)
        this.article = data.data
        // 初始化图片点击预览      请求完数据,获取dom中的图片节点
        // 但是数据驱动视图是异步的,所以视图无法立即得到图片节点 显示undefined,
        // 解决方案:开启定时器
        setTimeout(() => {
          // console.log(this.$refs['article-content'])
          this.previewImage()
        }, 0)
        // this.loading = false
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
          this.$toast.fail('获取文章失败', err)
        }
        // 文章获取失败,关闭loading
        // this.loading = false
      }
      // 无论成功失败都关闭loading
      this.loading = false
    },
    previewImage () {
      // 得到所有的img节点
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const images = [] // 接收所有dom节点中的src
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          ImagePreview({
            // 预览图片src
            images,
            //   // 起始位置
            startPosition: index
          })
        }
      })
    }
    // async onFollow () {
    //   // 展示关注按钮的loading状态
    //   this.FollowLoading = true
    //   try {
    //     if (this.article.is_followed) {
    //       // 已关注 取消关注
    //       await DeleteFollow(this.article.aut_id)
    //       // this.article.is_followed = false
    //     } else {
    //       // 未关注 添加关注
    //       await AddFollow(this.article.aut_id)
    //       // this.article.is_followed = true
    //     }
    // 更新视图状态
    //     this.article.is_followed = !this.article.is_followed
    //   } catch (e) {
    //     let msg = '操作失败,请稍后重试'
    //     if (e.response && e.response.status === 400) {
    //       msg = '不能关注自己'
    //     }
    //     this.$toast.fail(msg)
    //   }
    //   // 关闭按钮的loading状态
    //   this.FollowLoading = false
    // }
  }
}
</script>

<style scoped lang="less">
@import './github.markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
