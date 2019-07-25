import Service from '@/tools/request'

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

const mocks = () => {
  return Service.get('/account/mocks')
}

const list = () => {
  return Service.get('/account/list')
}

export default {
  login,
  logout,
  info,
  mocks,
  list
}
