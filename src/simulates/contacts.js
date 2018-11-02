import Mock from 'mockjs'
import ContactsVo from '@/vo/ContactsVo'
import BaseVo from '@/vo/BaseVo'

let list = []

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
  company: '@city' + '@cword(3, 8)' + '责任有限公司'
})

for (let i = 0; i < 100; i++) {
  list.push(new ContactsVo(random(false)))
}
list = list.sort((a, b) => a.name > b.name ? 1 : -1)

export default {
  list: config => {
    const { page, size } = JSON.parse(config.body)
    const total = list.length
    const vo = new BaseVo({ page, size, total })
    const min = (vo.page - 1) * vo.size
    const max = vo.page * vo.size
    return {
      pages: vo,
      list: list.filter((v, i) => (i > min && i <= max))
    }
  }
}
