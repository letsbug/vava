const req = require.context('@/assets/icons', false, /\.svg$/)
const all = context => context.keys()

const reg = /\.\/(.*)\.svg/

const icons = all(req).map(i => i.match(reg)[1])

export default icons

