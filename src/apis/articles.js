import Service from '@/tools/request'

export default {
  list: ({ page, size, title, level, status }) => {
    const params = { page, size, title, level, status }
    return Service.post('/articles/list', params)
  },
  detail: id => {
    const params = { id }
    return Service.get('/articles/detail', { params: params })
  },
  update: params => {
    return Service.post('/articles/update', params)
  },
  updates: lst => {
    return Service.post('/articles/batch', lst)
  },
  auditors: () => {
    return Service.post('/account/auditors')
  }
}
