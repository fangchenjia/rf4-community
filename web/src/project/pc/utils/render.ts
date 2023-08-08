import { h, type Component } from 'vue'
import { RouterLink, type RouteParams } from 'vue-router'
import { NIcon } from 'naive-ui'

// 用于渲染菜单的图标
export function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
// 用于渲染可跳转路由的菜单项
export function renderRouterLink(title: string, path: string, params: RouteParams = {}) {
  return () =>
  h(
    RouterLink,
    {
      to: {
        path,
        params
      }
    },
    { default: () => title }
  )
}
