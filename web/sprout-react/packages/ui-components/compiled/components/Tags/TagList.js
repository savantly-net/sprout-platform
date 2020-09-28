import { __makeTemplateObject } from "tslib";
import React, { memo } from 'react';
import { cx, css } from 'emotion';
import { Tag } from './Tag';
export var TagList = memo(function (_a) {
    var tags = _a.tags, onClick = _a.onClick, className = _a.className;
    var styles = getStyles();
    return (React.createElement("span", { className: cx(styles.wrapper, className) }, tags.map(function (tag) { return (React.createElement(Tag, { key: tag, name: tag, onClick: onClick, className: styles.tag })); })));
});
var getStyles = function () {
    return {
        wrapper: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      display: flex;\n      flex: 1 1 auto;\n      flex-wrap: wrap;\n    "], ["\n      display: flex;\n      flex: 1 1 auto;\n      flex-wrap: wrap;\n    "]))),
        tag: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      margin-left: 6px;\n    "], ["\n      margin-left: 6px;\n    "]))),
    };
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=TagList.js.map