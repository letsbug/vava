/**
 * permission.
 * @author: gzb
 * @date: 2018-06-18 20:27
 */

import { constantRouterMap } from '@/router/static'
import { asyncRouterMap } from '@/router/async'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  return asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
}

const permission = {
  state: {
    routes: constantRouterMap,
    addRouters: []
  },
  mutations: {
    PERM_SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routes = constantRouterMap.concat(routers)
    }
  },
  actions: {
    perm_generate_routes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('PERM_SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
