import { __makeTemplateObject, __read, __spread } from "tslib";
import React from 'react';
import { css } from 'emotion';
import { stylesFactory } from '../../themes';
import { Button } from '../Button';
export var Pagination = function (_a) {
    var currentPage = _a.currentPage, numberOfPages = _a.numberOfPages, onNavigate = _a.onNavigate;
    var styles = getStyles();
    var pages = __spread(new Array(numberOfPages).keys());
    return (React.createElement("div", { className: styles.container },
        React.createElement("ol", null, pages.map(function (pageIndex) {
            var page = pageIndex + 1;
            var variant = page === currentPage ? 'primary' : 'secondary';
            return (React.createElement("li", { key: page, className: styles.item },
                React.createElement(Button, { size: "sm", variant: variant, onClick: function () { return onNavigate(page); } }, page)));
        }))));
};
var getStyles = stylesFactory(function () {
    return {
        container: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      float: right;\n    "], ["\n      float: right;\n    "]))),
        item: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      display: inline-block;\n      padding-left: 10px;\n      margin-bottom: 5px;\n    "], ["\n      display: inline-block;\n      padding-left: 10px;\n      margin-bottom: 5px;\n    "]))),
    };
});
var templateObject_1, templateObject_2;
//# sourceMappingURL=Pagination.js.map