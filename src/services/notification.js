import Service from './base'

const list = () => {
  return Service.post('/notification/list')
}

export default {
  list
}
