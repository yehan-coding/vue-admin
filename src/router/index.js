import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  },
  {
    path: '/my',
    component: Layout,
    redirect: '/my/info',
    children: [
      {
        path: 'info',
        name: 'MyInfo',
        component: () => import('@/views/my/info'),
        meta: { title: '个人信息', icon: 'article-data' }
      }
    ]
  },
  {
    path: '/research',
    component: Layout,
    meta: { title: '课题研究' },
    children: [
      {
        path: 'list',
        name: 'ResearchList',
        component: () => import('@/views/research'),
        meta: { title: '课题研究', icon: 'article-data' }
      },
      {
        path: 'my',
        name: 'MyResearch',
        component: () => import('@/views/research/my'),
        meta: { title: '我发布的课题', icon: 'article-data' }
      }
    ]
  },
  {
    path: '/notice',
    component: Layout,
    redirect: '/notice/list',
    children: [
      {
        path: 'list',
        name: 'NoticeList',
        component: () => import('@/views/notice'),
        meta: { title: '公告信息', icon: 'article-data' }
      },
      {
        path: 'add',
        name: 'NoticeAdd',
        component: () => import('@/views/notice/add'),
        hidden: true,
        meta: { title: '发布公告信息' }
      },
      {
        path: 'update/:id',
        name: 'NoticeUpdate',
        component: () => import('@/views/notice/add'),
        hidden: true,
        meta: { 
          title: '修改公告信息',
          isUpdate: true
        }
      },
      {
        path: 'detail/:id',
        name: 'ScienceInfoDetail',
        component: () => import('@/views/notice/detail'),
        hidden: true,
        meta: { 
          title: '文章详情'
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
