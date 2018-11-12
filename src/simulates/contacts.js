import Mock from 'mockjs'
import ContactsVo from '@/vo/ContactsVo'
import BaseVo from '@/vo/BaseVo'

let list = []
const count = 100

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

for (let i = 0; i < count; i++) {
  list.push(new ContactsVo(random(false)))
}
list = list.sort((a, b) => a.name > b.name ? 1 : -1)

export default {
  list: config => {
    const { page, size } = JSON.parse(config.body)
    const vo = new BaseVo({ page, size, count })
    const min = (vo.page - 1) * vo.size
    const max = vo.page * vo.size
    return {
      pages: vo,
      list: list.filter((v, i) => (i >= min && i < max))
    }
  },
  all: () => list
}
