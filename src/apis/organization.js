import Service from '@/tools/request'

const orgs = (parentId = null) => {
  return Service.post('/organization/list', { parentId })
}

const ranks = (orgId, parentId = null) => {
  return Service.post('/department/list', { orgId, parentId })
}

export default {
  // 组织架构
  orgs,
  orgUpdate() {},
  orgAdd() {},
  orgDelete() {},

  // 部门结构
  ranks
}
