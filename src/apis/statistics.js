import Service from '@/tools/request'

export default {
  pv(start = null, end = null) {
    const params = { start, end }
    return Service.post('/statistics/pv', params)
  }
}
