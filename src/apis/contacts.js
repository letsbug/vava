import api from '@/tools/request'

const list = pages => {
  return api.post('/contacts/list', pages)
}

const all = () => {
  return api.post('/contacts/all')
}

export default {
  list, all
}
