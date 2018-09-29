import Service from './base'

const login = (username, password) => {
  const data = { username, password }
  return Service.post('/account/login', data)
}

const logout = token => {
  return Service.post('/account/logout')
}

const info = token => {
  const data = { token }
  return Service.get('/account/info', { params: data })
}

export default {
  login,
  logout,
  info
}
