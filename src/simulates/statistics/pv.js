// 生成浏览量相关的数据

import Dictionaries from '@/simulates/dictionaries'

/**
 * 生成 uv 基础数据
 * @param pv
 * @returns {number}
 */
function generateUV(pv) {
  const min = 500
  const max = pv > 5999 ? 5999 : pv - 200

  return Math.floor(Math.random() * (max - min) + min)
}

/**
 * 生成按性别区分的统计
 * @param uv
 * @returns {{female: number, male: number, unknown: number}}
 */
export function generateGender(uv) {
  const male = Math.floor(Math.random() * (uv / 2))
  const female = Math.floor(Math.random() * (uv - male))
  const unknown = uv - male - female
  return { male, female, unknown }
}

/**
 * 生成按国家区分的统计
 * @param pv
 */
export function generateAreas(pv) {
  const areas = {}
  const keys = Object.keys(Dictionaries.countries)
  let max = pv - (keys.length * 10)
  keys.forEach(k => {
    areas[k] = Math.floor(Math.random() * max)
    max = max - areas[k]
  })
  return areas
}

/**
 * 生成 pv, uv, cvr
 * @param date
 * @returns {{date: *, uv: number, pv: number, cvr: number}}
 */
export function generatePV(date) {
  const pv = Math.floor(Math.random() * 8999 + 1000)
  const uv = generateUV(pv)
  const cvr = +(Math.random() * 0.5 + 0.4).toFixed(4)

  return { date, pv, uv, cvr }
}
