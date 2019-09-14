'use strict'

const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const metas = require('./build/metas')
const settings = require('./src/settings')
const mockServer = require('./mock/mock-server')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = settings.title || 'VAVA'
const port = 9090

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port,
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    after: mockServer
  },
  configureWebpack(config) {
    // console.log(config)

    // 非开发环境开启gzip压缩打包
    const compressPlugin = new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css)$'),
      threshold: 10240,
      minRatio: 0.8
    })
    if (process.env.VUE_APP_FLAG !== 'dev') {
      config.plugins.push(compressPlugin)
    }
  },
  chainWebpack(config) {
    config.plugin('html').tap(args => {
      const arg = args[0]
      arg.meta = metas
      arg.templateParameters = {
        TITLE: name,
        BASE_URL: './'
      }
      return args
    })

    config.output.filename('[name].[hash].js').end()

    // svg loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    // https://webpack.js.org/configuration/devtool/#development
    // config.when(process.env.NODE_ENV === 'development', config => config.devtool('cheap-source-map'))

    // package sets
    config.when(
      process.env.NODE_ENV !== 'development',
      config => {
        config.optimization.splitChunks({
          chunks: 'all',
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial' // only package third parties that are initially dependent
            },
            commons: {
              name: 'chunk-commons',
              test: resolve('src/components'), // can customize your rules
              minChunks: 2, //  minimum common number
              priority: 5,
              reuseExistingChunk: true
            },
            element: {
              name: 'chunk-element', // split elementUI into a single package
              priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
              test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
            },
            echarts: {
              name: 'chunk-echarts',
              priority: 20,
              test: /[\\/]node_modules[\\/]echarts[\\/]/
            },
            xlsx: {
              name: 'chunk-xlsx',
              priority: 20,
              test: /[\\/]node_modules[\\/]xlsx[\\/]/
            },
            highlight: {
              name: 'chunk-highlight',
              priority: 20,
              test: /[\\/]node_modules[\\/]highlight.js[\\/]/
            }
          }
        })
        config.optimization.runtimeChunk('single')
      }
    )
  }
}
