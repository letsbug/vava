const figures = require.context('./', false, /\.svg$/)
const req = context => context.keys().map(context)
req(figures)
