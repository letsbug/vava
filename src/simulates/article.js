import Mock from 'mockjs'
import { Urls } from '@/tools'
import Account from './account'
import ArticleVo from '@/vo/ArticleVo'
import BaseVo from '@/vo/BaseVo'

const list = []
const total = 100

const random = cn => Mock.mock({
  id: '@increment',
  timestamp: +Mock.Random.date('T'),
  'author|1': cn ? '@cname' : '@first',
  'auditor|1': Account.auditors().map(v => v.username),
  title: cn ? '@ctitle(5, 20)' : '@title(5, 20)',
  summery: cn ? '@cparagraph(1, 2)' : '@paragraph(1, 2)',
  content: cn ? '<p>@cparagraph</p><p>@cparagraph</p><p>@cparagraph</p><p>@cparagraph</p>'
    : '<p>@paragraph</p><p>@paragraph</p><p>@paragraph</p><p>@paragraph</p>',
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
    const params = JSON.parse(config.body)

    const title = params.title || null
    const level = params.level || null
    const status = params.status || null

    const _list = list.filter(v => {
      let is = true
      if (title) is = ~v.title.indexOf(title)
      if (level) is = v.level === level
      if (status) is = v.status === status
      return is
    })

    const { page, size } = params
    const vo = new BaseVo({ page, size, total: _list.length })

    const min = (vo.page - 1) * vo.size
    const max = vo.page * vo.size

    return {
      pages: vo,
      list: _list.filter((v, i) => (i >= min && i < max))
    }
  },
  detail: config => {
    const { id } = Urls.parse(config.url)
    return list.filter(v => v.id === id)
  },
  create: () => 'success',
  update: config => {
    const params = JSON.parse(config.body)
    if (!params.id) return { success: false, message: 'The params \'id\' is not defined.' }
    let modified = false
    for (const i in list) {
      if (list[i].id === params.id) {
        Object.keys(params).forEach(key => {
          list[i][key] = params[key]
        })
        modified = true
        break
      }
    }
    return {
      success: modified,
      message: modified ? 'success' : 'failed'
    }
  },
  batch: config => {
    const lst = JSON.parse(config.body)
    list.forEach((v, i) => {
      lst.forEach(p => {
        if (v.id === p.id) {
          Object.keys(p).forEach(key => {
            list[i][key] = p[key]
          })
        }
      })
    })
    return {
      success: true,
      message: 'success'
    }
  }
}
