// 生成浏览量相关的数据

import Dictionaries from '../dictionaries'

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
 * 生成按性别划分的统计
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
 * 生成按年龄段划分的统计
 * @param uv
 * @returns {Array}
 */
export function generateAges(uv) {
  const ages = []
  const average = uv / Dictionaries.ages.length / 2
  Dictionaries.ages.forEach((section, i) => {
    let total = 0
    if (i + 1 === Dictionaries.ages.length) {
      total = uv
    } else {
      total = Math.floor(Math.random() * average + average)
      uv = uv - total
    }
    ages.push(Object.assign({ section }, generateGender(total), { total }))
  })
  return ages
}

/**
 * 生成按国家区分的统计
 * @param pv
 */
export function generateAreas(pv) {
  const areas = []
  const keys = Object.keys(Dictionaries.countries)

  let max = pv / keys.length

  keys.forEach((name, i) => {
    if (i + 1 !== keys.length) {
      const value = Math.floor(Math.random() * (max / 2) + (max / 2))
      areas.push({ name, value })
      pv -= value
      max = pv / (keys.length - i - 1)
    } else {
      areas.push({ name, value: pv })
    }
  })

  areas.sort((a, b) => b.value - a.value)

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

/**
 * 生成受访页面，来源网站的TOP10列表
 * @param pv
 */
export function generateTraffics(pv) {
  const source = []
  const interview = []
  const average = pv / Dictionaries.originSite.length / 2

  Dictionaries.originSite.forEach((url, i) => {
    source.push({
      url, pv: Math.floor(Math.random() * average + average)
    })
    interview.push({
      url: Dictionaries.pages[i], pv: Math.floor(Math.random() * average + average)
    })
  })

  return { source, interview }
}
