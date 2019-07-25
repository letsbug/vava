import { constantRoutes, asyncRoutes } from '@/router/routes'

function hasPermission(roles, route) {
  return (route.meta && route.meta.roles)
    ? roles.some(role => route.meta.roles.includes(role))
    : true
}

function filterAsyncRoutes(asyncRouteMap, roles) {
  const list = []
  asyncRouteMap.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children && tmp.children.length > 0) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      list.push(tmp)
    }
  })
  return list
}

const permission = {
  state: {
    routes: constantRoutes,
    addons: []
  },
  mutations: {
    PERM_SET_ROUTES: (state, routes) => {
      state.addons = routes
      state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {
    perm_generate_routes: ({ commit }, roles) => new Promise(resolve => {
      const accessRoutes = roles.includes('SuperAdmin')
        ? asyncRoutes
        : filterAsyncRoutes(asyncRoutes, roles)
      commit('PERM_SET_ROUTES', accessRoutes)
      resolve(accessRoutes)
    })
  }
}

export default permission
