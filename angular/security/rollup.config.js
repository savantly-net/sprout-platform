import resolve from 'rollup-plugin-node-resolve';

//Add here external dependencies that actually you use.
const globals = {
 '@angular/core': 'ng.core',
 '@angular/common': 'ng.common',
 'rxjs/Observable': 'Rx',
 'rxjs/Observer': 'Rx',
 'rxjs/add/operator/map': 'Rx'
};

export default {
  entry: 'dist/modules/ngx.security.es5.js',
  dest: 'dist/bundles/ngx.security.umd.js',
  sourceMap: true,
  format: 'umd',
  exports: 'named',
  moduleName: 'ngx.security',
  plugins: [resolve()],
  external: Object.keys(globals),
  globals: globals
}