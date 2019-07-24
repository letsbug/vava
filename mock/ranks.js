import Mock from 'mockjs'
import { orgs } from './orgs'
import { generateResponse } from './response'

const _orgs = orgs.filter((v, i) => i < 6)
const Random = Mock.Random
const ranks = []
const topCount = 30

const prefixs = ['部', '组', '中心']

function generateRanks(parentId, orgId, _name) {
  const id = Random.increment(1000)
  const prefix = prefixs[Math.floor(Math.random() * 3)]
  const name = _name || Random.cword(2, 4) + prefix
  // console.log('generate rank ===>>> id: ', id, ', parentId: ', parentId, ', orgId: ', orgId)

  return Mock.mock({
    id,
    parentId,
    orgId,
    name,
    introduction: '@cparagraph(3)',
    creatime: new Date(),
    updatime: new Date()
  })
}

function randomGetOrgId(index) {
  return _orgs[index % _orgs.length].id
}

function randomGetParentId() {
  const index = Math.floor(Math.random() * topCount)
  return ranks[index].id
}

for (let i = 0; i < 54; i++) {
  const orgId = randomGetOrgId(i)
  const parentId = i < topCount ? 0 : randomGetParentId()

  ranks.push(generateRanks(parentId, orgId))
}

export default [
  {
    url: '/department/list',
    type: 'post',
    response: config => {
      const { orgId, parentId } = config.body
      const pId = parentId || 0

      const data = ranks.filter(v => v.orgId === orgId && v.parentId === pId)

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

      const exist = ranks.find(v => v.orgId === orgId && v.parentId === parentId && v.name === name)

      if (exist) {
        return generateResponse(5002)
      }

      const data = generateRanks(parentId, orgId, name)
      ranks.push(data)

      return generateResponse(2000, data)
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
