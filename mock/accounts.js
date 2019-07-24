/*
 * User account information.
 * For user login information verification, permission check and restriction.
 * 用户账户信息表，用于用户登录信息验证，权限校验和限制。
 */

import Mock from 'mockjs'
import { orgs, ranks } from './orgs'

// const Random = Mock.Random
const list = []
const posts = ['总经理', '人事经理', '开发组长', '项目经理', '产品经理', '设计主管', '架构师', '财务经理']
const roles = ['SuperAdmin', 'AccessManager', 'UserManager', 'Auditor', 'Editor', 'Visitor']

function randomGetRank() {
  const { id: rankId, name: rankName, orgId } = ranks[Math.floor(Math.random() * ranks.length)]
  const { name: orgName } = orgs.find(v => v.id === orgId)

  return { rankId, rankName, orgId, orgName }
}

function generateAccount() {
  const org = randomGetRank()

  const data = Mock.mock({
    id: '@increment(1000)',
    username: '@first',
    creatime: new Date(),
    updatime: new Date(),
    'post|1': posts,
    'role|1': roles
  })
  return Object.assign({}, data, org)
}

list.push(generateAccount())
