import Dictionaries from '@/simulates/dictionaries'

function generateUV(pv) {
  const min = 500
  const max = pv > 5999 ? 5999 : pv - 200

  return Math.floor(Math.random() * (max - min) + min)
}

function generateGender(uv) {
  const male = Math.floor(Math.random() * (uv / 2))
  const female = Math.floor(Math.random() * (uv - male))
  const unknown = uv - male - female
  return { male, female, unknown }
}

function generateAreas(pv) {
  const areas = {}
  const keys = Object.keys(Dictionaries.countries)
  let max = pv - (keys.length * 10)
  keys.forEach(k => {
    areas[k] = Math.floor(Math.random() * max)
    max = max - areas[k]
  })
  return areas
}

export function generatePV(date) {
  const pv = Math.floor(Math.random() * 8999 + 1000)
  const uv = generateUV(pv)
  const gender = generateGender(uv)
  const areas = generateAreas(pv)

  return { date, pv, uv, gender, areas }
}
