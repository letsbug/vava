import api from '@/tools/request'

const list = pages => {
  return api.post('/contacts/list', pages).then(res => res.data)
}

const all = () => {
  return api.post('/contacts/all').then(res => res.data)
}

export default {
  list, all
}
