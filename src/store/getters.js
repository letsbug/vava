const getters = {
  // about user informations
  user: state => state.user,
  token: state => state.user.token,
  roles: state => state.user.roles,
  // async routes
  permission_routes: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}

export default getters
