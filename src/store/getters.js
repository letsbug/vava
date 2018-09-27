const getters = {
  // Information about the currently logged in user.
  user: state => state.user,
  token: state => state.user.token,
  roles: state => state.user.roles,
  // User permission routes
  routes_permission: state => state.permission.routes,
  routes_addons: state => state.permission.addons,
  // User notifications
  notifications: state => state.notification.list
}

export default getters
