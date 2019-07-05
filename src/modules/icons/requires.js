// webpack require.context params:
// 1. You want to import the directory of files
// 2. Whether to look for subdirectories under this directory
// 3. Match the file to be imported
const req = require.context('@/icons/svgs', false, /\.svg$/)
const all = context => context.keys()

const reg = /\.\/(.*)\.svg/

const icons = all(req).map(i => i.match(reg)[1])

export default icons
