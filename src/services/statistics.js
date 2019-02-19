import Service from './base'

export default {
  pv(start = null, end = null) {
    const params = { start, end }
    return Service.post('/statistics/pv', params).then(res => res.data)
  }
}