//
// 模拟统计数据
//

import { Dater } from '@/tools'
import { generatePV } from './pv'

const count = 365 * 3 // 3 years
const pv = []
const sales = []

for (let i = 0; i < count; i++) {
  let date = new Date()
  if (count > 0) date.setDate(date.getDate() - count)
  date = Dater.format(date, 'yyyy-MM-dd')

  pv.push(generatePV(date))
  // sales.push(generateSales(i))
}

console.log(pv[0])

function isInRange(start, end, curr) {
  curr = +new Date(curr)
  return curr >= +new Date(start) && curr <= +new Date(end)
}

export default {
  pv(config) {
    let { start, end } = JSON.parse(config.body)
    if (!start || !end) {
      start = end = Dater.format(new Date(), 'yyyy-MM-dd')
    }
    return pv.filter(v => start === end ? v.date === start : isInRange(start, end, v.date))
  },
  sales(config) {
    return sales
  }
}
