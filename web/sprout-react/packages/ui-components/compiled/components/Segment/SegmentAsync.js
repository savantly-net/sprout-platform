import { __awaiter, __generator, __read } from "tslib";
import React, { useState } from 'react';
import { cx } from 'emotion';
import _ from 'lodash';
import { SegmentSelect } from './SegmentSelect';
import { useExpandableLabel } from '.';
export function SegmentAsync(_a) {
    var _this = this;
    var value = _a.value, onChange = _a.onChange, loadOptions = _a.loadOptions, Component = _a.Component, className = _a.className, allowCustomValue = _a.allowCustomValue, placeholder = _a.placeholder;
    var _b = __read(useState(''), 2), selectPlaceholder = _b[0], setSelectPlaceholder = _b[1];
    var _c = __read(useState([]), 2), loadedOptions = _c[0], setLoadedOptions = _c[1];
    var _d = __read(useExpandableLabel(false), 4), Label = _d[0], width = _d[1], expanded = _d[2], setExpanded = _d[3];
    if (!expanded) {
        var label = _.isObject(value) ? value.label : value;
        return (React.createElement(Label, { onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                var opts;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            setSelectPlaceholder('Loading options...');
                            return [4 /*yield*/, loadOptions()];
                        case 1:
                            opts = _a.sent();
                            setLoadedOptions(opts);
                            setSelectPlaceholder(opts.length ? '' : 'No options found');
                            return [2 /*return*/];
                    }
                });
            }); }, Component: Component || (React.createElement("a", { className: cx('gf-form-label', 'query-part', !value && placeholder && 'query-placeholder', className) }, label || placeholder)) }));
    }
    return (React.createElement(SegmentSelect, { value: value && !_.isObject(value) ? { value: value } : value, options: loadedOptions, width: width, noOptionsMessage: selectPlaceholder, allowCustomValue: allowCustomValue, onClickOutside: function () {
            setSelectPlaceholder('');
            setLoadedOptions([]);
            setExpanded(false);
        }, onChange: function (item) {
            setSelectPlaceholder('');
            setLoadedOptions([]);
            setExpanded(false);
            onChange(item);
        } }));
}
//# sourceMappingURL=SegmentAsync.js.map