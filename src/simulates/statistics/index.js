//
// 模拟统计数据
//

import { generatePV } from './pv'
import { Dater } from '@/tools'

const count = 365 * 3 // 3 years
const pv = []
const sales = []

// function generateSales(count) {
// }

for (let i = 0; i < count; i++) {
  let date = new Date()
  if (count > 0) date.setDate(date.getDate() - count)
  date = Dater.format(date, 'yyyy-MM-dd')

  pv.push(generatePV(date))
  // sales.push(generateSales(i))
}

console.log(pv[0])

export default {
  pv: (dateRange) => pv,
  sales: (dateRange) => sales
}
