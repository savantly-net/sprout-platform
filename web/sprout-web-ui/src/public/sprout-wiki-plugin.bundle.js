var sprout_wiki_plugin = (function (exports,core,common,ngxSproutPlugin) {
'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */







function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}



function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

var WikiComponent = /** @class */ (function () {
    function WikiComponent() {
    }
    WikiComponent.prototype.ngOnInit = function () {
    };
    WikiComponent = __decorate([
        core.Component({
            selector: 'my-sprout-wiki',
            template: "<h1>Hello from the wiki module</h1>",
            styles: []
        }),
        __metadata("design:paramtypes", [])
    ], WikiComponent);
    return WikiComponent;
}());

var WikiModule = /** @class */ (function () {
    function WikiModule(registry) {
        this.name = 'wiki-plugin';
        this.template = '<h1>Hello from the wiki</h1>';
        registry.register(this);
    }
    WikiModule = __decorate([
        core.NgModule({
            imports: [
                common.CommonModule
            ],
            exports: [WikiComponent],
            declarations: [WikiComponent],
            providers: []
        }),
        __metadata("design:paramtypes", [ngxSproutPlugin.SproutPluginRegistryService])
    ], WikiModule);
    return WikiModule;
}());

exports.WikiModule = WikiModule;
exports.WikiComponent = WikiComponent;

return exports;

}({},core,common,ngxSproutPlugin));
//# sourceMappingURL=sprout-wiki-plugin.bundle.js.map
