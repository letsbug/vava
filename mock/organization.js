import Mock from 'mockjs'
import { generateResponse } from './response'

const Random = Mock.Random

const groupName = Random.cword(2)

export const orgs = []
export const ranks = []

function generateRank(orgId, count) {
  const prefixs = ['部', '中心', '组']

  const id = Random.increment()
  const name = Random.cword(2, 4) + prefixs[Math.floor(Math.random() * prefixs.length)]
  // const parentId = count > 50 ? 0 : ranks[Math.floor(Math.random() * 50)].id
  const parentId = 0
  ranks.push({ id, parentId, orgId, name })
}

function generateCompany(parentId) {
  const name = Random.cword(2)
  const id = Random.increment()
  const city = Random.city()

  return Mock.mock({
    id,
    parentId,
    name: parentId === 0 ? `${city}${groupName}集团股份有限公司` : `${city}${groupName}${name}有限公司`,
    short: parentId === 0 ? `${groupName}网` : `${groupName}${name}`,
    introduction: '@cparagraph(3)',
    remark: '@csentence(10, 15)'
  })
}

const group = generateCompany(0)

orgs.push(group)
for (let i = 0; i < 10; i++) {
  const company = generateCompany(group.id)
  orgs.push(company)
}

for (let i = 0; i < 150; i++) {
  const orgId = orgs[Math.floor(Math.random() * orgs.length)].id
  const rank = generateRank(orgId, i)
  ranks.push(rank)
}

export default [
  // 组织架构
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
    url: '/organization/add',
    type: 'post',
    response: config => {
      const { parentId, datas } = config.body
      if (!parentId) {
        return generateResponse(5001)
      }

      const { name, short } = datas
      if (orgs.find(v => v.name === name || v.short === short)) {
        return generateResponse(5002)
      }

      const id = Random.increment()
      const rank = generateRank(id)
      orgs.push(Object.assign({}, datas, { id, rank, parentId }))

      return generateResponse(2000)
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
  },

  // 部门职位
  {
    url: '/department/list',
    type: 'post',
    response: config => {
      const { orgId, parentId } = config.body
      const pId = parentId || 0

      const data = ranks.filter(v => v.orgId === orgId && v.parentId === pId)
      // console.log(orgId, parentId, data)

      return generateResponse(2000, data)
    }
  },
  {
    url: '/department/update',
    type: 'post',
    response: config => {
      const { id, orgId, name } = config.body

      if (!id || !orgId) {
        return generateResponse(5001)
      }

      ranks.forEach(v => {
        if (v.id === id && orgId === v.orgId) {
          v.name = name
        }
      })

      return generateResponse(2000)
    }
  },
  {
    url: '/department/add',
    type: 'post',
    response: config => {
      const { orgId, parentId, name } = config.body

      if (!orgId || !parentId) {
        return generateResponse(5001)
      }

      ranks.push({ orgId, parentId, id: Random.increment(), name })
      return generateResponse(2000)
    }
  },
  {
    url: '/department/delete',
    type: 'post',
    response: config => {
      const { orgId, parentId, id } = config.body
      if (!orgId || !parentId || !id) {
        return generateResponse(5001)
      }

      ranks.forEach((v, i) => {
        if (v.id === id && v.id === parentId) {
          ranks.splice(i, 1)
        }
      })

      return generateResponse(2000)
    }
  }
]
