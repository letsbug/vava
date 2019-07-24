import Service from '@/tools/request'

const orgs = (parentId = null) => {
  return Service.post('/organization/list', { parentId })
}

const orgUpdate = (parentId, name, id) => {
  const datas = { name }
  return Service.post('/organization/update', { id, parentId, datas })
}

const orgAdd = (parentId, name) => {
  const datas = { name }
  return Service.post('/organization/add', { parentId, datas })
}

const orgDelete = (id, parentId) => {
  return Service.post('/organization/delete', { id, parentId })
}

const ranks = (orgId, parentId = null) => {
  return Service.post('/department/list', { orgId, parentId })
}

const rankUpdate = (parentId, name, id, orgId) => {
  return Service.post('/department/update', { id, orgId, name })
}

const rankAdd = (parentId, name, id, orgId) => {
  return Service.post('/department/add', { orgId, parentId, name })
}

const rankDelete = (orgId, parentId, id) => {
  return Service.post('/department/delete', { orgId, parentId, id })
}

export default {
  // 组织架构
  orgs,
  orgUpdate,
  orgAdd,
  orgDelete,

  // 部门结构
  ranks,
  rankUpdate,
  rankAdd,
  rankDelete
}
