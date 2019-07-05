const req = require.context('@/assets/images/avatars', false, /\.gif$/)
const all = context => context.keys()

const reg = /\.\/(.*)\.gif/

const avatars = all(req).map(i => i.match(reg)[1] + '.gif')

export default avatars
