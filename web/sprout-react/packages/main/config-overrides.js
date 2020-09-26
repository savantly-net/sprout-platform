/* global require, module, __dirname */
const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = override(
  addWebpackAlias({
    ['app']: path.resolve(__dirname, 'src/app')
  })
)