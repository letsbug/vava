import Mock from 'mockjs'

const list = []
const count = 100

const random = () => {
  Mock.mock({
    id: '@increment(1000)',
    timestamp: '@date(T)',
    'author|1': ['@first', '@cname'],
    title: '@title(5, 20)',
    short: ''
  })
  return {}
}

for (let i = 0; i < count; i++) {
  list.push(random())
}

export default {
  list: () => {},
  detail: () => {},
  create: () => {},
  update: () => {}
}
