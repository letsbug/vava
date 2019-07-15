import Mock from 'mockjs'

const Random = Mock.Random

const length = 10
const organizations = []
const groupName = Random.cword(2)

function generateRank(orgId) {
  const cw = {
    id: Random.increment(),
    parentId: 0,
    orgId,
    name: '财务部'
  }

  const rs = {
    id: Random.increment(),
    parentId: 0,
    orgId,
    name: '人事行政部'
  }

  const js = {
    id: Random.increment(),
    parentId: 0,
    orgId,
    name: '技术中心'
  }

  const cp = {
    id: Random.increment(),
    parentId: js.id,
    orgId,
    name: '产品组'
  }

  const ui = {
    id: Random.increment(),
    parentId: js.id,
    orgId,
    name: 'UI组'
  }

  const dev = {
    id: Random.increment(),
    parentId: js.id,
    orgId,
    name: '开发组'
  }

  return [cw, rs, js, cp, ui, dev]
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
      const params = config.body
      console.log(params)
      return orgs
    }
  },
  {
    path: '/organization/update',
    type: 'post',
    response: config => {
      console.log(config)
    }
  },
  {
    path: '/organization/add',
    type: 'post',
    response: config => {
      console.log(config)
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

      return {
        status: 2000,
        success: true,
        message: 'success',
        data
      }
    }
  }
]
