import Mock from 'mockjs'
import { generateResponse } from '../response'

const Random = Mock.Random

const length = 10
const organizations = []
const groupName = Random.cword(2)

function generateRank(orgId) {
  const names = ['财务部', '人事行政部', '销售中心', '技术中心', '产品组', 'UI组', '开发组']
  const ranks = []

  names.forEach((name, i) => {
    const id = Random.increment()
    const parentId = i > 3 ? ranks[3].id : 0
    ranks.push({ id, parentId, orgId, name })
  })

  return ranks
}

function generateCompany(parentId) {
  const name = Random.cword(2)
  const id = Random.increment()
  const rank = generateRank(id)
  const city = Random.city()

  return Mock.mock({
    id,
    parentId,
    name: parentId === 0 ? `${city}${Random.cword(2)}集团股份有限公司` : `${city}${groupName}${name}有限公司`,
    short: parentId === 0 ? `${groupName}网` : `${groupName}${name}`,
    introduction: '@cparagraph(3)',
    remark: '@csentence(10, 15)',
    rank
  })
}

const group = generateCompany(0)
organizations.push(group)

for (let i = 0; i < length; i++) {
  const company = generateCompany(group.id)
  organizations.push(company)
}

export const orgs = organizations

export default [
  // 组织架构
  {
    path: '/organization/list',
    type: 'post',
    response: config => {
      let { parentId } = config.body
      if (!parentId) {
        parentId = 0
      }
      const data = orgs.filter(org => org.id === parentId)
      return generateResponse(2000, data)
    }
  },
  {
    path: '/organization/update',
    type: 'post',
    response: config => {
      const { id, parentId, datas } = config.body
      if (!id || !parentId) {
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
    path: '/organization/add',
    type: 'post',
    response: config => {
      const { parentId, datas } = config.body
      if (!parentId) {
        return generateResponse(5001)
      }

      console.log(datas)
      return generateResponse(2000)
    }
  },
  {
    path: '/organization/delete',
    type: 'post',
    response: config => {
      console.log(config)
    }
  },

  // 部门职位
  {
    path: '/department/list',
    type: 'post',
    response: config => {
      console.log(config)

      const { orgId } = config.body
      const data = organizations.find(org => {
        return org.id === orgId
      }).rank

      return generateResponse(2000, data)
    }
  }
]
