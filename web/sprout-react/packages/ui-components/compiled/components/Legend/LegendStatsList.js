import { __makeTemplateObject } from "tslib";
import React from 'react';
import { InlineList } from '../List/InlineList';
import { css } from 'emotion';
import { formattedValueToString } from '@grafana/data';
import capitalize from 'lodash/capitalize';
var LegendItemStat = function (_a) {
    var stat = _a.stat;
    return (React.createElement("div", { className: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        margin-left: 6px;\n      "], ["\n        margin-left: 6px;\n      "]))) },
        stat.title && capitalize(stat.title) + ":",
        " ",
        formattedValueToString(stat)));
};
LegendItemStat.displayName = 'LegendItemStat';
export var LegendStatsList = function (_a) {
    var stats = _a.stats;
    if (stats.length === 0) {
        return null;
    }
    return React.createElement(InlineList, { items: stats, renderItem: function (stat) { return React.createElement(LegendItemStat, { stat: stat }); } });
};
LegendStatsList.displayName = 'LegendStatsList';
var templateObject_1;
//# sourceMappingURL=LegendStatsList.js.map