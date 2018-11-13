import Service from './base'

export default {
  list: ({ page, size }) => {
    const pages = { page, size }
    return Service.post('/articles/list', pages).then(res => res.data)
  },
  detail: id => {
    const params = { id }
    return Service.get('/articles/detail', { params: params }).then(res => res.data)
  },
  update: params => {
    return Service.post('/articles/update', params).then(res => res.data)
  }
}
