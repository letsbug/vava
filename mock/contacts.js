import Mock from 'mockjs'
import ContactsVo from '../src/vo/ContactsVo'
import BaseVo from '../src/vo/BaseVo'
import { generateResponse } from './response'

let list = []
const total = 100

const random = cn => Mock.mock({
  id: '@guid',
  card: Mock.Random.id(),
  name: cn ? '@cname' : '@name',
  city: '@city',
  province: '@province',
  postcode: '@zip',
  tel: '@integer(100, 999)' + '-' + '@integer(10000000, 99999999)',
  mobile: '@integer(10000000000, 19999999999)',
  fax: '@integer(100, 999)' + '-' + '@integer(10000000, 99999999)',
  email: '@email',
  qq: '@integer(10000000, 13999999999)',
  company: '@city@cword(3, 8)有限责任公司'
})

function generateDatas() {
  if (list.length > 0) {
    return
  }

  for (let i = 0; i < total; i++) {
    list.push(new ContactsVo(random(false)))
  }
  list = list.sort((a, b) => a.name > b.name ? 1 : -1)
}

export default [
  {
    url: '/contacts/list',
    type: 'post',
    response: config => {
      if (list.length < 1) {
        generateDatas()
      }
      const { page, size } = config.body
      const vo = new BaseVo({ page, size, total })
      const min = (vo.page - 1) * vo.size
      const max = vo.page * vo.size

      const data = list.filter((v, i) => (i >= min && i < max))

      return generateResponse(2000, data, vo)
    }
  },
  {
    url: '/contacts/all',
    type: 'post',
    response: () => {
      generateDatas()
      return generateResponse(2000, [])
    }
  }
]
