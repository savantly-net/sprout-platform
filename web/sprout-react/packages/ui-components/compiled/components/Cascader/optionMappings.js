export var onChangeCascader = function (onChanged) { return function (values, options) {
    if (onChanged) {
        onChanged(values, fromRCOptions(options));
    }
}; };
export var onLoadDataCascader = function (onLoadData) { return function (options) {
    if (onLoadData) {
        onLoadData(fromRCOptions(options));
    }
}; };
var fromRCOptions = function (options) {
    return options.map(fromRCOption);
};
var fromRCOption = function (option) {
    var _a;
    return {
        value: (_a = option.value) !== null && _a !== void 0 ? _a : '',
        label: option.label,
    };
};
//# sourceMappingURL=optionMappings.js.map