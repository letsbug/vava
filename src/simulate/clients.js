/**
 * clients (Create by ggboom)
 * @author: ggboom
 * @datetime: 2018/7/27 12:20
 */

import Mock from 'mockjs'

const List = []
const count = 154

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    status: Math.floor(Math.random() * 4),
    date: +Mock.Random.date('T'),
    name: '@cfirst' + '@clast',
    phone: '189****7716',
    region: '@region',
    address: Mock.Random.city(true) + 'xxxx乡镇xxxx小区xxxx号xxxx栋xxxx号',
    zip: Mock.Random.zip()
  }))
}

export default {
  list: config => {
    const { current = 1, limit = 8, keyword } = JSON.parse(config.body)

    const mockList = List.filter(item => {
      return !(
        keyword &&
        item.name.indexOf(keyword) < 0 &&
        item.phone.indexOf(keyword) < 0 &&
        item.address.indexOf(keyword) < 0
      )
    })

    const pageList = mockList.filter(
      (item, index) => index < limit * current && index >= limit * (current - 1)
    )

    return {
      page: {
        current: current,
        limit: limit,
        total: mockList.length,
        prev: current > 1,
        next: (current + 1) < (mockList.length / limit)
      },
      data: pageList
    }
  }
}
