
const getters = {
  // about user informations
  user: state => state.user,
  token: state => state.user.token,
  roles: state => state.user.roles,
  // async routes
  permission_routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes
}

export default getters
