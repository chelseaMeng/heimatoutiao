import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 路由懒加载:打包不加载,用到才加载
const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import('@/views/Video')
      },
      {
        path: '/qa',
        component: () => import('@/views/QA')
      },
      {
        path: '/profile',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search') // 路由懒加载
  },
  {
    path: '/article/:articleId', // 动态路由:不同的列表项跳转到不同的详情页
    component: () => import('@/views/Article'), // 路由懒加载
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
