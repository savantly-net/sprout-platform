import { __makeTemplateObject, __read, __spread } from "tslib";
import React from 'react';
import { number, select } from '@storybook/addon-knobs';
import { List } from './List';
import { css, cx } from 'emotion';
import tinycolor from 'tinycolor2';
import { InlineList } from './InlineList';
export default {
    title: 'Layout/List',
    component: List,
};
var generateListItems = function (numberOfItems) {
    return __spread(new Array(numberOfItems)).map(function (item, i) {
        return {
            name: "Item-" + i,
            id: "item-" + i,
        };
    });
};
var getStoriesKnobs = function (inline) {
    if (inline === void 0) { inline = false; }
    var numberOfItems = number('Number of items', 3);
    var rawRenderer = function (item) { return React.createElement(React.Fragment, null, item.name); };
    var customRenderer = function (item, index) { return (React.createElement("div", { className: cx([
            css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          color: white;\n          font-weight: bold;\n          background: ", ";\n          padding: 10px;\n        "], ["\n          color: white;\n          font-weight: bold;\n          background: ", ";\n          padding: 10px;\n        "])), tinycolor.fromRatio({ h: index / 26, s: 1, v: 1 }).toHexString()),
            inline
                ? css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n              margin-right: 20px;\n            "], ["\n              margin-right: 20px;\n            "]))) : css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n              margin-bottom: 20px;\n            "], ["\n              margin-bottom: 20px;\n            "]))),
        ]) }, item.name)); };
    var itemRenderer = select('Item rendered', {
        'Raw renderer': 'raw',
        'Custom renderer': 'custom',
    }, 'raw');
    return {
        numberOfItems: numberOfItems,
        renderItem: itemRenderer === 'raw' ? rawRenderer : customRenderer,
    };
};
export var basic = function () {
    var _a = getStoriesKnobs(), numberOfItems = _a.numberOfItems, renderItem = _a.renderItem;
    return React.createElement(List, { items: generateListItems(numberOfItems), renderItem: renderItem });
};
export var inline = function () {
    var _a = getStoriesKnobs(true), numberOfItems = _a.numberOfItems, renderItem = _a.renderItem;
    return React.createElement(InlineList, { items: generateListItems(numberOfItems), renderItem: renderItem });
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=List.story.internal.js.map