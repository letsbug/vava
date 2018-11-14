const req = require.context('@/assets/images/avatars', false, /\.jpg$/)
const all = context => context.keys()

const reg = /\.\/(.*)\.jpg/

const avatars = all(req).map(i => i.match(reg)[1] + '.jpg')

export default avatars
