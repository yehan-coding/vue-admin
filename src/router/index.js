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
  }
]

export const asyncRoutes = [
  {
    path: '/my',
    component: Layout,
    redirect: '/my/info',
    children: [
      {
        path: 'info',
        name: 'MyInfo',
        component: () => import('@/views/my/info'),
        meta: { title: '个人信息', icon: 'article-data', roles: ['student'] }
      },
      {
        path: 'changePwd',
        name: 'ChangePwd',
        component: () => import('@/views/my/changePwd'),
        hidden: true,
        meta: { title: '修改密码', icon: 'article-data' }
      }
    ]
  },
  {
    path: '/research',
    component: Layout,
    redirect: 'list',
    meta: { title: '课题模块', icon: 'article-data', roles: ['teacher']  },
    children: [
      {
        path: 'list',
        name: 'ResearchList',
        component: () => import('@/views/research'),
        meta: { title: '课题研究', roles: ['teacher'] }
      },
      {
        path: 'my',
        name: 'MyResearch',
        component: () => import('@/views/research/my'),
        meta: { title: '我的课题', roles: ['teacher'] }
      },
      {
        path: 'studentTopic',
        name: 'StudentTopic',
        component: () => import('@/views/research/studentTopic'),
        meta: { title: '学生选题', roles: ['teacher'] }
      },
      {
        path: 'studentPaper',
        name: 'StudentPaper',
        component: () => import('@/views/research/studentPaper'),
        meta: { title: '学生论文', roles: ['teacher'] }
      },
      {
        path: 'add',
        name: 'TopicAdd',
        component: () => import('@/views/research/add'),
        hidden: true,
        meta: { title: '发布课题', roles: ['teacher'] }
      },
      {
        path: 'update/:id',
        name: 'TopicUpdate',
        component: () => import('@/views/research/add'),
        hidden: true,
        meta: { 
          title: '重新提交',
          isUpdate: true
        }
      },
    ]
  },
  {
    path: '/paper',
    component: Layout,
    redirect: '/paper/list',
    meta: { title: '论文模块', icon: 'article-data' },
    children: [
      {
        path: 'list',
        name: 'PaperList',
        component: () => import('@/views/paper'),
        meta: { title: '论文列表', icon: 'article-data', roles: ['teacher'] }
      },
      {
        path: 'selectList',
        name: 'SelectList',
        component: () => import('@/views/paper/my'),
        meta: { title: '选题列表', icon: 'article-data', roles: ['student', 'teacher'] }
      },
      {
        path: 'add',
        name: 'PaperAdd',
        component: () => import('@/views/paper/add'),
        hidden: true,
        meta: { title: '写论文', roles: ['student'] }
      },
      {
        path: 'update/:id',
        name: 'PaperUpdate',
        component: () => import('@/views/paper/add'),
        hidden: true,
        meta: { 
          title: '修改论文',
          isUpdate: true,
          roles: ['student', 'teacher']
        }
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
        meta: { title: '发布公告信息', roles: ['admin'] }
      },
      {
        path: 'update/:id',
        name: 'NoticeUpdate',
        component: () => import('@/views/notice/add'),
        hidden: true,
        meta: { 
          title: '修改公告信息',
          isUpdate: true,
          roles: ['admin']
        }
      },
      {
        path: 'detail/:id',
        name: 'NoticeDetail',
        component: () => import('@/views/notice/detail'),
        hidden: true,
        meta: { 
          title: '公告内容'
        }
      }
    ]
  },
  {
    path: '/person',
    component: Layout,
    redirect: '/person/list',
    meta: { title: '用户模块', icon: 'article-data' },
    children: [
      {
        path: 'list',
        name: 'PersonList',
        component: () => import('@/views/person/list'),
        meta: { title: '用户列表', icon: 'article-data', roles: ['admin'] }
      },
      {
        path: 'detail/:id',
        name: 'PersonDetail',
        component: () => import('@/views/person/detail'),
        hidden: true,
        meta: { title: '用户信息', icon: 'article-data' }
      },
      {
        path: 'add',
        name: 'PersonAdd',
        component: () => import('@/views/person/add'),
        hidden: true,
        meta: { title: '添加老师', icon: 'article-data' }
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
