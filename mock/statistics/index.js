//
// 模拟统计数据
//

import Dater from '../../src/tools/_dater'
import { generatePV, generateAreas, generateAges, generateTraffics } from './pv'
import { generateResponse } from '../response'

const count = 365 * 2 // 2 years
const pv = []

const oneDay = 24 * 3600 * 1000
let now = new Date()

function isInRange(start, end, curr) {
  curr = new Date(curr)
  return curr >= new Date(start) && curr <= new Date(end)
}

function generateDatas() {
  if (pv.length > 0) {
    return
  }

  for (let i = 0; i < count; i++) {
    if (i > 0) now -= oneDay

    const _date = Dater.format(now, 'yyyy-MM-dd')

    pv.push(generatePV(_date))
  }
}

export default [
  {
    url: '/statistics/pv',
    type: 'post',
    response: config => {
      generateDatas()

      let { start, end } = config.body
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
      const ages = generateAges(totalUV)
      const traffics = generateTraffics(totalPV)

      return Object.assign(
        generateResponse(2000, data),
        { totalPV, totalUV, averagePV, averageUV, averageCVR, areas, ages, data, traffics }
      )
    }
  }
]
