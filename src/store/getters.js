const getters = {
  // about user informations
  user: state => state.userInfo,
  token: state => state.userInfo.token.code
}

export default getters
