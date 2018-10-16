const getters = {
  // Application global attributes
  device: state => state.application.device,
  // Information about the currently logged in user.
  user: state => state.user,
  token: state => state.user.token,
  roles: state => state.user.roles,
  // User permission routes
  routes_permission: state => state.permission.routes,
  routes_addons: state => state.permission.addons,
  // Tabs control (history and cached routes in tab-bar)
  tabs_list: state => state.tabs.list,
  tabs_overflows: state => state.tabs.overflows,
  tabs_cached: state => state.tabs.cached,
  // User notifications
  notifications: state => state.notification
}

export default getters
