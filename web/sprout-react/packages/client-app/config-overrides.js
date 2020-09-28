const { override, babelInclude, addBundleVisualizer } = require('customize-cra')
const path = require('path')


console.log('overriding babelIncludes');

module.exports = override(
  process.env.BUNDLE_VISUALIZE && addBundleVisualizer(),
  babelInclude([
    path.resolve('src'), // make sure you link your own source
  ]),
)