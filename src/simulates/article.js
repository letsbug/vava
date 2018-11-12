import Mock from 'mockjs'
import { Urls } from '@/tools'
import ArticleVo from '@/vo/ArticleVo'
import BaseVo from '@/vo/BaseVo'

const list = []
const total = 100

const random = cn => Mock.mock({
  id: '@increment',
  timestamp: +Mock.Random.date('T'),
  'author|1': cn ? '@cname' : '@first',
  'auditor|1': cn ? '@cname' : '@first',
  title: cn ? '@ctitle(5, 20)' : '@title(5, 20)',
  summery: cn ? '@cparagraph(1, 2)' : '@paragraph(1, 2)',
  content: cn ? `<p>@cparagraph</p><p>@cparagraph</p><p>@cparagraph</p><p>@cparagraph</p>`
    : `<p>@paragraph</p><p>@paragraph</p><p>@paragraph</p><p>@paragraph</p>`,
  level: '@integer(1, 5)',
  'status|1': ['draft', 'committed', 'failing', 'auditing', 'audited', 'deleted'],
  display: '@datetime',
  pv: '@integer(100, 29999)',
  'origin|1': ['@platform-a', '@platform-b', '@platform-c', '@platform-d']
})

for (let i = 0; i < total; i++) {
  list.push(new ArticleVo(random(false)))
}

export default {
  list: config => {
    const { page, size } = JSON.parse(config.body)
    const vo = new BaseVo({ page, size, total })

    const min = (vo.page - 1) * vo.size
    const max = vo.page * vo.size

    return {
      pages: vo,
      list: list.filter((v, i) => (i >= min && i < max))
    }
  },
  detail: config => {
    const { id } = Urls.parse(config.url)
    return list.filter(v => v.id === id)
  },
  create: () => {},
  update: () => {}
}
