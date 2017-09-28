(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.sprout_wiki_plugin = {})));
}(this, (function (exports) { 'use strict';

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var build = createCommonjsModule(function (module, exports) {
(function (factory) {
    {
        var v = factory(commonjsRequire, exports);
        if (v !== undefined) module.exports = v;
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var wiki_module_1 = require("./wiki/wiki.module");
    exports.WikiModule = wiki_module_1.WikiModule;
    var wiki_component_1 = require("./wiki/wiki.component");
    exports.WikiComponent = wiki_component_1.WikiComponent;
});

});

var index = unwrapExports(build);

exports['default'] = index;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sprout-wiki-plugin.umd.js.map
