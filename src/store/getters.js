const getters = {
  // Application global attributes
  device: state => state.application.device,
  language: state => state.application.language,
  sidebar: state => state.application.sidebar,
  theme: state => state.application.theme,

  // Information about the currently logged in user.
  user: state => state.user,
  token: state => state.user.token,
  roles: state => state.user.roles,

  // User permission routes
  // routes_addons: state => state.permission.addons,
  routes_permission: state => state.permission.routes,

  // User notifications
  notifications: state => state.notification
}

export default getters
