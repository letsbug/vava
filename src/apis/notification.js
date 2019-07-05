import Service from '@/tools/request'

const list = () => {
  return Service.post('/notification/list')
}

const read = ids => {
  const data = { ids }
  return Service.post('/notification/read', data)
}

const readall = () => {
  return Service.post('/notification/allread')
}

export default {
  list,
  read,
  readall
}
