import Service from './base'

export default {
  list: ({ page, size, title, level, status }) => {
    const params = { page, size, title, level, status }
    return Service.post('/articles/list', params).then(res => res.data)
  },
  detail: id => {
    const params = { id }
    return Service.get('/articles/detail', { params: params }).then(res => res.data)
  },
  update: params => {
    return Service.post('/articles/update', params).then(res => res.data)
  },
  updates: lst => {
    return Service.post('/articles/batch', lst).then(res => res.data)
  }
}
