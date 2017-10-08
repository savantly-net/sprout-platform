(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs/Observable'), require('rxjs/add/observable/of')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', 'rxjs/Observable', 'rxjs/add/observable/of'], factory) :
	(factory((global['sprout-wiki-plugin'] = {}),global.ng.core,global.ng.common,global.Rx));
}(this, (function (exports,core,common,Observable) { 'use strict';

var WikiComponent = /** @class */ (function () {
    function WikiComponent() {
    }
    /**
     * @return {?}
     */
    WikiComponent.prototype.ngOnInit = function () {
    };
    return WikiComponent;
}());
WikiComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'sv-wiki',
                template: "\n    <h1>Hello from the wiki module</h1>\n  ",
                styles: ["\n\n  "]
            },] },
];
/**
 * @nocollapse
 */
WikiComponent.ctorParameters = function () { return []; };
var SproutPluginRegistryService = (function () {
    function SproutPluginRegistryService() {
        this.plugins = [];
    }
    /**
     * @return {?}
     */
    SproutPluginRegistryService.prototype.getPlugins = function () {
        return Observable.Observable.of(this.plugins);
    };
    /**
     * @param {?} plugin
     * @return {?}
     */
    SproutPluginRegistryService.prototype.register = function (plugin) {
        console.log(plugin);
    };
    return SproutPluginRegistryService;
}());
SproutPluginRegistryService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
SproutPluginRegistryService.ctorParameters = function () { return []; };
var SproutPluginLoaderComponent = (function () {
    /**
     * @param {?} _pluginRegistryService
     */
    function SproutPluginLoaderComponent(_pluginRegistryService) {
        this._pluginRegistryService = _pluginRegistryService;
        this._pluginRegistryService.getPlugins();
    }
    /**
     * @return {?}
     */
    SproutPluginLoaderComponent.prototype.ngAfterViewInit = function () {
    };
    return SproutPluginLoaderComponent;
}());
SproutPluginLoaderComponent.decorators = [
    { type: core.Component, args: [{
                template: "<h1>hello from the plugin loader",
                providers: [
                    {
                        provide: core.NgModuleFactoryLoader,
                        useClass: core.SystemJsNgModuleLoader
                    }
                ]
            },] },
];
/**
 * @nocollapse
 */
SproutPluginLoaderComponent.ctorParameters = function () {
    return [
        { type: SproutPluginRegistryService, },
    ];
};
var SproutPluginModule = (function () {
    function SproutPluginModule() {
    }
    return SproutPluginModule;
}());
SproutPluginModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule
                ],
                exports: [],
                declarations: [SproutPluginLoaderComponent],
                providers: []
            },] },
];
/**
 * @nocollapse
 */
SproutPluginModule.ctorParameters = function () { return []; };
var WikiModule = /** @class */ (function () {
    /**
     * @param {?} registry
     */
    function WikiModule(registry) {
        this.name = 'wiki-plugin';
        this.template = '<h1>Hello from the wiki plugin registration</h1>';
        registry.register(this);
    }
    return WikiModule;
}());
WikiModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule
                ],
                exports: [WikiComponent],
                declarations: [WikiComponent],
                providers: []
            },] },
];
/**
 * @nocollapse
 */
WikiModule.ctorParameters = function () { return [
    { type: SproutPluginRegistryService, },
]; };

exports.WikiModule = WikiModule;
exports.WikiComponent = WikiComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sprout-wiki-plugin.umd.js.map
