import { WikiComponent } from './wiki.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SproutPluginRegistryService } from '@savantly/ngx-sprout-plugin/index';
export class WikiModule {
    /**
     * @param {?} registry
     */
    constructor(registry) {
        this.name = 'wiki-plugin';
        this.template = '<h1>Hello from the wiki</h1>';
        registry.register(this);
    }
}
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
WikiModule.ctorParameters = () => [
    { type: SproutPluginRegistryService, },
];
function WikiModule_tsickle_Closure_declarations() {
    /** @type {?} */
    WikiModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    WikiModule.ctorParameters;
    /** @type {?} */
    WikiModule.prototype.name;
    /** @type {?} */
    WikiModule.prototype.template;
}
//# sourceMappingURL=wiki.module.js.map