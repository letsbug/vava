import Mock from 'mockjs'
import ContactsVo from '@/vo/ContactsVo'

const list = []

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

export default {
  list: config => {
    console.log(config)
    return list.sort((a, b) => a.id > b.id ? 1 : -1)
  }
}
