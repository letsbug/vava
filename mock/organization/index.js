import Mock from 'mockjs'

const group = Mock.mock({
  id: '@increment',
  parent: 0,
  name: '重庆华龙网集团股份有限公司',
  short: '华龙网',
  introduction: '@cparagraph(3)',
  remark: '@csentence(10, 15)'
})

const organizations = [
  group,
  Mock.mock({
    id: '@increment',
    parent: group.id,
    name: '党委办公室',
    short: '党办',
    introduction: '@cparagraph(3)',
    remark: '@csentence(10, 15)'
  }),
  Mock.mock({
    id: '@increment',
    parent: group.id,
    name: '华龙艾迪',
    short: '艾迪',
    introduction: '@cparagraph(3)',
    remark: '@csentence(10, 15)'
  }),
  Mock.mock({
    id: '@increment',
    parent: group.id,
    name: '新华龙掌媒',
    short: '新华龙',
    introduction: '@cparagraph(3)',
    remark: '@csentence(10, 15)'
  }),
  Mock.mock({
    id: '@increment',
    parent: group.id,
    name: '华龙信用',
    short: '信用',
    introduction: '@cparagraph(3)',
    remark: '@csentence(10, 15)'
  }),
  Mock.mock({
    id: '@increment',
    parent: group.id,
    name: '华龙文化艺术中心',
    short: '文艺',
    introduction: '@cparagraph(3)',
    remark: '@csentence(10, 15)'
  }),
  Mock.mock({
    id: '@increment',
    parent: group.id,
    name: '华龙网文化实业',
    short: '实业',
    introduction: '@cparagraph(3)',
    remark: '@csentence(10, 15)'
  })
]

export default organizations
