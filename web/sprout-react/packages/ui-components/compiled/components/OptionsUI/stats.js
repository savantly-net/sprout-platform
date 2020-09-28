import React from 'react';
import { ReducerID } from '@savantly/sprout-api';
import { StatsPicker } from '../StatsPicker/StatsPicker';
export var StatsPickerEditor = function (_a) {
    var value = _a.value, onChange = _a.onChange;
    return React.createElement(StatsPicker, { stats: value, onChange: onChange, allowMultiple: false, defaultStat: ReducerID.mean });
};
//# sourceMappingURL=stats.js.map