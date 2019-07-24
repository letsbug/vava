import Mock from 'mockjs'
import { generateResponse } from './response'

const industries = [
  '影视/媒体/艺术/文化传播',
  '互联网/电子商务',
  '会计/金融/银行/保险',
  '贸易/消费/制造/营运',
  '制药/医疗',
  '房地产/建筑',
  '专业服务/教育/培训',
  '服务业',
  '物流/运输',
  '能源/原材料',
  '政府/非营利组织/其他'
]

const properties = [
  '国企', '外资', '上市公司',
  '合资', '民营', '政府机关',
  '事业单位', '非营利组织', '创业公司'
]

const Random = Mock.Random
export const orgs = []

function generateCompany(parentId = 0, city, prefix) {
  const id = Random.increment(100)
  const name = Random.cword(2)
  return Mock.mock({
    id,
    parentId,
    name: `${city}${name}${prefix}有限公司`,
    short: `${name}科技`,
    introduction: '@cparagraph(3)',
    creatime: new Date(),
    updatime: new Date(),
    address: '@county(true)',
    email: '@email',
    phone: `023-${Random.string('@string("number", 8)')}`,
    fax: `023-${Random.string('@string("number", 8)')}-${Random.string('@string("number", 3)')}`,
    'industry|1': industries,
    'property|1': properties
  })
}

const group = generateCompany(0, '重庆市', '集团科技股份')
orgs.push(group)

for (let i = 0; i < 5; i++) {
  orgs.push(generateCompany(group.id, '重庆市', '科技'))
}

for (let i = 0; i < 5; i++) {
  const city = Random.city()
  orgs.push(generateCompany(0, city, '科技'))
}

export default [
  {
    url: '/organization/list',
    type: 'post',
    response: config => {
      let { parentId } = config.body
      if (typeof parentId !== 'number') {
        parentId = 0
      }
      const data = orgs.filter(org => org.parentId === parentId)
      return generateResponse(2000, data)
    }
  },
  {
    url: '/organization/update',
    type: 'post',
    response: config => {
      const { id, parentId, datas } = config.body
      if (!~id || !~parentId) {
        return generateResponse(5001)
      }

      orgs.forEach(v => {
        if (v.id === id && v.parentId === parentId) {
          Object.keys(v).forEach(key => {
            if (datas[key]) v[key] = datas[key]
          })
        }
      })

      return generateResponse(2000)
    }
  },
  {
    url: '/organization/add',
    type: 'post',
    response: config => {
      const { parentId, datas } = config.body
      if (!~parentId) {
        return generateResponse(5001)
      }

      const exist = orgs.find(v => v.name === datas.name)
      if (exist) {
        return generateResponse(5002)
      }

      const id = Random.increment()
      const data = Object.assign({}, datas, { id, parentId })
      orgs.push(data)

      return generateResponse(2000, data)
    }
  },
  {
    url: '/organization/delete',
    type: 'post',
    response: config => {
      const { id, parentId } = config.body
      let success = false

      orgs.forEach((v, i) => {
        if (v.id === id && v.parentId === parentId) {
          success = true
          orgs.splice(i, 1)
        }
      })

      generateResponse(success ? 2000 : 5003)
    }
  }
]
