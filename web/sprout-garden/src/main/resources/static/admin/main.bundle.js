webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app-menu/app-menu.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app-menu/app-menu.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutGap=\"1em\">\n\t<h3>Application Menu Items</h3>\n\t<mat-card>\n    \t<div fxLayout=\"column\" fxLayoutGap=\"1em\">\n\t\t\t<div *ngFor=\"let menu of this.menus | async; trackBy: trackById\">\n\t\t\t\t<ng-container *ngTemplateOutlet=\"menuItemTemplate;context:{parentItem: null, item: menu}\"></ng-container>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<button mat-raised-button color=\"primary\" (click)=\"addItem()\">Add item <mat-icon>add</mat-icon></button>\n\t\t\t</div>\n\t\t</div>\n\t</mat-card>\n</div>\n\n<ng-template #menuItemTemplate let-item=\"item\" let-parentItem=\"parentItem\">\n\t\t<div *ngIf=\"item.editing;else viewOnly\">\n\t\t\t<form #itemForm=\"ngForm\" fxLayout fxLayoutGap=\"0.5em\" fxLayoutAlign=\"start center\">\n\t\t\t\t<mat-form-field>\n\t\t\t\t\t<input matInput [(ngModel)]=\"item.icon\" name=\"icon\" placeholder=\"icon name [ligature]\">\n\t\t\t\t</mat-form-field>\n\t\t\t\t<mat-form-field>\n\t\t\t\t\t<input matInput [(ngModel)]=\"item.displayText\" name=\"displayText\" placeholder=\"display text\">\n\t\t\t\t</mat-form-field>\n\t\t\t\t<mat-form-field>\n\t\t\t\t\t<input matInput [(ngModel)]=\"item.url\" name=\"url\" placeholder=\"url\">\n\t\t\t\t</mat-form-field>\n\t\t\t\t<button mat-icon-button color=\"primary\" (click)=\"saveItem(item); item.editing=false\"><mat-icon>done</mat-icon></button>\n\t\t\t\t<button mat-icon-button color=\"warn\" (click)=\"reloadItem(item); item.editing=false\"><mat-icon>clear</mat-icon></button>\n\t\t\t</form>\n\t\t</div>\n\t\t<ng-template #viewOnly>\n\t\t\t<div fxLayout fxLayoutAlign=\"start center\" fxLayoutGap=\"0.5em\">\n\t\t\t\t<mat-icon>{{item.icon}}</mat-icon>\n\t\t\t\t<span>{{item.displayText}}</span>\n\t\t\t\t<button mat-icon-button (click)=\"item.editing = true\"><mat-icon>mode_edit</mat-icon></button>\n\t\t\t\t<button mat-icon-button (click)=\"addToItemList(item)\"><mat-icon>add</mat-icon></button>\n\t\t\t\t<button mat-icon-button (click)=\"deleteItem(parentItem, item)\" color=\"warn\"><mat-icon>delete</mat-icon></button>\n\t\t\t</div>\n\t\t</ng-template>\n\t<hr />\n\t<div style=\"margin-left:2em;\" *ngIf=\" item.items && item.items.length > 0\" fxLayout=\"column\" fxLayoutGap=\"1em\">\n\t\t<ng-container *ngTemplateOutlet=\"menuListTemplate;context:{itemList:item.items, parentItem: item}\"></ng-container>\n\t</div>\n</ng-template>\n\n<ng-template #menuListTemplate let-itemList=\"itemList\" let-parentItem=\"parentItem\">\n\t<div *ngFor=\"let item of itemList; trackBy: trackById\">\n\t\t<ng-container *ngTemplateOutlet=\"menuItemTemplate;context:{item: item, parentItem: parentItem}\"></ng-container>\n\t</div>\n</ng-template>\n"

/***/ }),

/***/ "../../../../../src/app/app-menu/app-menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_menu_service__ = __webpack_require__("../../../../../src/app/app-menu/app-menu.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppMenuComponent = (function () {
    function AppMenuComponent(appMenuService) {
        this.appMenuService = appMenuService;
        this._menus = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        // this.menus = this._menus.asObservable();
        this.loadMenus();
    }
    Object.defineProperty(AppMenuComponent.prototype, "menus", {
        get: function () {
            return this._menus.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    AppMenuComponent.prototype.loadMenus = function () {
        var _this = this;
        console.log('loading menus');
        this.appMenuService.getRootMenus().subscribe(function (response) {
            console.log(response);
            _this._menus.next(response._embedded.menus);
        });
    };
    AppMenuComponent.prototype.saveItem = function (item) {
        this.appMenuService.saveItem(item).subscribe(function (response) {
            console.log(response);
        });
    };
    AppMenuComponent.prototype.reloadItem = function (item) {
        this.appMenuService.findOne(item.id).subscribe(function (response) {
            Object.assign(item, response);
        });
    };
    AppMenuComponent.prototype.addItem = function () {
        var _this = this;
        this.createMenuItem().then(function (menuItem) {
            _this.appMenuService.saveItem(menuItem).subscribe(function (response) {
                console.log(response);
                _this.loadMenus();
            });
        });
    };
    AppMenuComponent.prototype.getGreatestPosition = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var maxPosition = 0;
            _this._menus.value.map(function (item) {
                maxPosition = Math.max(item.position, maxPosition);
            });
            resolve(maxPosition);
        });
        return promise;
    };
    AppMenuComponent.prototype.createMenuItem = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var menuItem = new __WEBPACK_IMPORTED_MODULE_0__app_menu_service__["a" /* AppMenu */]();
            menuItem.icon = 'bookmark';
            menuItem.displayText = 'New Menu Item';
            menuItem.url = '/';
            _this.getGreatestPosition().then(function (position) {
                menuItem.position = position + 1;
                resolve(menuItem);
            });
        });
        return promise;
    };
    AppMenuComponent.prototype.addToItemList = function (parentItem) {
        var _this = this;
        this.createMenuItem().then(function (menuItem) {
            _this.appMenuService.addToItemList(parentItem, menuItem).subscribe(function (response) {
                console.log(response);
                _this.loadMenus();
            });
        });
    };
    AppMenuComponent.prototype.deleteItem = function (parent, item) {
        var _this = this;
        if (parent != null) {
            this.appMenuService.removeChild(parent, item).subscribe(function () {
                _this.loadMenus();
            });
        }
        else {
            this.appMenuService.deleteItem(item).subscribe(function () {
                _this.loadMenus();
            });
        }
    };
    AppMenuComponent.prototype.trackById = function (index, item) {
        return item.id;
    };
    AppMenuComponent.prototype.idCompare = function (o1, o2) {
        return o1.id === o2.id;
    };
    AppMenuComponent.prototype.floatButtonEvents = function (event) {
        console.log(event);
    };
    AppMenuComponent.prototype.ngOnInit = function () {
    };
    return AppMenuComponent;
}());
AppMenuComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["o" /* Component */])({
        selector: 'app-app-menu',
        template: __webpack_require__("../../../../../src/app/app-menu/app-menu.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app-menu/app-menu.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__app_menu_service__["b" /* AppMenuService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__app_menu_service__["b" /* AppMenuService */]) === "function" && _a || Object])
], AppMenuComponent);

var _a;
//# sourceMappingURL=app-menu.component.js.map

/***/ }),

/***/ "../../../../../src/app/app-menu/app-menu.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppMenuModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__material_material_module__ = __webpack_require__("../../../../../src/app/material/material.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_menu_component__ = __webpack_require__("../../../../../src/app/app-menu/app-menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_menu_service__ = __webpack_require__("../../../../../src/app/app-menu/app-menu.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var AppMenuModule = (function () {
    function AppMenuModule() {
    }
    return AppMenuModule;
}());
AppMenuModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["i" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__material_material_module__["a" /* MaterialModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_4__app_menu_component__["a" /* AppMenuComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_5__app_menu_service__["b" /* AppMenuService */]],
        exports: [__WEBPACK_IMPORTED_MODULE_4__app_menu_component__["a" /* AppMenuComponent */]]
    })
], AppMenuModule);

//# sourceMappingURL=app-menu.module.js.map

/***/ }),

/***/ "../../../../../src/app/app-menu/app-menu.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AppMenuService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spring_data_rest_repository_service__ = __webpack_require__("../../../../../src/app/spring-data/rest-repository.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppMenu = (function (_super) {
    __extends(AppMenu, _super);
    function AppMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AppMenu;
}(__WEBPACK_IMPORTED_MODULE_0__spring_data_rest_repository_service__["a" /* HalResponse */]));

var AppMenuService = (function (_super) {
    __extends(AppMenuService, _super);
    function AppMenuService(http) {
        return _super.call(this, http, '/api/menus') || this;
    }
    AppMenuService.prototype.getRootMenus = function () {
        return this.http.get('/api/menus/search/findRootMenus?projection=inlineMenuItems');
    };
    AppMenuService.prototype.addToItemList = function (parentItem, item) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'text/uri-list' });
        var observable = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            item.parent = parentItem._links.self.href;
            _this.saveItem(item).subscribe(function (response) {
                observer.next(response);
            });
        });
        return observable;
    };
    AppMenuService.prototype.getChildren = function (item) {
        return this.http.get(item._links.items.href);
    };
    AppMenuService.prototype.removeChild = function (parentItem, item) {
        return this.http.delete('/api/menus/' + parentItem.id + '/items/' + item.id);
    };
    AppMenuService.prototype.getChildrenByItemId = function (itemId) {
        return this.http.get('/api/menus/' + itemId + 'items');
    };
    return AppMenuService;
}(__WEBPACK_IMPORTED_MODULE_0__spring_data_rest_repository_service__["b" /* RestRepositoryService */]));
AppMenuService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
], AppMenuService);

var _a;
//# sourceMappingURL=app-menu.service.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-sidenav-container>\n\t<mat-sidenav #mainMenu position=\"end\">\n\t\t<app-menu [menu]=\"mainMenu\"></app-menu>\n\t</mat-sidenav>\n\n\t<main fxLayout=\"column\">\n\t\t<mat-toolbar color=\"primary\">\n\t\t    <span>Sprout Administration</span>\n\t\t    <span fxFlex></span>\n\t\t\t<button mat-fab (click)=\"mainMenu.toggle()\">\n\t\t      <mat-icon>menu</mat-icon>\n\t\t    </button>\n\t\t\t\n\t\t</mat-toolbar>\n\t\t<router-outlet></router-outlet>\n\t</main>\n</mat-sidenav-container>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Sprout Admin';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_menu_app_menu_module__ = __webpack_require__("../../../../../src/app/app-menu/app-menu.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_routing__ = __webpack_require__("../../../../../src/app/app.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__content_item_content_item_module__ = __webpack_require__("../../../../../src/app/content-item/content-item.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__content_template_content_template_module__ = __webpack_require__("../../../../../src/app/content-template/content-template.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__content_types_content_types_module__ = __webpack_require__("../../../../../src/app/content-types/content-types.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__material_material_module__ = __webpack_require__("../../../../../src/app/material/material.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__menu_menu_module__ = __webpack_require__("../../../../../src/app/menu/menu.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__standard_service_locator__ = __webpack_require__("../../../../../src/app/standard/service-locator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__web_page_web_page_module__ = __webpack_require__("../../../../../src/app/web-page/web-page.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var AppModule = (function () {
    function AppModule(injector) {
        __WEBPACK_IMPORTED_MODULE_13__standard_service_locator__["a" /* ServiceLocator */].injector = injector;
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["M" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_10__home_home_component__["a" /* HomeComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__app_routing__["a" /* routing */],
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_11__material_material_module__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_12__menu_menu_module__["a" /* MenuModule */],
            __WEBPACK_IMPORTED_MODULE_0__app_menu_app_menu_module__["a" /* AppMenuModule */],
            __WEBPACK_IMPORTED_MODULE_8__content_template_content_template_module__["a" /* ContentTemplateModule */],
            __WEBPACK_IMPORTED_MODULE_9__content_types_content_types_module__["a" /* ContentTypesModule */],
            __WEBPACK_IMPORTED_MODULE_7__content_item_content_item_module__["a" /* ContentItemModule */],
            __WEBPACK_IMPORTED_MODULE_14__web_page_web_page_module__["a" /* WebPageModule */]
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_11__material_material_module__["a" /* MaterialModule */], __WEBPACK_IMPORTED_MODULE_12__menu_menu_module__["a" /* MenuModule */]],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_core__["E" /* Injector */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_core__["E" /* Injector */]) === "function" && _a || Object])
], AppModule);

var _a;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_menu_app_menu_component__ = __webpack_require__("../../../../../src/app/app-menu/app-menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__content_item_content_item_editor_content_item_editor_component__ = __webpack_require__("../../../../../src/app/content-item/content-item-editor/content-item-editor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__content_item_content_item_component__ = __webpack_require__("../../../../../src/app/content-item/content-item.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__content_template_content_template_editor_content_template_editor_component__ = __webpack_require__("../../../../../src/app/content-template/content-template-editor/content-template-editor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__content_template_content_template_component__ = __webpack_require__("../../../../../src/app/content-template/content-template.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__content_types_content_types_editor_content_types_editor_component__ = __webpack_require__("../../../../../src/app/content-types/content-types-editor/content-types-editor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__content_types_content_types_component__ = __webpack_require__("../../../../../src/app/content-types/content-types.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__web_page_layout_layout_editor_layout_editor_component__ = __webpack_require__("../../../../../src/app/web-page/layout/layout-editor/layout-editor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__web_page_layout_layout_list_layout_list_component__ = __webpack_require__("../../../../../src/app/web-page/layout/layout-list/layout-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__web_page_page_page_editor_page_editor_component__ = __webpack_require__("../../../../../src/app/web-page/page/page-editor/page-editor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__web_page_page_page_list_page_list_component__ = __webpack_require__("../../../../../src/app/web-page/page/page-list/page-list.component.ts");













var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_8__home_home_component__["a" /* HomeComponent */] },
    { path: 'app-menu', component: __WEBPACK_IMPORTED_MODULE_0__app_menu_app_menu_component__["a" /* AppMenuComponent */] },
    { path: 'content-types', component: __WEBPACK_IMPORTED_MODULE_6__content_types_content_types_component__["a" /* ContentTypesComponent */] },
    { path: 'content-types-editor', component: __WEBPACK_IMPORTED_MODULE_5__content_types_content_types_editor_content_types_editor_component__["a" /* ContentTypesEditorComponent */] },
    { path: 'content-item', component: __WEBPACK_IMPORTED_MODULE_2__content_item_content_item_component__["a" /* ContentItemComponent */] },
    { path: 'content-item-editor', component: __WEBPACK_IMPORTED_MODULE_1__content_item_content_item_editor_content_item_editor_component__["a" /* ContentItemEditorComponent */] },
    { path: 'content-template', component: __WEBPACK_IMPORTED_MODULE_4__content_template_content_template_component__["a" /* ContentTemplateComponent */] },
    { path: 'content-template-editor', component: __WEBPACK_IMPORTED_MODULE_3__content_template_content_template_editor_content_template_editor_component__["a" /* ContentTemplateEditorComponent */] },
    { path: 'pages', component: __WEBPACK_IMPORTED_MODULE_12__web_page_page_page_list_page_list_component__["a" /* PageListComponent */] },
    { path: 'page-editor', component: __WEBPACK_IMPORTED_MODULE_11__web_page_page_page_editor_page_editor_component__["a" /* PageEditorComponent */] },
    { path: 'layouts', component: __WEBPACK_IMPORTED_MODULE_10__web_page_layout_layout_list_layout_list_component__["a" /* LayoutListComponent */] },
    { path: 'layout-editor', component: __WEBPACK_IMPORTED_MODULE_9__web_page_layout_layout_editor_layout_editor_component__["a" /* LayoutEditorComponent */] }
];
var routing = __WEBPACK_IMPORTED_MODULE_7__angular_router__["c" /* RouterModule */].forRoot(routes);
//# sourceMappingURL=app.routing.js.map

/***/ }),

/***/ "../../../../../src/app/content-field/content-field.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/content-field/content-field.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  content-field works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/content-field/content-field.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentFieldComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__content_field_content_field_service__ = __webpack_require__("../../../../../src/app/content-field/content-field.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContentFieldComponent = (function () {
    function ContentFieldComponent() {
    }
    ContentFieldComponent.prototype.ngOnInit = function () {
    };
    return ContentFieldComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["F" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__content_field_content_field_service__["a" /* ContentField */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__content_field_content_field_service__["a" /* ContentField */]) === "function" && _a || Object)
], ContentFieldComponent.prototype, "item", void 0);
ContentFieldComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["o" /* Component */])({
        selector: 'app-content-field',
        template: __webpack_require__("../../../../../src/app/content-field/content-field.component.html"),
        styles: [__webpack_require__("../../../../../src/app/content-field/content-field.component.css")]
    }),
    __metadata("design:paramtypes", [])
], ContentFieldComponent);

var _a;
//# sourceMappingURL=content-field.component.js.map

/***/ }),

/***/ "../../../../../src/app/content-field/content-field.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentFieldModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__content_field_component__ = __webpack_require__("../../../../../src/app/content-field/content-field.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__content_field_service__ = __webpack_require__("../../../../../src/app/content-field/content-field.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ContentFieldModule = (function () {
    function ContentFieldModule() {
    }
    return ContentFieldModule;
}());
ContentFieldModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */]
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_2__content_field_component__["a" /* ContentFieldComponent */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__content_field_component__["a" /* ContentFieldComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_3__content_field_service__["b" /* ContentFieldService */]]
    })
], ContentFieldModule);

//# sourceMappingURL=content-field.module.js.map

/***/ }),

/***/ "../../../../../src/app/content-field/content-field.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ContentFieldService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spring_data_rest_repository_service__ = __webpack_require__("../../../../../src/app/spring-data/rest-repository.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ContentField = (function (_super) {
    __extends(ContentField, _super);
    function ContentField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContentField;
}(__WEBPACK_IMPORTED_MODULE_0__spring_data_rest_repository_service__["a" /* HalResponse */]));

var ContentFieldService = (function (_super) {
    __extends(ContentFieldService, _super);
    function ContentFieldService(http) {
        return _super.call(this, http, '/api/contentFields') || this;
    }
    return ContentFieldService;
}(__WEBPACK_IMPORTED_MODULE_0__spring_data_rest_repository_service__["b" /* RestRepositoryService */]));
ContentFieldService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
], ContentFieldService);

var _a;
//# sourceMappingURL=content-field.service.js.map

/***/ }),

/***/ "../../../../../src/app/content-item/content-item-editor/content-item-editor.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/content-item/content-item-editor/content-item-editor.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"rForm\" class=\"content\" fxLayout fxLayoutAlign=\"center center\" fxLayoutGap=\"10px\" fxFlexFill>\n\t<mat-card [fxFlex.lt-md]=\"100\" [fxFlex.md]=\"80\" [fxFlex.lg]=\"60\" [fxFlex.xl]=\"50\">\n\t\t<mat-card-header fxLayoutAlign=\"center center\" fxLayout fxFlexFill>\n\t\t\t<mat-card-title>Content Item Editor</mat-card-title>\n\t\t\t<span fxFlex></span>\n\t\t\t<button mat-button (click)=\"router.navigate(['content-item'])\"><mat-icon>close</mat-icon></button>\n\t\t</mat-card-header>\n\t\t<mat-card-content>\n\t\t\t<form [formGroup]=\"rForm\" fxLayout=\"column\">\n\t\t\t\t\n\t\t\t\t<mat-form-field hintLabel=\"Max 255 characters\">\n\t\t\t\t\t<input matInput formControlName=\"name\" maxlength=\"255\" placeholder=\"Enter a name\">\n\t\t\t\t\t<mat-hint align=\"end\">{{rForm.controls['name'].value?.length || 0}}/255</mat-hint>\n\t\t\t\t</mat-form-field>\n\t\t\t\n\t\t\t\t<mat-form-field hintLabel=\"Max 255 characters\">\n\t\t\t\t\t<input matInput formControlName=\"description\" maxlength=\"255\" placeholder=\"Enter a description\">\n\t\t\t\t\t<mat-hint align=\"end\">{{rForm.controls['description'].value?.length || 0}}/255</mat-hint>\n\t\t\t\t</mat-form-field>\n\t\t\t\t\n\t\t\t\t<mat-form-field hintLabel=\"The content type determines the fields; cannot change once set\">\n\t\t\t\t\t<mat-select matInput formControlName=\"contentType\" [disabled]=\"!rForm.value.new\" [compareWith]=\"idCompare\">\n\t\t\t\t\t\t<mat-option *ngFor=\"let ct of this.contentTypes; trackBy: trackById\" [value]=\"ct\">{{ct.name}}</mat-option>\n\t\t\t\t\t</mat-select>\n\t\t\t\t</mat-form-field>\n\t\t\t\t\n\t\t\t\t\n\t\t\t\t<div *ngIf=\"!rForm.value.new\">\n\t\t\t\t\t<mat-form-field hintLabel=\"The template that will render this content\">\n\t\t\t\t\t\t<mat-select matInput formControlName=\"template\" [compareWith]=\"idCompare\" >\n\t\t\t\t\t\t\t<mat-option *ngFor=\"let ct of this.templates | async, trackBy: trackById\" [value]=\"ct\">{{ct.name}}</mat-option>\n\t\t\t\t\t\t</mat-select>\n\t\t\t\t\t</mat-form-field>\n\t\t\t\t\n\t\t\t\t\t<div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"1em\">\n\t\t\t\t\t\t<h3>Fields</h3>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div formArrayName=\"fieldValues\" class=\"well\">\n\t\t\t\t\t\t<mat-card *ngFor=\"let field of fieldValues.controls; let i=index\" [formGroupName]=\"i\" >\n\t\t\t\t\t\t\t<!-- The repeated field template -->\n\t\t\t\t\t\t\t<mat-card-content>\n\t\t\t\t\t\t\t\t<mat-card-header>\n\t\t\t\t\t\t\t\t\t<mat-card-title>{{field.value.displayName}}</mat-card-title>\n\t\t\t\t\t\t\t\t\t<mat-card-content>\n\t\t\t\t\t\t\t\t\t\t<mat-form-field hintLabel=\"Max 255 characters\">\n\t\t\t\t\t\t\t\t\t\t\t<input matInput formControlName=\"value\" maxlength=\"255\">\n\t\t\t\t\t\t\t\t\t\t\t<mat-hint align=\"end\">{{field.value?.length || 0}}/255</mat-hint>\n\t\t\t\t\t\t\t\t\t\t</mat-form-field>\n\t\t\t\t\t\t\t\t\t</mat-card-content>\n\t\t\t\t\t\t\t\t</mat-card-header>\n\t\t\t\t\t\t\t</mat-card-content>\n\t\t\t\t\t\t    <!-- End of the repeated field template -->\n\t\t\t\t\t\t</mat-card>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<br/>\n\t\t\t\n\t\t\t</form>\n\t\t</mat-card-content>\n\t\t<mat-card-actions fxLayout fxLayoutAlign=\"space-around\">\n\t\t\t<button mat-fab color=\"warn\" [disabled]=\"rForm.value.new\" (click)=\"this.delete(rForm.value)\"><mat-icon>delete</mat-icon></button>\n\t\t\t\n\t\t\t<button mat-fab type=\"submit\" color=\"primary\" [disabled]=\"!rForm.valid\" (click)=\"save(rForm.value)\"><mat-icon>save</mat-icon></button>\n\t\t</mat-card-actions>\n\t</mat-card>\n</div>"

/***/ }),

/***/ "../../../../../src/app/content-item/content-item-editor/content-item-editor.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentItemEditorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__content_template_content_template_service__ = __webpack_require__("../../../../../src/app/content-template/content-template.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__content_types_content_types_service__ = __webpack_require__("../../../../../src/app/content-types/content-types.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__content_item_service__ = __webpack_require__("../../../../../src/app/content-item/content-item.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_finally__ = __webpack_require__("../../../../rxjs/add/operator/finally.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_finally__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ContentItemEditorComponent = (function () {
    function ContentItemEditorComponent(router, fb, route, snackBar, contentTemplateService, service, contentTypeService) {
        this.router = router;
        this.fb = fb;
        this.route = route;
        this.snackBar = snackBar;
        this.contentTemplateService = contentTemplateService;
        this.service = service;
        this.contentTypeService = contentTypeService;
        this._templates = new __WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.templates = this._templates.asObservable();
        this.emptyFormDefinition = {
            'id': [''],
            'name': ['My Cool Content Item', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["j" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["j" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["j" /* Validators */].minLength(1), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["j" /* Validators */].maxLength(255)])],
            'description': ['A new piece of content'],
            'fieldValues': this.fb.array([]),
            'new': [true],
            'createdDate': [null],
            'createdBy': [null],
            'modifiedDate': [null],
            'modifiedBy': [null],
            'contentType': {
                'id': [null],
                'name': [null],
                '_links': {
                    'self': {
                        'href': [null]
                    }
                }
            },
            'template': {
                'id': null,
                'name': null,
                '_links': {
                    'self': {
                        'href': null
                    }
                }
            },
            '_embedded': [null],
            '_links': [null]
        };
        this.getContentTemplates();
        this.getContentTypes();
    }
    ContentItemEditorComponent.prototype.getContentTemplates = function () {
        var _this = this;
        this.contentTemplateService.findAll().subscribe(function (data) {
            console.log(data);
            _this._templates.next(data._embedded.contentTemplates);
        }, function (err) {
            _this.snackBar.open('The Content Templates could not be retrieved', 'Close', { duration: 8000 });
            console.error('Failed to get contentTemplates');
        });
    };
    ContentItemEditorComponent.prototype.getContentTypes = function () {
        var _this = this;
        this.contentTypeService.findAll().subscribe(function (data) {
            _this.contentTypes = data._embedded.contentTypes;
        }, function (err) {
            _this.snackBar.open('The Content Types could not be retrieved', 'Close', { duration: 8000 });
        });
    };
    ContentItemEditorComponent.prototype.prepareSave = function (model) {
        var halModel = Object.assign({}, model);
        halModel.fieldValues = {};
        this.fieldValues.controls.map(function (control) {
            halModel.fieldValues[control.value.id] = control.value.value;
        });
        halModel.contentType = this.currentContentType.value._links.self.href;
        delete halModel.template;
        console.log('halModel:', halModel);
        return halModel;
    };
    ContentItemEditorComponent.prototype.save = function (model) {
        var _this = this;
        var halModel = this.prepareSave(model);
        this.service.saveItem(halModel).subscribe(function (data) {
            if (_this.currentTemplate.value.id != null) {
                _this.service.setContentTemplate(data, _this.currentTemplate.value).subscribe(function (contentItem) {
                    // need to do anything here?
                }, function (err) {
                    console.error(err);
                });
            }
            else {
                _this.router.navigate(['content-item-editor', { id: data.id }]);
            }
        }, function (err) {
            if (err.statusText === 'Conflict') {
                _this.snackBar.open('The item name must be unique', 'Close', { duration: 8000 });
            }
            else {
                _this.snackBar.open(err, 'Close', { duration: 8000 });
            }
        });
    };
    ContentItemEditorComponent.prototype.delete = function (model) {
        var _this = this;
        this.service.deleteItem(model).subscribe(function (data) {
            _this.router.navigate(['content-item']);
        }, function (err) {
            _this.snackBar.open('Problem encountered while deleting', 'Close', { duration: 8000 });
            console.error(err);
        });
    };
    ContentItemEditorComponent.prototype.loadItem = function (id) {
        var _this = this;
        if (id) {
            this.service.findOne(id).subscribe(function (contentItem) {
                _this.service.getContentType(contentItem).subscribe(function (contentType) {
                    contentItem.contentType = contentType;
                    _this.getContentTypeFields(contentType, function (contentFields) {
                        var obs = _this.service.getContentTemplate(contentItem);
                        obs.finally(function () { _this.createFormFromExisting(contentItem, contentFields); })
                            .subscribe(function (contentTemplate) {
                            contentItem.template = contentTemplate;
                        }, function (err) { _this.snackBar.open('Please set Content Template', 'Close', { duration: 8000 }); console.error(err); });
                    });
                }, function (err) {
                    _this.snackBar.open('Could not retrieve Content Type', 'Close', { duration: 8000 });
                    console.error(err);
                });
            }, function (err) {
                _this.snackBar.open('Could not retrieve Content Item', 'Close', { duration: 8000 });
                console.error(err);
            });
        }
        else {
            this.createEmptyForm();
        }
    };
    Object.defineProperty(ContentItemEditorComponent.prototype, "fieldValues", {
        get: function () {
            return this.rForm.get('fieldValues');
        },
        enumerable: true,
        configurable: true
    });
    ContentItemEditorComponent.prototype.setFieldValue = function (key, value) {
        this.fieldValues.get(key).setValue(value);
    };
    Object.defineProperty(ContentItemEditorComponent.prototype, "currentTemplate", {
        get: function () {
            return this.rForm.get('template');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentItemEditorComponent.prototype, "currentContentType", {
        get: function () {
            return this.rForm.get('contentType');
        },
        enumerable: true,
        configurable: true
    });
    ContentItemEditorComponent.prototype.getContentTypeFields = function (contentType, callback) {
        var _this = this;
        this.contentTypeService.findContentFields(contentType).subscribe(function (data) {
            var fields = data._embedded.contentFields;
            callback(fields);
        }, function (err) {
            _this.snackBar.open('Could not retrieve Content Type Fields', 'Close', { duration: 8000 });
            console.error(err);
        });
    };
    ContentItemEditorComponent.prototype.createEmptyForm = function () {
        this.rForm = this.fb.group(this.emptyFormDefinition);
    };
    ContentItemEditorComponent.prototype.createFormFromExisting = function (contentItem, contentFields) {
        var _this = this;
        var formDefinition = Object.assign({}, this.emptyFormDefinition);
        contentFields.map(function (field) {
            field['value'] = [contentItem.fieldValues[field.id]];
            var fg = _this.fb.group(field);
            formDefinition.fieldValues.push(fg);
        });
        this.rForm = this.fb.group(formDefinition);
        this.patchValues(contentItem);
    };
    ContentItemEditorComponent.prototype.patchValues = function (contentItem) {
        var valueMap = Object.assign({}, contentItem.fieldValues);
        delete contentItem.fieldValues;
        this.rForm.patchValue(contentItem);
        this.currentContentType.patchValue(contentItem.contentType);
    };
    ContentItemEditorComponent.prototype.trackById = function (index, item) {
        return item.id;
    };
    ContentItemEditorComponent.prototype.idCompare = function (o1, o2) {
        return o1.id === o2.id;
    };
    ContentItemEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) { return _this.loadItem(params['id']); });
    };
    return ContentItemEditorComponent;
}());
ContentItemEditorComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["o" /* Component */])({
        selector: 'app-content-item-editor',
        template: __webpack_require__("../../../../../src/app/content-item/content-item-editor/content-item-editor.component.html"),
        styles: [__webpack_require__("../../../../../src/app/content-item/content-item-editor/content-item-editor.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_6__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__angular_material__["n" /* MatSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_material__["n" /* MatSnackBar */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__content_template_content_template_service__["a" /* ContentTemplateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__content_template_content_template_service__["a" /* ContentTemplateService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__content_item_service__["a" /* ContentItemService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__content_item_service__["a" /* ContentItemService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__content_types_content_types_service__["a" /* ContentTypesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__content_types_content_types_service__["a" /* ContentTypesService */]) === "function" && _g || Object])
], ContentItemEditorComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=content-item-editor.component.js.map

/***/ }),

/***/ "../../../../../src/app/content-item/content-item.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/content-item/content-item.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutGap=\"1em\">\n\t<mat-toolbar>\n\t\t<button mat-button (click)=\"addItem()\">\n\t\t\t<mat-icon>add</mat-icon>\n\t\t\t<span>New Content Item</span>\n\t\t</button>\n\t</mat-toolbar>\n\t\n\t<div fxLayout fxLayout.lt-sm=\"column\" fxLayoutWrap=\"true\" fxLayoutGap=\"1em\">\n\t\t<mat-card  *ngFor=\"let item of items\">\n\t\t\t<mat-card-header>\n\t\t\t\t<mat-card-title>{{item.name}}</mat-card-title>\n\t\t\t\t<mat-card-subtitle>{{item.description}}</mat-card-subtitle>\n\t\t\t</mat-card-header>\n\t\t\t<mat-card-actions>\n\t\t\t\t<button mat-button (click)=\"editItem(item)\">\n\t\t\t\t\t<mat-icon matListIcon>edit</mat-icon>\n\t\t\t\t</button>\n\t\t\t\t<button mat-button (click)=\"deleteItem(item)\">\n\t\t\t\t\t<mat-icon matListIcon>delete</mat-icon>\n\t\t\t\t</button>\n\t\t\t</mat-card-actions>\n\t\t</mat-card>\n\t</div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/content-item/content-item.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentItemComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__content_item_service__ = __webpack_require__("../../../../../src/app/content-item/content-item.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ContentItemComponent = (function () {
    function ContentItemComponent(router, service) {
        this.router = router;
        this.service = service;
        this.getContentItems();
    }
    ContentItemComponent.prototype.addItem = function () {
        this.router.navigate(['content-item-editor']);
    };
    ContentItemComponent.prototype.editItem = function (item) {
        this.router.navigate(['content-item-editor', { id: item.id }]);
    };
    ContentItemComponent.prototype.deleteItem = function (item) {
        var _this = this;
        this.service.deleteItem(item).subscribe(function (data) {
            _this.getContentItems();
        }, function (err) {
            console.error('Failed to delete content item');
        });
    };
    ContentItemComponent.prototype.getContentItems = function () {
        var _this = this;
        this.service.findAll().subscribe(function (data) {
            _this.items = data._embedded.contentItems;
        }, function (err) {
            console.error('Failed to get contentItems');
        });
    };
    ContentItemComponent.prototype.ngOnInit = function () {
    };
    return ContentItemComponent;
}());
ContentItemComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["o" /* Component */])({
        selector: 'app-content-items',
        template: __webpack_require__("../../../../../src/app/content-item/content-item.component.html"),
        styles: [__webpack_require__("../../../../../src/app/content-item/content-item.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__content_item_service__["a" /* ContentItemService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__content_item_service__["a" /* ContentItemService */]) === "function" && _b || Object])
], ContentItemComponent);

var _a, _b;
//# sourceMappingURL=content-item.component.js.map

/***/ }),

/***/ "../../../../../src/app/content-item/content-item.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentItemModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__material_material_module__ = __webpack_require__("../../../../../src/app/material/material.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__content_item_component__ = __webpack_require__("../../../../../src/app/content-item/content-item.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__content_item_service__ = __webpack_require__("../../../../../src/app/content-item/content-item.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__content_item_editor_content_item_editor_component__ = __webpack_require__("../../../../../src/app/content-item/content-item-editor/content-item-editor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var ContentItemModule = (function () {
    function ContentItemModule() {
    }
    return ContentItemModule;
}());
ContentItemModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_0__material_material_module__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["i" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["b" /* HttpClientModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_4__content_item_component__["a" /* ContentItemComponent */], __WEBPACK_IMPORTED_MODULE_6__content_item_editor_content_item_editor_component__["a" /* ContentItemEditorComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_5__content_item_service__["a" /* ContentItemService */]]
    })
], ContentItemModule);

//# sourceMappingURL=content-item.module.js.map

/***/ }),

/***/ "../../../../../src/app/content-item/content-item.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ContentItem */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentItemService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spring_data_rest_repository_service__ = __webpack_require__("../../../../../src/app/spring-data/rest-repository.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ContentItem = (function (_super) {
    __extends(ContentItem, _super);
    function ContentItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContentItem;
}(__WEBPACK_IMPORTED_MODULE_0__spring_data_rest_repository_service__["a" /* HalResponse */]));

var ContentItemService = (function (_super) {
    __extends(ContentItemService, _super);
    function ContentItemService(http) {
        return _super.call(this, http, '/api/contentItems') || this;
    }
    ContentItemService.prototype.getContentType = function (contentItem) {
        return this.http.get(contentItem._links.contentType.href);
    };
    ContentItemService.prototype.getContentTemplate = function (contentItem) {
        return this.http.get(contentItem._links.template.href);
    };
    ContentItemService.prototype.setContentTemplate = function (contentItem, template) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'text/uri-list' });
        return this.http.put(contentItem._links.template.href, template._links.self.href, { headers: headers });
    };
    return ContentItemService;
}(__WEBPACK_IMPORTED_MODULE_0__spring_data_rest_repository_service__["b" /* RestRepositoryService */]));
ContentItemService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
], ContentItemService);

var _a;
//# sourceMappingURL=content-item.service.js.map

/***/ }),

/***/ "../../../../../src/app/content-template/content-template-editor/content-template-editor.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/content-template/content-template-editor/content-template-editor.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content\" fxLayout fxLayoutAlign=\"center center\" fxLayoutGap=\"10px\" fxFlexFill>\n\t<mat-card [fxFlex.lt-md]=\"100\" [fxFlex.md]=\"80\" [fxFlex.lg]=\"60\" [fxFlex.xl]=\"50\">\n\t\t<mat-card-header fxLayoutAlign=\"center center\" fxLayout fxFlexFill>\n\t\t\t<mat-card-title>Content Template Editor</mat-card-title>\n\t\t\t<span fxFlex></span>\n\t\t\t<button mat-button (click)=\"router.navigate(['content-template'])\"><mat-icon>close</mat-icon></button>\n\t\t</mat-card-header>\n\t\t<mat-card-content>\n\t\t\t<form [formGroup]=\"rForm\" fxLayout=\"column\">\n\t\t\t\t\n\t\t\t\t<mat-form-field hintLabel=\"Max 255 characters\">\n\t\t\t\t\t<input matInput formControlName=\"name\" maxlength=\"255\" placeholder=\"Enter a name\">\n\t\t\t\t\t<mat-hint align=\"end\">{{rForm.controls['name'].value?.length || 0}}/255</mat-hint>\n\t\t\t\t</mat-form-field>\n\t\t\t\n\t\t\t\t<mat-form-field hintLabel=\"Max 255 characters\">\n\t\t\t\t\t<input matInput formControlName=\"description\" maxlength=\"255\" placeholder=\"Enter a description\">\n\t\t\t\t\t<mat-hint align=\"end\">{{rForm.controls['description'].value?.length || 0}}/255</mat-hint>\n\t\t\t\t</mat-form-field>\n\t\t\t\t\n\t\t\t\t<mat-form-field hintLabel=\"Max 3000 characters\">\n\t\t\t\t\t<textarea rows=\"10\" matInput formControlName=\"content\" maxlength=\"3000\" placeholder=\"Enter a FreeMarker template\"></textarea>\n\t\t\t\t\t<mat-hint align=\"end\">{{rForm.controls['content'].value?.length || 0}}/3000</mat-hint>\n\t\t\t\t</mat-form-field>\n\t\t\t\n\t\t\t</form>\n\t\t</mat-card-content>\n\t\t<mat-card-actions fxLayout fxLayoutAlign=\"space-around\">\n\t\t\t<button mat-fab color=\"warn\" [disabled]=\"rForm.value.new\" (click)=\"this.delete(rForm.value)\"><mat-icon>delete</mat-icon></button>\n\t\t\t\n\t\t\t<button mat-fab type=\"submit\" color=\"primary\" [disabled]=\"!rForm.valid\" (click)=\"save(rForm.value)\"><mat-icon>save</mat-icon></button>\n\t\t</mat-card-actions>\n\t</mat-card>\n</div>"

/***/ }),

/***/ "../../../../../src/app/content-template/content-template-editor/content-template-editor.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentTemplateEditorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__content_template_service__ = __webpack_require__("../../../../../src/app/content-template/content-template.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ContentTemplateEditorComponent = (function () {
    function ContentTemplateEditorComponent(router, fb, route, service, snackBar) {
        this.router = router;
        this.fb = fb;
        this.route = route;
        this.service = service;
        this.snackBar = snackBar;
        this.rForm = fb.group({
            'id': [''],
            'name': ['MyTemplate', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].minLength(1), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].maxLength(255)])],
            'content': ['<h1>${text}</h1>', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].minLength(1), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].maxLength(255)])],
            'description': ['A new template =]'],
            'new': [true],
            'createdDate': [null],
            'createdBy': [null],
            'modifiedDate': [null],
            'modifiedBy': [null]
        });
    }
    ContentTemplateEditorComponent.prototype.save = function (model) {
        var _this = this;
        this.service.saveItem(model).subscribe(function (data) {
            _this.router.navigate(['content-template-editor', { id: data.id }]);
        }, function (err) {
            if (err.statusText === 'Conflict') {
                _this.snackBar.open('The template name must be unique', 'Close', { duration: 8000 });
            }
        });
    };
    ContentTemplateEditorComponent.prototype.delete = function (model) {
        var _this = this;
        this.service.deleteItem(model).subscribe(function (data) {
            _this.router.navigate(['content-template']);
        }, function (err) {
            console.error(err);
        });
    };
    ContentTemplateEditorComponent.prototype.loadItem = function (id) {
        var _this = this;
        if (id) {
            this.service.findOne(id).subscribe(function (response) {
                _this.rForm.patchValue(response);
            });
        }
    };
    ContentTemplateEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) { return _this.loadItem(params['id']); });
    };
    return ContentTemplateEditorComponent;
}());
ContentTemplateEditorComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["o" /* Component */])({
        selector: 'app-content-template-editor',
        template: __webpack_require__("../../../../../src/app/content-template/content-template-editor/content-template-editor.component.html"),
        styles: [__webpack_require__("../../../../../src/app/content-template/content-template-editor/content-template-editor.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__content_template_service__["a" /* ContentTemplateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__content_template_service__["a" /* ContentTemplateService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__angular_material__["n" /* MatSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_material__["n" /* MatSnackBar */]) === "function" && _e || Object])
], ContentTemplateEditorComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=content-template-editor.component.js.map

/***/ }),

/***/ "../../../../../src/app/content-template/content-template.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/content-template/content-template.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutGap=\"1em\">\n\t<mat-toolbar>\n\t\t<button mat-button (click)=\"addItem()\">\n\t\t\t<mat-icon>add</mat-icon>\n\t\t\t<span>New Content Template</span>\n\t\t</button>\n\t</mat-toolbar>\n\t\n\t<div fxLayout fxLayout.lt-sm=\"column\" fxLayoutWrap=\"true\" fxLayoutGap=\"10px\">\n\t\t<mat-card  *ngFor=\"let item of items\">\n\t\t\t<mat-card-header>\n\t\t\t\t<mat-card-title>{{item.name}}</mat-card-title>\n\t\t\t\t<mat-card-subtitle>{{item.description}}</mat-card-subtitle>\n\t\t\t</mat-card-header>\n\t\t\t<mat-card-actions>\n\t\t\t\t<button mat-button (click)=\"editItem(item)\">\n\t\t\t\t\t<mat-icon matListIcon>edit</mat-icon>\n\t\t\t\t</button>\n\t\t\t\t<button mat-button (click)=\"deleteItem(item)\">\n\t\t\t\t\t<mat-icon matListIcon>delete</mat-icon>\n\t\t\t\t</button>\n\t\t\t</mat-card-actions>\n\t\t</mat-card>\n\t</div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/content-template/content-template.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentTemplateComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__content_template_service__ = __webpack_require__("../../../../../src/app/content-template/content-template.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ContentTemplateComponent = (function () {
    function ContentTemplateComponent(router, contentTemplateService) {
        this.router = router;
        this.contentTemplateService = contentTemplateService;
    }
    ContentTemplateComponent.prototype.addItem = function () {
        this.router.navigate(['content-template-editor']);
    };
    ContentTemplateComponent.prototype.editItem = function (item) {
        this.router.navigate(['content-template-editor', { id: item.id }]);
    };
    ContentTemplateComponent.prototype.deleteItem = function (item) {
        var _this = this;
        this.contentTemplateService.deleteItem(item).subscribe(function (data) {
            _this.getContentTemplates();
        }, function (err) {
            console.error('Failed to delete contentTemplate');
        });
    };
    ContentTemplateComponent.prototype.getContentTemplates = function () {
        var _this = this;
        this.contentTemplateService.findAll().subscribe(function (data) {
            _this.items = data._embedded.contentTemplates;
        }, function (err) {
            console.error(err);
        });
    };
    ContentTemplateComponent.prototype.ngOnInit = function () {
        console.log('Initializing');
        this.getContentTemplates();
    };
    return ContentTemplateComponent;
}());
ContentTemplateComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["o" /* Component */])({
        selector: 'app-content-template',
        template: __webpack_require__("../../../../../src/app/content-template/content-template.component.html"),
        styles: [__webpack_require__("../../../../../src/app/content-template/content-template.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__content_template_service__["a" /* ContentTemplateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__content_template_service__["a" /* ContentTemplateService */]) === "function" && _b || Object])
], ContentTemplateComponent);

var _a, _b;
//# sourceMappingURL=content-template.component.js.map

/***/ }),

/***/ "../../../../../src/app/content-template/content-template.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentTemplateModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__material_material_module__ = __webpack_require__("../../../../../src/app/material/material.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__content_template_component__ = __webpack_require__("../../../../../src/app/content-template/content-template.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__content_template_service__ = __webpack_require__("../../../../../src/app/content-template/content-template.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__content_template_editor_content_template_editor_component__ = __webpack_require__("../../../../../src/app/content-template/content-template-editor/content-template-editor.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var ContentTemplateModule = (function () {
    function ContentTemplateModule() {
    }
    return ContentTemplateModule;
}());
ContentTemplateModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_2__material_material_module__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["i" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormsModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_5__content_template_component__["a" /* ContentTemplateComponent */], __WEBPACK_IMPORTED_MODULE_7__content_template_editor_content_template_editor_component__["a" /* ContentTemplateEditorComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_6__content_template_service__["a" /* ContentTemplateService */]]
    })
], ContentTemplateModule);

//# sourceMappingURL=content-template.module.js.map

/***/ }),

/***/ "../../../../../src/app/content-template/content-template.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ContentTemplate */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentTemplateService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spring_data_rest_repository_service__ = __webpack_require__("../../../../../src/app/spring-data/rest-repository.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ContentTemplate = (function (_super) {
    __extends(ContentTemplate, _super);
    function ContentTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContentTemplate;
}(__WEBPACK_IMPORTED_MODULE_0__spring_data_rest_repository_service__["a" /* HalResponse */]));

var ContentTemplateService = (function (_super) {
    __extends(ContentTemplateService, _super);
    function ContentTemplateService(http) {
        return _super.call(this, http, '/api/contentTemplates') || this;
    }
    return ContentTemplateService;
}(__WEBPACK_IMPORTED_MODULE_0__spring_data_rest_repository_service__["b" /* RestRepositoryService */]));
ContentTemplateService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
], ContentTemplateService);

var _a;
//# sourceMappingURL=content-template.service.js.map

/***/ }),

/***/ "../../../../../src/app/content-types/content-types-editor/content-types-editor.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/content-types/content-types-editor/content-types-editor.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content\" fxLayout fxLayoutAlign=\"center center\" fxLayoutGap=\"1em\" fxFlexFill>\n\t<mat-card [fxFlex.lt-md]=\"100\" [fxFlex.md]=\"80\" [fxFlex.lg]=\"60\" [fxFlex.xl]=\"50\">\n\t\t<mat-card-header fxLayoutAlign=\"center center\" fxLayout fxFlexFill>\n\t\t\t<h3>Content Type Editor</h3>\n\t\t\t<span fxFlex></span>\n\t\t\t<button mat-button (click)=\"router.navigate(['content-types'])\"><mat-icon>close</mat-icon></button>\n\t\t</mat-card-header>\n\t\t<mat-card-content>\n\t\t\t<form [formGroup]=\"rForm\" fxLayout=\"column\">\n\t\t\t\t\n\t\t\t\t<mat-form-field hintLabel=\"Max 255 characters\">\n\t\t\t\t\t<input matInput formControlName=\"name\" maxlength=\"255\" placeholder=\"Enter a name\">\n\t\t\t\t\t<mat-hint align=\"end\">{{rForm.controls['name'].value?.length || 0}}/255</mat-hint>\n\t\t\t\t</mat-form-field>\n\t\t\t\n\t\t\t\t<mat-form-field hintLabel=\"Max 255 characters\">\n\t\t\t\t\t<input matInput formControlName=\"description\" maxlength=\"255\" placeholder=\"Enter a description\">\n\t\t\t\t\t<mat-hint align=\"end\">{{rForm.controls['description'].value?.length || 0}}/255</mat-hint>\n\t\t\t\t</mat-form-field>\n\t\t\t\t\n\t\t\t\t<div *ngIf=\"!rForm.value.new\">\n\t\t\t\t\t<div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"1em\">\n\t\t\t\t\t\t<h3>Fields</h3>\n\t\t\t\t\t\t<button matInput mat-mini-fab (click)=\"this.addField()\"><mat-icon>add</mat-icon></button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div formArrayName=\"fields\" class=\"well\">\n\t\t\t\t\t\t<mat-card *ngFor=\"let field of fields.controls, trackBy:trackById; let i=index\" [formGroupName]=\"i\" >\n\t\t\t\t\t\t\t<!-- The repeated field template -->\n\t\t\t\t\t\t\t<mat-card-content>\n\t\t\t\t\t\t\t\t<div class=\"row\" fxLayout fxFlexFill fxLayoutAlign=\"start center\" fxLayoutGap=\"0.5em\" fxLayout.lt-sm=\"column\">\n\t\t\t\t\t\t\t\t\t<button mat-button (click)=\"removeFieldControl(i)\"><mat-icon>delete</mat-icon></button>\n\t\t\t\t\t\t\t\t\t<span fxFlex></span>\n\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t    <mat-checkbox class=\"form-control\" formControlName=\"required\">Required</mat-checkbox>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"row\" fxLayout fxLayoutAlign=\"start start\" fxLayoutGap=\"0.5em\" fxLayout.lt-sm=\"column\">\n\t\t\t\t\t\t\t\t\t<mat-form-field fxFlex class=\"form-group\" hintLabel=\"Display Name\">\n\t\t\t\t\t\t\t\t\t    <input matInput class=\"form-control\" formControlName=\"displayName\">\n\t\t\t\t\t\t\t\t\t</mat-form-field>\n\t\t\t\t\t\t\t\t\t<mat-form-field class=\"form-group\" hintLabel=\"Name\">\n\t\t\t\t\t\t\t\t\t    <input matInput class=\"form-control\" formControlName=\"name\">\n\t\t\t\t\t\t\t\t\t    <mat-hint align=\"end\">case sensitive; no special characters</mat-hint>\n\t\t\t\t\t\t\t\t\t</mat-form-field>\n\t\t\t\t\t\t\t\t\t<mat-form-field hintLabel=\"Type of value\">\n\t\t\t\t\t\t\t\t\t\t<mat-select matInput formControlName=\"fieldType\" >\n\t\t\t\t\t\t\t\t\t\t\t<mat-option *ngFor=\"let value of this.fieldTypes\" [value]=\"value\">{{value}}</mat-option>\n\t\t\t\t\t\t\t\t\t\t</mat-select>\n\t\t\t\t\t\t\t\t\t</mat-form-field>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</mat-card-content>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t    <!-- End of the repeated field template -->\n\t\t\t\t\t\t</mat-card>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<br/>\n\t\t\t\n\t\t\t</form>\n\t\t</mat-card-content>\n\t\t<mat-card-actions fxLayout fxLayoutAlign=\"space-around\">\n\t\t\t<button mat-fab color=\"warn\" [disabled]=\"rForm.value.new\" (click)=\"this.delete(rForm.value)\"><mat-icon>delete</mat-icon></button>\n\t\t\t\n\t\t\t<button mat-fab type=\"submit\" color=\"primary\" [disabled]=\"!rForm.valid\" (click)=\"save(rForm.value)\"><mat-icon>save</mat-icon></button>\n\t\t</mat-card-actions>\n\t</mat-card>\n</div>"

/***/ }),

/***/ "../../../../../src/app/content-types/content-types-editor/content-types-editor.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentTypesEditorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__content_field_content_field_service__ = __webpack_require__("../../../../../src/app/content-field/content-field.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__content_types_service__ = __webpack_require__("../../../../../src/app/content-types/content-types.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ContentTypesEditorComponent = (function () {
    function ContentTypesEditorComponent(router, fb, route, snackBar, service, contentFieldService) {
        this.router = router;
        this.fb = fb;
        this.route = route;
        this.snackBar = snackBar;
        this.service = service;
        this.contentFieldService = contentFieldService;
        this.fieldTypes = ['text'];
        this.rForm = fb.group({
            'id': [''],
            'name': ['MyContentType', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["j" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["j" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["j" /* Validators */].minLength(1), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["j" /* Validators */].maxLength(255)])],
            'description': ['A new content type =]'],
            'fields': fb.array([]),
            'new': [true],
            'createdDate': [null],
            'createdBy': [null],
            'modifiedDate': [null],
            'modifiedBy': [null],
            '_links': [null],
            '_embedded': [null]
        });
    }
    ContentTypesEditorComponent.prototype.prepareSave = function (model) {
        var halModel = Object.assign({}, model);
        halModel.fields = [];
        if (model.fields) {
            model.fields.map(function (field) {
                console.log(field);
                halModel.fields.push(field._links.self.href);
            });
        }
        console.log('halModel:', halModel);
        return halModel;
    };
    ContentTypesEditorComponent.prototype.save = function (model) {
        var _this = this;
        var halModel = this.prepareSave(model);
        this.service.saveItem(halModel).subscribe(function (data) {
            _this.router.navigate(['content-types-editor', { id: data.id }]);
        }, function (err) {
            if (err.statusText === 'Conflict') {
                _this.snackBar.open('The template name must be unique', 'Close', { duration: 8000 });
            }
        });
    };
    ContentTypesEditorComponent.prototype.delete = function (model) {
        var _this = this;
        this.service.deleteItem(model).subscribe(function (data) {
            _this.router.navigate(['content-types']);
        }, function (err) {
            _this.snackBar.open('Error while deleting the item', 'Close', { duration: 8000 });
            console.error(err);
        });
    };
    ContentTypesEditorComponent.prototype.loadItem = function (id) {
        var _this = this;
        if (id) {
            this.service.findOne(id).subscribe(function (response) {
                _this.rForm.patchValue(response);
                _this.service.findContentFields(response).subscribe(function (data) {
                    _this.setContentFields(data._embedded.contentFields);
                }, function (err) {
                    console.error('could not get contentFields for the contentType');
                });
            });
        }
    };
    ContentTypesEditorComponent.prototype.setContentFields = function (contentFields) {
        var _this = this;
        contentFields.map(function (contentField) {
            var fieldControlGroup = _this.fb.group(contentField);
            _this.listenToContentFieldChanges(fieldControlGroup);
            _this.fields.push(fieldControlGroup);
        });
    };
    ContentTypesEditorComponent.prototype.listenToContentFieldChanges = function (fieldControl) {
        var _this = this;
        var source = fieldControl.valueChanges;
        var valueChangesubscription = source.subscribe(function (value) {
            _this.contentFieldService.saveItem(fieldControl.value).subscribe(function (data) {
                _this.snackBar.open('Auto-saved field properties', 'Close', { duration: 8000 });
            }, function (err) {
                console.error('failed to save contentField');
            });
        });
    };
    Object.defineProperty(ContentTypesEditorComponent.prototype, "fields", {
        get: function () {
            return this.rForm.get('fields');
        },
        enumerable: true,
        configurable: true
    });
    ContentTypesEditorComponent.prototype.addField = function () {
        var _this = this;
        var field = new __WEBPACK_IMPORTED_MODULE_0__content_field_content_field_service__["a" /* ContentField */]();
        field.name = 'text';
        field.displayName = 'Text field';
        field.fieldType = 'text';
        field.contentType = this.rForm.value._links.self.href;
        this.contentFieldService.saveItem(field).subscribe(function (data) {
            var fieldControlGroup = _this.fb.group(data);
            _this.listenToContentFieldChanges(fieldControlGroup);
            _this.fields.push(fieldControlGroup);
        }, function (err) {
            console.error('failed to save contentField');
        });
    };
    ContentTypesEditorComponent.prototype.removeFieldControl = function (index) {
        var _this = this;
        this.service.deleteContentField(this.rForm.value, this.fields.at(index).value).subscribe(function (data) {
            _this.fields.removeAt(index);
        }, function (err) {
            _this.snackBar.open('Error while removing field', 'Close', { duration: 8000 });
            console.error(err);
        });
    };
    ContentTypesEditorComponent.prototype.trackById = function (index, item) {
        return item.id;
    };
    ContentTypesEditorComponent.prototype.idCompare = function (o1, o2) {
        return o1.id === o2.id;
    };
    ContentTypesEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) { return _this.loadItem(params['id']); });
    };
    return ContentTypesEditorComponent;
}());
ContentTypesEditorComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["o" /* Component */])({
        selector: 'app-content-types-editor',
        template: __webpack_require__("../../../../../src/app/content-types/content-types-editor/content-types-editor.component.html"),
        styles: [__webpack_require__("../../../../../src/app/content-types/content-types-editor/content-types-editor.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__angular_material__["n" /* MatSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_material__["n" /* MatSnackBar */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__content_types_service__["a" /* ContentTypesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__content_types_service__["a" /* ContentTypesService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__content_field_content_field_service__["b" /* ContentFieldService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__content_field_content_field_service__["b" /* ContentFieldService */]) === "function" && _f || Object])
], ContentTypesEditorComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=content-types-editor.component.js.map

/***/ }),

/***/ "../../../../../src/app/content-types/content-types.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "mat-card {\n\tmin-width: 150px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/content-types/content-types.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutGap=\"1em\">\r\n\t<mat-toolbar>\r\n\t\t<button mat-button (click)=\"addItem()\">\r\n\t\t\t<mat-icon>add</mat-icon>\r\n\t\t\t<span>New Content Type</span>\r\n\t\t</button>\r\n\t</mat-toolbar>\r\n\t\r\n\t<div fxLayout fxLayout.lt-sm=\"column\" fxLayoutWrap=\"true\" fxLayoutGap=\"1em\">\r\n\t\t<mat-card  *ngFor=\"let item of items\">\r\n\t\t\t<mat-card-header>\r\n\t\t\t\t<mat-card-title>{{item.name}}</mat-card-title>\r\n\t\t\t\t<mat-card-subtitle>{{item.description}}</mat-card-subtitle>\r\n\t\t\t</mat-card-header>\r\n\t\t\t<mat-card-actions>\r\n\t\t\t\t<button mat-button (click)=\"editItem(item)\">\r\n\t\t\t\t\t<mat-icon matListIcon>edit</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t\t<button mat-button (click)=\"deleteItem(item)\">\r\n\t\t\t\t\t<mat-icon matListIcon>delete</mat-icon>\r\n\t\t\t\t</button>\r\n\t\t\t</mat-card-actions>\r\n\t\t</mat-card>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/content-types/content-types.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentTypesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__content_types_service__ = __webpack_require__("../../../../../src/app/content-types/content-types.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ContentTypesComponent = (function () {
    function ContentTypesComponent(router, contentTypes, snackBar) {
        this.router = router;
        this.contentTypes = contentTypes;
        this.snackBar = snackBar;
        this.getItems();
    }
    ContentTypesComponent.prototype.addItem = function () {
        this.router.navigate(['content-types-editor']);
    };
    ContentTypesComponent.prototype.editItem = function (item) {
        this.router.navigate(['content-types-editor', { id: item.id }]);
    };
    ContentTypesComponent.prototype.deleteItem = function (item) {
        var _this = this;
        this.contentTypes.deleteItem(item).subscribe(function (data) {
            _this.getItems();
        }, function (err) {
            _this.snackBar.open('Could not delete item', 'Close', { duration: 8000 });
            console.error(err);
        });
    };
    ContentTypesComponent.prototype.getItems = function () {
        var _this = this;
        this.contentTypes.findAll().subscribe(function (data) {
            _this.items = data._embedded.contentTypes;
        }, function (err) {
            console.error('Failed to get contentTypes');
        });
    };
    ContentTypesComponent.prototype.ngOnInit = function () {
    };
    return ContentTypesComponent;
}());
ContentTypesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["o" /* Component */])({
        selector: 'app-content-types',
        template: __webpack_require__("../../../../../src/app/content-types/content-types.component.html"),
        styles: [__webpack_require__("../../../../../src/app/content-types/content-types.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__content_types_service__["a" /* ContentTypesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__content_types_service__["a" /* ContentTypesService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["n" /* MatSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_material__["n" /* MatSnackBar */]) === "function" && _c || Object])
], ContentTypesComponent);

var _a, _b, _c;
//# sourceMappingURL=content-types.component.js.map

/***/ }),

/***/ "../../../../../src/app/content-types/content-types.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentTypesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__content_field_content_field_module__ = __webpack_require__("../../../../../src/app/content-field/content-field.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__material_material_module__ = __webpack_require__("../../../../../src/app/material/material.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__content_types_editor_content_types_editor_component__ = __webpack_require__("../../../../../src/app/content-types/content-types-editor/content-types-editor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__content_types_component__ = __webpack_require__("../../../../../src/app/content-types/content-types.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__content_types_service__ = __webpack_require__("../../../../../src/app/content-types/content-types.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var ContentTypesModule = (function () {
    function ContentTypesModule() {
    }
    return ContentTypesModule;
}());
ContentTypesModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["i" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__material_material_module__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_0__content_field_content_field_module__["a" /* ContentFieldModule */]
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_4__material_material_module__["a" /* MaterialModule */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_6__content_types_component__["a" /* ContentTypesComponent */], __WEBPACK_IMPORTED_MODULE_5__content_types_editor_content_types_editor_component__["a" /* ContentTypesEditorComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_7__content_types_service__["a" /* ContentTypesService */]]
    })
], ContentTypesModule);

//# sourceMappingURL=content-types.module.js.map

/***/ }),

/***/ "../../../../../src/app/content-types/content-types.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ContentType */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentTypesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spring_data_rest_repository_service__ = __webpack_require__("../../../../../src/app/spring-data/rest-repository.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ContentType = (function (_super) {
    __extends(ContentType, _super);
    function ContentType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContentType;
}(__WEBPACK_IMPORTED_MODULE_0__spring_data_rest_repository_service__["a" /* HalResponse */]));

var ContentTypesService = (function (_super) {
    __extends(ContentTypesService, _super);
    function ContentTypesService(http) {
        return _super.call(this, http, '/api/contentTypes') || this;
    }
    ContentTypesService.prototype.findContentFields = function (contentType) {
        return this.http.get(contentType._links.fields.href);
    };
    ContentTypesService.prototype.deleteContentField = function (contentType, field) {
        return this.http.delete(contentType._links.fields.href + '/' + field.id);
    };
    return ContentTypesService;
}(__WEBPACK_IMPORTED_MODULE_0__spring_data_rest_repository_service__["b" /* RestRepositoryService */]));
ContentTypesService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
], ContentTypesService);

var _a;
//# sourceMappingURL=content-types.service.js.map

/***/ }),

/***/ "../../../../../src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxFlex fxLayoutAlign=\"center center\">\r\n\t<img src=\"./assets/img/sprout.png\"> \r\n\t<section>\r\n\t\t<p>Use the Sprout Administration application to manage the content pages of your site</p>\r\n\t</section>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/home/home.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host > div {\n  height: 100%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = (function () {
    function HomeComponent() {
        // Do stuff
    }
    HomeComponent.prototype.ngOnInit = function () {
        console.log('Hello Home');
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-home',
        template: __webpack_require__("../../../../../src/app/home/home.component.html"),
        styles: [__webpack_require__("../../../../../src/app/home/home.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], HomeComponent);

//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/material/material.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaterialModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__ = __webpack_require__("../../../flex-layout/@angular/flex-layout.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var MaterialModule = (function () {
    function MaterialModule() {
    }
    return MaterialModule;
}());
MaterialModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [],
        declarations: [],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["m" /* MatSidenavModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["a" /* MatButtonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["f" /* MatIconModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["j" /* MatRippleModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["h" /* MatListModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["i" /* MatMenuModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["p" /* MatToolbarModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["b" /* MatCardModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["e" /* MatFormFieldModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["g" /* MatInputModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["o" /* MatSnackBarModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["k" /* MatSelectModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MatCheckboxModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["d" /* MatExpansionModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__["a" /* FlexLayoutModule */]
        ],
        providers: []
    })
], MaterialModule);

//# sourceMappingURL=material.module.js.map

/***/ }),

/***/ "../../../../../src/app/menu/menu.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/menu/menu.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-list>\n\t<mat-list-item>\n\t\t<button mat-button (click)=\"menu.close()\">\n\t\t\t<mat-icon>menu</mat-icon>\n\t\t\t<span>Close Menu</span>\n\t\t</button>\n\t</mat-list-item>\n\t<mat-list-item>\n\t\t<button mat-button [routerLink]=\"['']\">\n\t\t\t<mat-icon>home</mat-icon>\n\t\t\t<span>Home</span>\n\t\t</button>\n\t</mat-list-item>\n\t<mat-list-item>\n\t\t<button mat-button [routerLink]=\"['app-menu']\">\n\t\t\t<mat-icon>assignment</mat-icon>\n\t\t\t<span>App Menu</span>\n\t\t</button>\n\t</mat-list-item>\n\t<mat-list-item>\n\t\t<button mat-button [routerLink]=\"['layouts']\">\n\t\t\t<mat-icon>assignment</mat-icon>\n\t\t\t<span>Page Layouts</span>\n\t\t</button>\n\t</mat-list-item>\n\t<mat-list-item>\n\t\t<button mat-button [routerLink]=\"['pages']\">\n\t\t\t<mat-icon>assignment</mat-icon>\n\t\t\t<span>Pages</span>\n\t\t</button>\n\t</mat-list-item>\n\t<mat-list-item>\n\t\t<button mat-button [routerLink]=\"['content-template']\">\n\t\t\t<mat-icon>assignment</mat-icon>\n\t\t\t<span>Content Templates</span>\n\t\t</button>\n\t</mat-list-item>\n\t<mat-list-item>\n\t\t<button mat-button [routerLink]=\"['content-types']\">\n\t\t\t<mat-icon>description</mat-icon>\n\t\t\t<span>Content Types</span>\n\t\t</button>\n\t</mat-list-item>\n\t<mat-list-item>\n\t\t<button mat-button [routerLink]=\"['content-item']\">\n\t\t\t<mat-icon>library_books</mat-icon>\n\t\t\t<span>Content Items</span>\n\t\t</button>\n\t</mat-list-item>\n</mat-list>\n"

/***/ }),

/***/ "../../../../../src/app/menu/menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MenuComponent = (function () {
    function MenuComponent() {
    }
    MenuComponent.prototype.ngOnInit = function () {
    };
    return MenuComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["l" /* MatSidenav */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["l" /* MatSidenav */]) === "function" && _a || Object)
], MenuComponent.prototype, "menu", void 0);
MenuComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-menu',
        template: __webpack_require__("../../../../../src/app/menu/menu.component.html"),
        styles: [__webpack_require__("../../../../../src/app/menu/menu.component.css")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* ViewEncapsulation */].None
    }),
    __metadata("design:paramtypes", [])
], MenuComponent);

var _a;
//# sourceMappingURL=menu.component.js.map

/***/ }),

/***/ "../../../../../src/app/menu/menu.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__material_material_module__ = __webpack_require__("../../../../../src/app/material/material.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__menu_component__ = __webpack_require__("../../../../../src/app/menu/menu.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var MenuModule = (function () {
    function MenuModule() {
    }
    return MenuModule;
}());
MenuModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_4__material_material_module__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["c" /* RouterModule */].forChild([])
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_6__menu_component__["a" /* MenuComponent */]],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_4__material_material_module__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_6__menu_component__["a" /* MenuComponent */]
        ]
    })
], MenuModule);

//# sourceMappingURL=menu.module.js.map

/***/ }),

/***/ "../../../../../src/app/spring-data/rest-repository.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HalResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RestRepositoryService; });
var HalResponse = (function () {
    function HalResponse() {
    }
    return HalResponse;
}());

var RestRepositoryService = (function () {
    function RestRepositoryService(http, baseRepositoryPath) {
        this.http = http;
        this.baseRepositoryPath = baseRepositoryPath;
    }
    RestRepositoryService.prototype.findAll = function (options) {
        return this.http.get(this.baseRepositoryPath, options);
    };
    RestRepositoryService.prototype.findOne = function (id, options) {
        return this.http.get(this.baseRepositoryPath + '/' + id, options);
    };
    RestRepositoryService.prototype.saveItem = function (item) {
        console.info('attempting to save object: {}', item);
        if (item['new'] === false) {
            return this.http.put(this.baseRepositoryPath + '/' + item.id, item);
        }
        else {
            return this.http.post(this.baseRepositoryPath, item);
        }
    };
    RestRepositoryService.prototype.deleteItem = function (item) {
        return this.http.delete(this.baseRepositoryPath + '/' + item.id);
    };
    return RestRepositoryService;
}());

//# sourceMappingURL=rest-repository.service.js.map

/***/ }),

/***/ "../../../../../src/app/standard/service-locator.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceLocator; });
var ServiceLocator = (function () {
    function ServiceLocator() {
    }
    return ServiceLocator;
}());

//# sourceMappingURL=service-locator.js.map

/***/ }),

/***/ "../../../../../src/app/web-page/content/page-content.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PageContentService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spring_data_rest_repository_service__ = __webpack_require__("../../../../../src/app/spring-data/rest-repository.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PageContent = (function (_super) {
    __extends(PageContent, _super);
    function PageContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PageContent;
}(__WEBPACK_IMPORTED_MODULE_0__spring_data_rest_repository_service__["a" /* HalResponse */]));

var PageContentService = (function (_super) {
    __extends(PageContentService, _super);
    function PageContentService(http) {
        return _super.call(this, http, '/api/webPageContents') || this;
    }
    PageContentService.prototype.associateContentItems = function (pageContent) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'text/uri-list' });
        return this.http.post(pageContent._links.contentItems.href, pageContent.contentItems.join('\n'), { headers: headers });
    };
    return PageContentService;
}(__WEBPACK_IMPORTED_MODULE_0__spring_data_rest_repository_service__["b" /* RestRepositoryService */]));
PageContentService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
], PageContentService);

var _a;
//# sourceMappingURL=page-content.service.js.map

/***/ }),

/***/ "../../../../../src/app/web-page/layout/layout-editor/layout-editor.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/web-page/layout/layout-editor/layout-editor.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content\" fxLayout fxLayoutAlign=\"center center\" fxLayoutGap=\"10px\" fxFlexFill>\n\t<mat-card [fxFlex.lt-md]=\"100\" [fxFlex.md]=\"80\" [fxFlex.lg]=\"60\" [fxFlex.xl]=\"50\">\n\t\t<mat-card-header fxLayoutAlign=\"center center\" fxLayout fxFlexFill>\n\t\t\t<mat-card-title>Page Layout Editor</mat-card-title>\n\t\t\t<span fxFlex></span>\n\t\t\t<button mat-button (click)=\"router.navigate(['layouts'])\"><mat-icon>close</mat-icon></button>\n\t\t</mat-card-header>\n\t\t<mat-card-content>\n\t\t\t<form [formGroup]=\"rForm\" fxLayout=\"column\">\n\t\t\t\t\n\t\t\t\t<mat-form-field hintLabel=\"Max 255 characters\">\n\t\t\t\t\t<input matInput formControlName=\"name\" maxlength=\"255\" placeholder=\"Enter a name\">\n\t\t\t\t\t<mat-hint align=\"end\">{{rForm.controls['name'].value?.length || 0}}/255</mat-hint>\n\t\t\t\t</mat-form-field>\n\t\t\t\n\t\t\t\t<mat-form-field hintLabel=\"Max 255 characters\">\n\t\t\t\t\t<input matInput formControlName=\"description\" maxlength=\"255\" placeholder=\"Enter a description\">\n\t\t\t\t\t<mat-hint align=\"end\">{{rForm.controls['description'].value?.length || 0}}/255</mat-hint>\n\t\t\t\t</mat-form-field>\n\t\t\t\t\n\t\t\t\t<mat-form-field hintLabel=\"Max 3000 characters\">\n\t\t\t\t\t<textarea rows=\"10\" matInput formControlName=\"template\" maxlength=\"3000\" placeholder=\"Enter a FreeMarker template\"></textarea>\n\t\t\t\t\t<mat-hint align=\"end\">{{rForm.controls['template'].value?.length || 0}}/3000</mat-hint>\n\t\t\t\t</mat-form-field>\n\t\t\t\t\n\t\t\t\t<br/>\n\t\t\t\t\n\t\t\t\t<div fxLayout fxLayoutAlign=\"start center\">\n\t\t\t\t\t<button mat-button color=\"accent\" (click)=\"addPlaceHolder()\">\n\t\t\t\t\t\t<mat-icon>add</mat-icon>\n\t\t\t\t\t\t<span>Add new placeholder</span>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<div formArrayName=\"placeHolders\">\n\t\t\t\t\t<div fxLayout fxLayoutAlign=\"center center\" *ngFor=\"let item of placeHolders.controls; let i=index\" [formGroupName]=\"i\" >\n\t\t\t\t\t\t<mat-form-field hintLabel=\"Max 255 characters\">\n\t\t\t\t\t\t\t<input matInput formControlName=\"value\" maxlength=\"255\">\n\t\t\t\t\t\t\t<mat-hint align=\"end\">{{item.value?.length || 0}}/255</mat-hint>\n\t\t\t\t\t\t</mat-form-field>\n\t\t\t\t\t\t<button mat-button color=\"warn\" (click)=\"removePlaceHolderControl(i)\"><md-icon>x</md-icon></button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\n\t\t\t</form>\n\t\t</mat-card-content>\n\t\t<mat-card-actions fxLayout fxLayoutAlign=\"space-around\">\n\t\t\t<button mat-fab color=\"warn\" [disabled]=\"rForm.value.new\" (click)=\"this.delete(rForm.value)\"><mat-icon>delete</mat-icon></button>\n\t\t\t\n\t\t\t<button mat-fab type=\"submit\" color=\"primary\" [disabled]=\"!rForm.valid\" (click)=\"save(rForm.value)\"><mat-icon>save</mat-icon></button>\n\t\t</mat-card-actions>\n\t</mat-card>\n</div>"

/***/ }),

/***/ "../../../../../src/app/web-page/layout/layout-editor/layout-editor.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutEditorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layout_service__ = __webpack_require__("../../../../../src/app/web-page/layout/layout.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LayoutEditorComponent = (function () {
    function LayoutEditorComponent(router, fb, route, snackBar, service) {
        this.router = router;
        this.fb = fb;
        this.route = route;
        this.snackBar = snackBar;
        this.service = service;
        this.rForm = fb.group({
            'id': [''],
            'name': ['My new layout', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].minLength(1), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].maxLength(255)])],
            'description': ['A layout'],
            'placeHolders': fb.array([]),
            'template': [''],
            'showHeader': [true],
            'showFooter': [true],
            'new': [true],
            'createdDate': [null],
            'createdBy': [null],
            'modifiedDate': [null],
            'modifiedBy': [null],
            '_links': [null],
            '_embedded': [null]
        });
    }
    LayoutEditorComponent.prototype.prepareSave = function (model) {
        var halModel = Object.assign({}, model);
        halModel.placeHolders = model.placeHolders.map(function (item) {
            return item.value;
        });
        console.log('halModel:', halModel);
        return halModel;
    };
    LayoutEditorComponent.prototype.save = function (model) {
        var _this = this;
        var halModel = this.prepareSave(model);
        this.service.saveItem(halModel).subscribe(function (data) {
            _this.router.navigate(['layout-editor', { id: data.id }]);
        }, function (err) {
            if (err.statusText === 'Conflict') {
                _this.snackBar.open('The name must be unique', 'Close', { duration: 8000 });
            }
        });
    };
    LayoutEditorComponent.prototype.delete = function (model) {
        var _this = this;
        this.service.deleteItem(model).subscribe(function (data) {
            _this.router.navigate(['layouts']);
        }, function (err) {
            _this.snackBar.open('Error while deleting the item', 'Close', { duration: 8000 });
            console.error(err);
        });
    };
    LayoutEditorComponent.prototype.loadItem = function (id) {
        var _this = this;
        if (id) {
            this.service.findOne(id).subscribe(function (response) {
                _this.rForm.patchValue(response);
                response.placeHolders.map(function (placeHolder) {
                    _this.addPlaceHolder(placeHolder);
                });
            });
        }
    };
    Object.defineProperty(LayoutEditorComponent.prototype, "placeHolders", {
        get: function () {
            return this.rForm.get('placeHolders');
        },
        enumerable: true,
        configurable: true
    });
    LayoutEditorComponent.prototype.addPlaceHolder = function (value) {
        var placeHolderControl = this.fb.group({ 'value': [value] });
        this.placeHolders.push(placeHolderControl);
    };
    LayoutEditorComponent.prototype.removePlaceHolderControl = function (index) {
        this.placeHolders.removeAt(index);
    };
    LayoutEditorComponent.prototype.trackById = function (index, item) {
        return item.id;
    };
    LayoutEditorComponent.prototype.idCompare = function (o1, o2) {
        return o1.id === o2.id;
    };
    LayoutEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) { return _this.loadItem(params['id']); });
    };
    return LayoutEditorComponent;
}());
LayoutEditorComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["o" /* Component */])({
        selector: 'app-layout-editor',
        template: __webpack_require__("../../../../../src/app/web-page/layout/layout-editor/layout-editor.component.html"),
        styles: [__webpack_require__("../../../../../src/app/web-page/layout/layout-editor/layout-editor.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_material__["n" /* MatSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_material__["n" /* MatSnackBar */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__layout_service__["a" /* LayoutService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__layout_service__["a" /* LayoutService */]) === "function" && _e || Object])
], LayoutEditorComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=layout-editor.component.js.map

/***/ }),

/***/ "../../../../../src/app/web-page/layout/layout-list/layout-list.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/web-page/layout/layout-list/layout-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutGap=\"1em\">\n\t<mat-toolbar>\n\t\t<button mat-button (click)=\"addItem()\">\n\t\t\t<mat-icon>add</mat-icon>\n\t\t\t<span>New Layout</span>\n\t\t</button>\n\t</mat-toolbar>\n\t\n\t<div fxLayout fxLayout.lt-sm=\"column\" fxLayoutWrap=\"true\" fxLayoutGap=\"1em\">\n\t\t<mat-card  *ngFor=\"let item of items\">\n\t\t\t<mat-card-header>\n\t\t\t\t<mat-card-title>{{item.name}}</mat-card-title>\n\t\t\t\t<mat-card-subtitle>{{item.description}}</mat-card-subtitle>\n\t\t\t</mat-card-header>\n\t\t\t<mat-card-actions>\n\t\t\t\t<button mat-button (click)=\"editItem(item)\">\n\t\t\t\t\t<mat-icon matListIcon>edit</mat-icon>\n\t\t\t\t</button>\n\t\t\t\t<button mat-button (click)=\"deleteItem(item)\">\n\t\t\t\t\t<mat-icon matListIcon>delete</mat-icon>\n\t\t\t\t</button>\n\t\t\t</mat-card-actions>\n\t\t</mat-card>\n\t</div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/web-page/layout/layout-list/layout-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layout_service__ = __webpack_require__("../../../../../src/app/web-page/layout/layout.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LayoutListComponent = (function () {
    function LayoutListComponent(router, service, snackBar) {
        this.router = router;
        this.service = service;
        this.snackBar = snackBar;
        this.getItems();
    }
    LayoutListComponent.prototype.addItem = function () {
        this.router.navigate(['layout-editor']);
    };
    LayoutListComponent.prototype.editItem = function (item) {
        this.router.navigate(['layout-editor', { id: item.id }]);
    };
    LayoutListComponent.prototype.deleteItem = function (item) {
        var _this = this;
        this.service.deleteItem(item).subscribe(function (data) {
            _this.getItems();
        }, function (err) {
            _this.snackBar.open('Could not delete item', 'Close', { duration: 8000 });
            console.error(err);
        });
    };
    LayoutListComponent.prototype.getItems = function () {
        var _this = this;
        this.service.findAll().subscribe(function (data) {
            _this.items = data._embedded.webPageLayouts;
        }, function (err) {
            console.error('Failed to get items');
        });
    };
    LayoutListComponent.prototype.ngOnInit = function () {
    };
    return LayoutListComponent;
}());
LayoutListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["o" /* Component */])({
        selector: 'app-layout-list',
        template: __webpack_require__("../../../../../src/app/web-page/layout/layout-list/layout-list.component.html"),
        styles: [__webpack_require__("../../../../../src/app/web-page/layout/layout-list/layout-list.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__layout_service__["a" /* LayoutService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__layout_service__["a" /* LayoutService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["n" /* MatSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_material__["n" /* MatSnackBar */]) === "function" && _c || Object])
], LayoutListComponent);

var _a, _b, _c;
//# sourceMappingURL=layout-list.component.js.map

/***/ }),

/***/ "../../../../../src/app/web-page/layout/layout.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Layout */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spring_data_rest_repository_service__ = __webpack_require__("../../../../../src/app/spring-data/rest-repository.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Layout = (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Layout;
}(__WEBPACK_IMPORTED_MODULE_0__spring_data_rest_repository_service__["a" /* HalResponse */]));

var LayoutService = (function (_super) {
    __extends(LayoutService, _super);
    function LayoutService(http) {
        return _super.call(this, http, '/api/webPageLayouts') || this;
    }
    return LayoutService;
}(__WEBPACK_IMPORTED_MODULE_0__spring_data_rest_repository_service__["b" /* RestRepositoryService */]));
LayoutService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
], LayoutService);

var _a;
//# sourceMappingURL=layout.service.js.map

/***/ }),

/***/ "../../../../../src/app/web-page/page/page-editor/page-editor.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/web-page/page/page-editor/page-editor.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content\" fxLayout fxLayoutAlign=\"center center\" fxLayoutGap=\"10px\" fxFlexFill>\n\t<mat-card *ngIf=\"rForm\" [fxFlex.lt-md]=\"100\" [fxFlex.md]=\"80\" [fxFlex.lg]=\"60\" [fxFlex.xl]=\"50\">\n\t\t<mat-card-header fxLayoutAlign=\"center center\" fxLayout fxFlexFill>\n\t\t\t<mat-card-title>Page Editor</mat-card-title>\n\t\t\t<span fxFlex></span>\n\t\t\t<button mat-button (click)=\"router.navigate(['pages'])\"><mat-icon>close</mat-icon></button>\n\t\t</mat-card-header>\n\t\t<mat-card-content>\n\t\t\t<form [formGroup]=\"rForm\" fxLayout=\"column\">\n\t\t\t\t\n\t\t\t\t<mat-checkbox formControlName=\"home\">Make this the home page</mat-checkbox>\n\t\t\t\t\n\t\t\t\t<mat-form-field hintLabel=\"Max 255 characters\">\n\t\t\t\t\t<input matInput formControlName=\"name\" maxlength=\"255\" placeholder=\"Enter a name\">\n\t\t\t\t\t<mat-hint align=\"end\">{{rForm.controls['name'].value?.length || 0}}/255</mat-hint>\n\t\t\t\t</mat-form-field>\n\t\t\t\n\t\t\t\t<mat-form-field hintLabel=\"Max 255 characters\">\n\t\t\t\t\t<input matInput formControlName=\"description\" maxlength=\"255\" placeholder=\"Enter a description\">\n\t\t\t\t\t<mat-hint align=\"end\">{{rForm.controls['description'].value?.length || 0}}/255</mat-hint>\n\t\t\t\t</mat-form-field>\n\t\t\t\t\n\t\t\t\t<mat-form-field hintLabel=\"The page layout determines the placeholders; cannot change once set\">\n\t\t\t\t\t<mat-select matInput formControlName=\"webPageLayout\" [disabled]=\"!rForm.value.new\" [compareWith]=\"idCompare\">\n\t\t\t\t\t\t<mat-option *ngFor=\"let item of this.layouts; trackBy: trackById\" [value]=\"item\">{{item.name}}</mat-option>\n\t\t\t\t\t</mat-select>\n\t\t\t\t</mat-form-field>\n\t\t\t\t\n\t\t\t\t<br/>\n\t\t\t\t\n\t\t\t\t<div *ngIf=\"!rForm.value.new\" formArrayName=\"contentItems\">\n\t\t\t\t\t<div fxLayout fxLayoutAlign=\"center center\" *ngFor=\"let item of contentItems.controls; let i=index\" [formGroupName]=\"i\" >\n\t\t\t\t\t\t<mat-form-field hintLabel=\"{{item.value.key}}\">\n\t\t\t\t\t\t\t<mat-select matInput formControlName=\"value\" [compareWith]=\"idCompare\">\n\t\t\t\t\t\t\t\t<mat-option *ngFor=\"let contentItem of this.allContentItems; trackBy: trackById\" [value]=\"contentItem\">{{contentItem.name}}</mat-option>\n\t\t\t\t\t\t\t</mat-select>\n\t\t\t\t\t\t</mat-form-field>\n\t\t\t\t\t\t<button mat-button color=\"warn\" (click)=\"removeContentItem(i)\"><md-icon>x</md-icon></button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\n\t\t\t</form>\n\t\t</mat-card-content>\n\t\t<mat-card-actions fxLayout fxLayoutAlign=\"space-around\">\n\t\t\t<button mat-fab color=\"warn\" [disabled]=\"rForm.value.new\" (click)=\"this.delete(rForm.value)\"><mat-icon>delete</mat-icon></button>\n\t\t\t\n\t\t\t<button mat-fab type=\"submit\" color=\"primary\" [disabled]=\"!rForm.valid\" (click)=\"save(rForm.value)\"><mat-icon>save</mat-icon></button>\n\t\t</mat-card-actions>\n\t</mat-card>\n</div>"

/***/ }),

/***/ "../../../../../src/app/web-page/page/page-editor/page-editor.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageEditorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__content_item_content_item_service__ = __webpack_require__("../../../../../src/app/content-item/content-item.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__content_page_content_service__ = __webpack_require__("../../../../../src/app/web-page/content/page-content.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layout_layout_service__ = __webpack_require__("../../../../../src/app/web-page/layout/layout.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_service__ = __webpack_require__("../../../../../src/app/web-page/page/page.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var PageEditorComponent = (function () {
    function PageEditorComponent(router, fb, route, snackBar, service, layoutService, contentItemService) {
        var _this = this;
        this.router = router;
        this.fb = fb;
        this.route = route;
        this.snackBar = snackBar;
        this.service = service;
        this.layoutService = layoutService;
        this.contentItemService = contentItemService;
        this.formDefinition = {
            'id': [''],
            'home': [false],
            'name': ['My new page', __WEBPACK_IMPORTED_MODULE_5__angular_forms__["j" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_5__angular_forms__["j" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["j" /* Validators */].minLength(1), __WEBPACK_IMPORTED_MODULE_5__angular_forms__["j" /* Validators */].maxLength(255)])],
            'description': ['A page'],
            'contentItems': this.fb.array([]),
            'webPageLayout': [null],
            'new': [true],
            'createdDate': [null],
            'createdBy': [null],
            'modifiedDate': [null],
            'modifiedBy': [null],
            '_links': [null],
            '_embedded': [null]
        };
        layoutService.findAll().subscribe(function (response) {
            _this.layouts = response._embedded.webPageLayouts;
        }, function (err) {
            snackBar.open('Could not retrieve Page Layouts');
            console.error(err);
        });
        contentItemService.findAll().subscribe(function (contentItemsResponse) {
            _this.allContentItems = contentItemsResponse._embedded.contentItems;
        }, function (err) {
            _this.snackBar.open('Could not retrieve All Content Items');
            console.error(err);
        });
    }
    PageEditorComponent.prototype.prepareSave = function (model) {
        var _this = this;
        var preparePromise = new Promise(function (resolve, reject) {
            var halModel = Object.assign({}, model);
            halModel.webPageLayout = model.webPageLayout._links.self.href;
            var contentItemPromises = [];
            model.contentItems.map(function (item) {
                if (item.value !== null) {
                    var pageContent = new __WEBPACK_IMPORTED_MODULE_1__content_page_content_service__["a" /* PageContent */]();
                    pageContent.placeHolderId = item.key;
                    pageContent.contentItems = [item.value._links.self.href];
                    pageContent.webPage = _this.rForm.value._links.self.href;
                    var promise = _this.saveWebPageContentItem(_this.rForm.value, [pageContent]);
                    contentItemPromises.push(promise);
                }
            });
            Promise.all(contentItemPromises).then(function (savedContentItems) {
                // content items have already been saved
                delete halModel.contentItems;
                console.log('halModel:', halModel);
                resolve(halModel);
            });
        });
        return preparePromise;
    };
    PageEditorComponent.prototype.saveWebPageContentItem = function (webPage, contentItems) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.service.saveContentItems(webPage, contentItems).then(function (response) {
                resolve(response);
            }, reject);
        });
        return promise;
    };
    PageEditorComponent.prototype.save = function (model) {
        var _this = this;
        this.prepareSave(model).then(function (halModel) {
            _this.service.saveItem(halModel).subscribe(function (data) {
                _this.router.navigate(['page-editor', { id: data.id }]);
            }, function (err) {
                if (err.statusText === 'Conflict') {
                    _this.snackBar.open('There was a conflict while saving', 'Close', { duration: 8000 });
                }
            });
        });
    };
    PageEditorComponent.prototype.delete = function (model) {
        var _this = this;
        this.service.deleteItem(model).subscribe(function (data) {
            _this.router.navigate(['pages']);
        }, function (err) {
            _this.snackBar.open('Error while deleting the item', 'Close', { duration: 8000 });
            console.error(err);
        });
    };
    PageEditorComponent.prototype.loadItem = function (id) {
        var _this = this;
        if (id) {
            var params = new URLSearchParams();
            params.append('projection', 'inlineContentItems');
            var fDefinition_1 = Object.assign({}, this.formDefinition);
            this.service.findOne(id, { params: params }).subscribe(function (page) {
                _this.service.getWebPageLayout(page).subscribe(function (webPageLayout) {
                    page.webPageLayout = webPageLayout;
                    webPageLayout.placeHolders.map(function (key) {
                        fDefinition_1.contentItems.push(_this.fb.group({ key: key, value: page.contentItems[key] }));
                    });
                    delete page.contentItems;
                    _this.rForm = _this.fb.group(fDefinition_1);
                    _this.rForm.patchValue(page);
                });
            });
        }
        else {
            this.rForm = this.fb.group(this.formDefinition);
        }
    };
    Object.defineProperty(PageEditorComponent.prototype, "selectedWebPageLayout", {
        get: function () {
            return this.rForm.get('webPageLayout');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageEditorComponent.prototype, "contentItems", {
        get: function () {
            return this.rForm.get('contentItems');
        },
        enumerable: true,
        configurable: true
    });
    PageEditorComponent.prototype.addContentItem = function (item) {
        var itemControl = this.fb.group({ 'key': item.key, 'value': [item.value] });
        this.contentItems.push(itemControl);
    };
    PageEditorComponent.prototype.removeContentItem = function (index) {
        this.contentItems.removeAt(index);
    };
    PageEditorComponent.prototype.trackById = function (index, item) {
        if (item == null) {
            return null;
        }
        else {
            return item.id;
        }
    };
    PageEditorComponent.prototype.idCompare = function (o1, o2) {
        if (o1 == null || o2 == null) {
            return false;
        }
        else {
            return o1.id === o2.id;
        }
    };
    PageEditorComponent.prototype.trackByKey = function (index, item) {
        return item.key;
    };
    PageEditorComponent.prototype.keyCompare = function (o1, o2) {
        return o1.key === o2.key;
    };
    PageEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) { return _this.loadItem(params['id']); });
    };
    return PageEditorComponent;
}());
PageEditorComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["o" /* Component */])({
        selector: 'app-page-editory',
        template: __webpack_require__("../../../../../src/app/web-page/page/page-editor/page-editor.component.html"),
        styles: [__webpack_require__("../../../../../src/app/web-page/page/page-editor/page-editor.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_6__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__angular_material__["n" /* MatSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__angular_material__["n" /* MatSnackBar */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__page_service__["a" /* PageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__page_service__["a" /* PageService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__layout_layout_service__["a" /* LayoutService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__layout_layout_service__["a" /* LayoutService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_0__content_item_content_item_service__["a" /* ContentItemService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__content_item_content_item_service__["a" /* ContentItemService */]) === "function" && _g || Object])
], PageEditorComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=page-editor.component.js.map

/***/ }),

/***/ "../../../../../src/app/web-page/page/page-list/page-list.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/web-page/page/page-list/page-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxLayoutGap=\"1em\">\n\t<mat-toolbar>\n\t\t<button mat-button (click)=\"addItem()\">\n\t\t\t<mat-icon>add</mat-icon>\n\t\t\t<span>New Page</span>\n\t\t</button>\n\t</mat-toolbar>\n\t\n\t<div fxLayout fxLayout.lt-sm=\"column\" fxLayoutWrap=\"true\" fxLayoutGap=\"1em\">\n\t\t<mat-card  *ngFor=\"let item of items\">\n\t\t\t<mat-card-header>\n\t\t\t\t<mat-card-title>{{item.name}}</mat-card-title>\n\t\t\t\t<mat-card-subtitle>{{item.description}}</mat-card-subtitle>\n\t\t\t</mat-card-header>\n\t\t\t<mat-card-actions>\n\t\t\t\t<button mat-button (click)=\"editItem(item)\">\n\t\t\t\t\t<mat-icon matListIcon>edit</mat-icon>\n\t\t\t\t</button>\n\t\t\t\t<button mat-button (click)=\"deleteItem(item)\">\n\t\t\t\t\t<mat-icon matListIcon>delete</mat-icon>\n\t\t\t\t</button>\n\t\t\t</mat-card-actions>\n\t\t</mat-card>\n\t</div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/web-page/page/page-list/page-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__page_service__ = __webpack_require__("../../../../../src/app/web-page/page/page.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PageListComponent = (function () {
    function PageListComponent(router, service, snackBar) {
        this.router = router;
        this.service = service;
        this.snackBar = snackBar;
        this.getItems();
    }
    PageListComponent.prototype.addItem = function () {
        this.router.navigate(['page-editor']);
    };
    PageListComponent.prototype.editItem = function (item) {
        this.router.navigate(['page-editor', { id: item.id }]);
    };
    PageListComponent.prototype.deleteItem = function (item) {
        var _this = this;
        this.service.deleteItem(item).subscribe(function (data) {
            _this.getItems();
        }, function (err) {
            _this.snackBar.open('Could not delete item', 'Close', { duration: 8000 });
            console.error(err);
        });
    };
    PageListComponent.prototype.getItems = function () {
        var _this = this;
        this.service.findAll().subscribe(function (data) {
            _this.items = data._embedded.webPages;
        }, function (err) {
            console.error('Failed to get items');
        });
    };
    PageListComponent.prototype.ngOnInit = function () {
    };
    return PageListComponent;
}());
PageListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["o" /* Component */])({
        selector: 'app-page-list',
        template: __webpack_require__("../../../../../src/app/web-page/page/page-list/page-list.component.html"),
        styles: [__webpack_require__("../../../../../src/app/web-page/page/page-list/page-list.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__page_service__["a" /* PageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__page_service__["a" /* PageService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["n" /* MatSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_material__["n" /* MatSnackBar */]) === "function" && _c || Object])
], PageListComponent);

var _a, _b, _c;
//# sourceMappingURL=page-list.component.js.map

/***/ }),

/***/ "../../../../../src/app/web-page/page/page.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Page */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spring_data_rest_repository_service__ = __webpack_require__("../../../../../src/app/spring-data/rest-repository.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__content_page_content_service__ = __webpack_require__("../../../../../src/app/web-page/content/page-content.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Page = (function (_super) {
    __extends(Page, _super);
    function Page() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Page;
}(__WEBPACK_IMPORTED_MODULE_0__spring_data_rest_repository_service__["a" /* HalResponse */]));

var PageService = (function (_super) {
    __extends(PageService, _super);
    function PageService(http, pageContentService) {
        var _this = _super.call(this, http, '/api/webPages') || this;
        _this.pageContentService = pageContentService;
        return _this;
    }
    PageService.prototype.getWebPageLayout = function (item) {
        return this.http.get(item._links.webPageLayout.href);
    };
    PageService.prototype.saveContentItems = function (webPage, contentItems) {
        var _this = this;
        // const headers = new HttpHeaders({'Content-Type': 'text/uri-list'});
        // const headers = new HttpHeaders({'Content-Type': 'application/json'});
        var promise = new Promise(function (resolve, reject) {
            var newPageContentPromises = [];
            contentItems.map(function (item) {
                if (!item.webPage) {
                    throw new Error('webPage property must be set');
                }
                var itemCopy = Object.assign({}, item);
                delete itemCopy.contentItems;
                newPageContentPromises.push(_this.pageContentService.saveItem(itemCopy).toPromise());
            });
            Promise.all(newPageContentPromises).then(function (webPageContent) {
                // Loop through the saved items and merge the properties with the objects that were passed in originally
                webPageContent.map(function (newItem) {
                    contentItems.map(function (oldItem) {
                        if (newItem.placeHolderId === oldItem.placeHolderId) {
                            oldItem = Object.assign(oldItem, newItem);
                        }
                    });
                });
                var associationPromises = contentItems.map(function (pageContent) {
                    return _this.pageContentService.associateContentItems(pageContent).toPromise();
                });
                Promise.all(associationPromises).then(function (pageContents) {
                    var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'text/uri-list' });
                    var hrefs = pageContents.map(function (item) {
                        return item._links.self.href;
                    });
                    _this.http.post(webPage._links.contentItems.href, hrefs.join('\n')).subscribe(function (response) {
                        resolve(response);
                    });
                });
            });
        });
        return promise;
    };
    return PageService;
}(__WEBPACK_IMPORTED_MODULE_0__spring_data_rest_repository_service__["b" /* RestRepositoryService */]));
PageService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__content_page_content_service__["b" /* PageContentService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__content_page_content_service__["b" /* PageContentService */]) === "function" && _b || Object])
], PageService);

var _a, _b;
//# sourceMappingURL=page.service.js.map

/***/ }),

/***/ "../../../../../src/app/web-page/web-page.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__material_material_module__ = __webpack_require__("../../../../../src/app/material/material.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__content_page_content_service__ = __webpack_require__("../../../../../src/app/web-page/content/page-content.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_page_service__ = __webpack_require__("../../../../../src/app/web-page/page/page.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__layout_layout_service__ = __webpack_require__("../../../../../src/app/web-page/layout/layout.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__layout_layout_list_layout_list_component__ = __webpack_require__("../../../../../src/app/web-page/layout/layout-list/layout-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__layout_layout_editor_layout_editor_component__ = __webpack_require__("../../../../../src/app/web-page/layout/layout-editor/layout-editor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__page_page_list_page_list_component__ = __webpack_require__("../../../../../src/app/web-page/page/page-list/page-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__page_page_editor_page_editor_component__ = __webpack_require__("../../../../../src/app/web-page/page/page-editor/page-editor.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var WebPageModule = (function () {
    function WebPageModule() {
    }
    return WebPageModule;
}());
WebPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__material_material_module__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["i" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClientModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_8__layout_layout_list_layout_list_component__["a" /* LayoutListComponent */], __WEBPACK_IMPORTED_MODULE_9__layout_layout_editor_layout_editor_component__["a" /* LayoutEditorComponent */], __WEBPACK_IMPORTED_MODULE_10__page_page_list_page_list_component__["a" /* PageListComponent */], __WEBPACK_IMPORTED_MODULE_11__page_page_editor_page_editor_component__["a" /* PageEditorComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_6__page_page_service__["a" /* PageService */], __WEBPACK_IMPORTED_MODULE_7__layout_layout_service__["a" /* LayoutService */], __WEBPACK_IMPORTED_MODULE_3__content_page_content_service__["b" /* PageContentService */]]
    })
], WebPageModule);

//# sourceMappingURL=web-page.module.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);






if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_24" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map