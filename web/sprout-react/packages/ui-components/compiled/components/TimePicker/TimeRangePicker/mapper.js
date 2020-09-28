import { rangeUtil, dateTimeFormat } from '@savantly/sprout-api';
export var mapOptionToTimeRange = function (option, timeZone) {
    return rangeUtil.convertRawToRange({ from: option.from, to: option.to }, timeZone);
};
export var mapRangeToTimeOption = function (range, timeZone) {
    var from = dateTimeFormat(range.from, { timeZone: timeZone });
    var to = dateTimeFormat(range.to, { timeZone: timeZone });
    return {
        from: from,
        to: to,
        section: 3,
        display: from + " to " + to,
    };
};
//# sourceMappingURL=mapper.js.map