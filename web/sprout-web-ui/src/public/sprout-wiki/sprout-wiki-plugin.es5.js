import { Component, Injectable, NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable as Observable$1 } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
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
    { type: Component, args: [{
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
        return Observable$1.of(this.plugins);
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
    { type: Injectable },
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
    { type: Component, args: [{
                template: "<h1>hello from the plugin loader",
                providers: [
                    {
                        provide: NgModuleFactoryLoader,
                        useClass: SystemJsNgModuleLoader
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
    { type: NgModule, args: [{
                imports: [
                    CommonModule
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
    { type: NgModule, args: [{
                imports: [
                    CommonModule
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
/**
 * Generated bundle index. Do not edit.
 */
export { WikiModule, WikiComponent };
//# sourceMappingURL=sprout-wiki-plugin.es5.js.map
