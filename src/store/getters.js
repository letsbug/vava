const getters = {
  // about user informations
  user: state => state.user,
  token: state => state.user.token,
  roles: state => state.user.roles,
  // async routes
  permission_routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  // visited and cached routes in app tab bar
  tabs_visited: state => state.tabs.visited,
  tabs_cached: state => state.tabs.cached
}

export default getters
