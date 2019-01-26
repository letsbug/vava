//
// 模拟统计数据
//

import { Dater } from '@/tools'
import { generatePV, generateAreas, generateGender } from './pv'

const count = 365 * 2 // 2 years
const pv = []

const oneDay = 24 * 3600 * 1000
let now = new Date()

for (let i = 0; i < count; i++) {
  if (i > 0) now -= oneDay

  const _date = Dater.format(now, 'yyyy-MM-dd')

  pv.push(generatePV(_date))
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

    let totalPV = 0
    let totalUV = 0
    let averageCVR = 0
    const data = pv.filter(v => {
      const _is = isInRange(start, end, v.date)
      if (_is) {
        totalPV += v.pv
        totalUV += v.uv
        averageCVR += v.cvr
      }
      return _is
    })

    const _days = (new Date(end) - new Date(start)) / oneDay
    const averagePV = Math.floor(totalPV / _days)
    const averageUV = Math.floor(totalUV / _days)
    averageCVR = +(averageCVR / _days).toFixed(4)
    const areas = generateAreas(totalPV)
    const totalArea = Object.keys(areas).filter(k => areas[k] > 0).length
    const gender = generateGender(totalUV)

    return { totalPV, totalUV, totalArea, averagePV, averageUV, averageCVR, areas, gender, data }
  }
}
