import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
// import sourceMaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import ignore from "rollup-plugin-ignore"

const pkg = require('./package.json');

const libraryName = pkg.name;

const buildCjsPackage = ({ env }) => {
  return {
    input: `compiled/index.js`,
    output: [
      {
        //dir: 'dist',
        //chunkName: `[name].${env}.js`,
        file: `dist/index.${env}.js`,
        name: libraryName,
        format: 'cjs',
        sourcemap: true,
        strict: false,
        exports: 'named',
        globals: {
          react: 'React',
          'prop-types': 'PropTypes'
        },
      },
    ],
    external: [
      'react',
      'react-dom',
      '@savantly/sprout-api',
    ],
    plugins: [
      commonjs({
        include: /node_modules/,
        // When 'rollup-plugin-commonjs' fails to properly convert the CommonJS modules to ES6 one has to manually name the exports
        // https://github.com/rollup/rollup-plugin-commonjs#custom-named-exports
        namedExports: {
          'node_modules/lodash/lodash.js': [
            'flatten',
            'find',
            'upperFirst',
            'debounce',
            'isNil',
            'isNumber',
            'flattenDeep',
            'map',
            'chunk',
            'sortBy',
            'uniqueId',
            'zip',
            'omit',
            'isString',
            'isEmpty',
            'toLower',
          ],
        },
      }),
      resolve({
        browser: false,
        customResolveOptions: {
            moduleDirectory: 'node_modules',
        }
      }),
      //sourceMaps(),
      image(),
      ignore(['indexof']),
      env === 'production' && terser(),
    ],
    onwarn: function (warning, warn) {
      if (warning.code === 'CIRCULAR_DEPENDENCY') return;
      warn(warning);
    }
  };
};
export default [buildCjsPackage({ env: 'development' }), buildCjsPackage({ env: 'production' })];