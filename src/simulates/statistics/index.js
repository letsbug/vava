//
// 模拟统计数据
//

import { Dater } from '@/tools'
import { generatePV } from './pv'
import { generateSales } from './sales'

const count = 365 * 2 // 2 years
const pv = []
const sales = []

const oneDay = 24 * 3600 * 1000
let now = new Date()

for (let i = 0; i < count; i++) {
  if (i > 0) now -= oneDay

  const _date = Dater.format(now, 'yyyy-MM-dd')

  pv.push(generatePV(_date))
  sales.push(generateSales(_date))
}

function isInRange(start, end, curr) {
  curr = new Date(curr)
  return curr >= new Date(start) && curr <= new Date(end)
}

export default {
  pv(config) {
    let { start, end } = JSON.parse(config.body)
    if (!start || !end) {
      end = Dater.format(new Date(), 'yyyy-MM-dd')
      start = Dater.format(new Date() - oneDay * 30, 'yyyy-MM-dd')
    }

    return pv.filter(v => isInRange(start, end, v.date))
  },

  sales(config) {
    let { start, end } = JSON.parse(config.body)
    if (!start || !end) {
      end = Dater.format(new Date(), 'yyyy-MM-dd')
      start = Dater.format(new Date() - oneDay * 30, 'yyyy-MM-dd')
    }

    return sales.filter(v => isInRange(start, end, v.date))
  }
}
