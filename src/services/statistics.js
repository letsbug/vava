import Service from './base'

export default {
  pv(start = null, end = null) {
    const params = { start, end }
    return Service.post('/statistics/pv', params).then(res => res.data)
  },
  sales(start = null, end = null) {
    const params = { start, end }
    return Service.post('/statistics/sales', params).then(res => res.data)
  }
}
