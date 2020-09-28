import { __read, __spread } from "tslib";
import { LegendList } from './LegendList';
import { LegendTable } from './LegendTable';
import tinycolor from 'tinycolor2';
export var generateLegendItems = function (numberOfSeries, statsToDisplay) {
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    return __spread(new Array(numberOfSeries)).map(function (item, i) {
        return {
            label: alphabet[i].toUpperCase() + "-series",
            color: tinycolor.fromRatio({ h: i / alphabet.length, s: 1, v: 1 }).toHexString(),
            isVisible: true,
            yAxis: 1,
            displayValues: statsToDisplay || [],
        };
    });
};
export var LegendDisplayMode;
(function (LegendDisplayMode) {
    LegendDisplayMode["List"] = "list";
    LegendDisplayMode["Table"] = "table";
})(LegendDisplayMode || (LegendDisplayMode = {}));
export { LegendList, LegendTable };
//# sourceMappingURL=Legend.js.map