import { createRouter, createWebHashHistory } from 'vue-router'
import loginModal from '@pc/components/LoginModal'
import { useUserStore } from "@/store/user";
const userStore = useUserStore();

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      redirect: '/recommend',
      component: () => import('../views/HomeView.vue'),
      children: [
        {
          path: '/user-detail/:id',
          name: 'userDetail',
          component: () => import('../views/UserDetail.vue')
        },
        {
          path: '/user-info',
          name: 'userInfo',
          component: () => import('../views/UserInfo.vue')
        },
        {
          path: '/map-point',
          name: 'mapPoint',
          component: () => import('../views/MapPoint.vue')
        },
        {
          name: 'pointDistribution',
          path: '/point-distribution',
          component: () => import('../views/PointDistribution.vue')
        },
        {
          path: '/recommend',
          name: 'recommend',
          component: () => import('../views/HomeRecommend.vue')
        },
        {
          path: '/wechatPoint',
          name: 'wechatPoint',
          component: () => import('../views/WechatPoint.vue')
        },
        {
          path: '/contribute',
          name: 'contribute',
          component: () => import('../views/HomeContribute.vue'),
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/point-detail/:id',
      name: 'pointDetail',
      component: () => import('../views/PointDetail.vue')
    },
    {
      path: '/developing',
      name: 'developing',
      component: () => import('../views/DevelopingView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (!userStore.isLogin) {
      loginModal.open()
      // 当前路由 设置 redirect
      next({
        path: from.path,
        query: { redirect: to.path },
      })
      return
    }
  }
  if (to.query?.redirect && to.query?.redirect !== from.path && to.path !== from.path) {
    next({
      path: to.query?.redirect as string,
      replace: true
    })
  } else {
    next()
  }
})

export default router


