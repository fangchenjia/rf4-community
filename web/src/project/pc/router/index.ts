import { createRouter, createWebHashHistory } from 'vue-router'


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
          path: '/map-point',
          name: 'mapPoint',
          component: () => import('../views/MapPoint.vue')
        },
        {
          path: '/recommend',
          name: 'recommend',
          component: () => import('../views/HomeRecommend.vue')
        },
        {
          path: '/contribute',
          name: 'contribute',
          component: () => import('../views/HomeContribute.vue')
        }
      ]
    },
    {
      path: '/developing',
      name: 'developing',
      component: () => import('../views/DevelopingView.vue')
    }
  ]
})

export default router
