import Service from './base'

const list = () => {
  return Service.post('/notification/list')
}

const read = id => {
  const data = { id }
  return Service.post('/notification/read', data)
}

const readall = () => {
  return Service.post('/notification/readall')
}

export default {
  list,
  read,
  readall
}
