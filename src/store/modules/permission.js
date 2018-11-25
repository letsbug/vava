import { constantRouteMap, asyncRouteMap } from '@/router/routes'

const hasPermission = (roles, route) => {
  return (route.meta && route.meta.roles)
    ? roles.some(role => route.meta.roles.includes(role))
    : true
}

const filterAsyncRoutes = (asyncRouteMap, roles) => {
  return asyncRouteMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRoutes(route.children, roles)
      } return true
    } return false
  })
}

const permission = {
  state: {
    routes: constantRouteMap,
    addons: []
  },
  mutations: {
    PERM_SET_ROUTES: (state, routes) => {
      state.addons = routes
      state.routes = constantRouteMap.concat(routes)
    }
  },
  actions: {
    perm_generate_routes: ({ commit }, data) => new Promise(resolve => {
      const { roles } = data
      const accessRoutes = (asyncRouteMap.length > 0)
        ? ~roles.indexOf('admin')
          ? asyncRouteMap
          : filterAsyncRoutes(asyncRouteMap, roles)
        : []
      commit('PERM_SET_ROUTES', accessRoutes)
      resolve()
    })
  }
}

export default permission
