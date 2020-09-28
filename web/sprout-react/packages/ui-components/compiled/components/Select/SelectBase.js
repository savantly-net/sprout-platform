import { __assign, __makeTemplateObject, __read, __spread } from "tslib";
import React, { useCallback } from 'react';
// @ts-ignore
import { default as ReactSelect } from '@torkelo/react-select';
// @ts-ignore
import Creatable from '@torkelo/react-select/creatable';
// @ts-ignore
import { default as ReactAsyncSelect } from '@torkelo/react-select/async';
// @ts-ignore
import { default as AsyncCreatable } from '@torkelo/react-select/async-creatable';
import { Icon } from '../Icon/Icon';
import { css, cx } from 'emotion';
import resetSelectStyles from './resetSelectStyles';
import { SelectMenu, SelectMenuOptions } from './SelectMenu';
import { IndicatorsContainer } from './IndicatorsContainer';
import { ValueContainer } from './ValueContainer';
import { InputControl } from './InputControl';
import { DropdownIndicator } from './DropdownIndicator';
import { SelectOptionGroup } from './SelectOptionGroup';
import { SingleValue } from './SingleValue';
import { MultiValueContainer, MultiValueRemove } from './MultiValue';
import { useTheme } from '../../themes';
import { getSelectStyles } from './getSelectStyles';
import { cleanValue } from './utils';
var renderExtraValuesIndicator = function (props) {
    var maxVisibleValues = props.maxVisibleValues, selectedValuesCount = props.selectedValuesCount, menuIsOpen = props.menuIsOpen, showAllSelectedWhenOpen = props.showAllSelectedWhenOpen;
    if (maxVisibleValues !== undefined &&
        selectedValuesCount > maxVisibleValues &&
        !(showAllSelectedWhenOpen && menuIsOpen)) {
        return (React.createElement("span", { key: "excess-values", id: "excess-values" },
            "(+",
            selectedValuesCount - maxVisibleValues,
            ")"));
    }
    return null;
};
var CustomControl = function (props) {
    var children = props.children, innerProps = props.innerProps, _a = props.selectProps, menuIsOpen = _a.menuIsOpen, onMenuClose = _a.onMenuClose, onMenuOpen = _a.onMenuOpen, isFocused = props.isFocused, isMulti = props.isMulti, getValue = props.getValue, innerRef = props.innerRef;
    var selectProps = props.selectProps;
    if (selectProps.renderControl) {
        return React.createElement(selectProps.renderControl, {
            isOpen: menuIsOpen,
            value: isMulti ? getValue() : getValue()[0],
            ref: innerRef,
            onClick: menuIsOpen ? onMenuClose : onMenuOpen,
            onBlur: onMenuClose,
            disabled: !!selectProps.disabled,
            invalid: !!selectProps.invalid,
        });
    }
    return (React.createElement(InputControl, { ref: innerRef, innerProps: innerProps, prefix: selectProps.prefix, focused: isFocused, invalid: !!selectProps.invalid, disabled: !!selectProps.disabled }, children));
};
export function SelectBase(_a) {
    var _b = _a.allowCustomValue, allowCustomValue = _b === void 0 ? false : _b, _c = _a.autoFocus, autoFocus = _c === void 0 ? false : _c, _d = _a.backspaceRemovesValue, backspaceRemovesValue = _d === void 0 ? true : _d, cacheOptions = _a.cacheOptions, className = _a.className, _e = _a.closeMenuOnSelect, closeMenuOnSelect = _e === void 0 ? true : _e, components = _a.components, defaultOptions = _a.defaultOptions, defaultValue = _a.defaultValue, _f = _a.disabled, disabled = _f === void 0 ? false : _f, filterOption = _a.filterOption, formatCreateLabel = _a.formatCreateLabel, getOptionLabel = _a.getOptionLabel, getOptionValue = _a.getOptionValue, inputValue = _a.inputValue, invalid = _a.invalid, _g = _a.isClearable, isClearable = _g === void 0 ? false : _g, _h = _a.isLoading, isLoading = _h === void 0 ? false : _h, _j = _a.isMulti, isMulti = _j === void 0 ? false : _j, isOpen = _a.isOpen, isOptionDisabled = _a.isOptionDisabled, _k = _a.isSearchable, isSearchable = _k === void 0 ? true : _k, loadOptions = _a.loadOptions, _l = _a.loadingMessage, loadingMessage = _l === void 0 ? 'Loading options...' : _l, _m = _a.maxMenuHeight, maxMenuHeight = _m === void 0 ? 300 : _m, maxVisibleValues = _a.maxVisibleValues, _o = _a.menuPlacement, menuPlacement = _o === void 0 ? 'auto' : _o, menuPosition = _a.menuPosition, _p = _a.noOptionsMessage, noOptionsMessage = _p === void 0 ? 'No options found' : _p, onBlur = _a.onBlur, onChange = _a.onChange, onCloseMenu = _a.onCloseMenu, onCreateOption = _a.onCreateOption, onInputChange = _a.onInputChange, onKeyDown = _a.onKeyDown, onOpenMenu = _a.onOpenMenu, _q = _a.openMenuOnFocus, openMenuOnFocus = _q === void 0 ? false : _q, _r = _a.options, options = _r === void 0 ? [] : _r, _s = _a.placeholder, placeholder = _s === void 0 ? 'Choose' : _s, prefix = _a.prefix, renderControl = _a.renderControl, _t = _a.showAllSelectedWhenOpen, showAllSelectedWhenOpen = _t === void 0 ? true : _t, _u = _a.tabSelectsValue, tabSelectsValue = _u === void 0 ? true : _u, value = _a.value, width = _a.width;
    var theme = useTheme();
    var styles = getSelectStyles(theme);
    var onChangeWithEmpty = useCallback(function (value) {
        if (isMulti && (value === undefined || value === null)) {
            return onChange([]);
        }
        onChange(value);
    }, [isMulti, value, onChange]);
    var ReactSelectComponent = ReactSelect;
    var creatableProps = {};
    var asyncSelectProps = {};
    var selectedValue = [];
    if (isMulti && loadOptions) {
        selectedValue = value;
    }
    else {
        // If option is passed as a plain value (value property from SelectableValue property)
        // we are selecting the corresponding value from the options
        if (isMulti && value && Array.isArray(value) && !loadOptions) {
            // @ts-ignore
            selectedValue = value.map(function (v) {
                return options.filter(function (o) {
                    return v === o.value || o.value === v.value;
                })[0];
            });
        }
        else if (loadOptions) {
            var hasValue = defaultValue || value;
            selectedValue = hasValue ? [hasValue] : [];
        }
        else {
            selectedValue = cleanValue(value, options);
        }
    }
    var commonSelectProps = {
        autoFocus: autoFocus,
        backspaceRemovesValue: backspaceRemovesValue,
        captureMenuScroll: false,
        closeMenuOnSelect: closeMenuOnSelect,
        defaultValue: defaultValue,
        // Also passing disabled, as this is the new Select API, and I want to use this prop instead of react-select's one
        disabled: disabled,
        filterOption: filterOption,
        getOptionLabel: getOptionLabel,
        getOptionValue: getOptionValue,
        inputValue: inputValue,
        invalid: invalid,
        isClearable: isClearable,
        // Passing isDisabled as react-select accepts this prop
        isDisabled: disabled,
        isLoading: isLoading,
        isMulti: isMulti,
        isOptionDisabled: isOptionDisabled,
        isSearchable: isSearchable,
        maxMenuHeight: maxMenuHeight,
        maxVisibleValues: maxVisibleValues,
        menuIsOpen: isOpen,
        menuPlacement: menuPlacement,
        menuPosition: menuPosition,
        menuShouldScrollIntoView: false,
        onBlur: onBlur,
        onChange: onChangeWithEmpty,
        onInputChange: onInputChange,
        onKeyDown: onKeyDown,
        onMenuClose: onCloseMenu,
        onMenuOpen: onOpenMenu,
        openMenuOnFocus: openMenuOnFocus,
        options: options,
        placeholder: placeholder,
        prefix: prefix,
        renderControl: renderControl,
        showAllSelectedWhenOpen: showAllSelectedWhenOpen,
        tabSelectsValue: tabSelectsValue,
        value: isMulti ? selectedValue : selectedValue[0],
    };
    if (allowCustomValue) {
        ReactSelectComponent = Creatable;
        creatableProps.formatCreateLabel = formatCreateLabel !== null && formatCreateLabel !== void 0 ? formatCreateLabel : (function (input) { return "Create: " + input; });
        creatableProps.onCreateOption = onCreateOption;
    }
    // Instead of having AsyncSelect, as a separate component we render ReactAsyncSelect
    if (loadOptions) {
        ReactSelectComponent = allowCustomValue ? AsyncCreatable : ReactAsyncSelect;
        asyncSelectProps = {
            loadOptions: loadOptions,
            cacheOptions: cacheOptions,
            defaultOptions: defaultOptions,
        };
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(ReactSelectComponent, __assign({ components: __assign({ MenuList: SelectMenu, Group: SelectOptionGroup, ValueContainer: ValueContainer, Placeholder: function (props) { return (React.createElement("div", __assign({}, props.innerProps, { className: cx(css(props.getStyles('placeholder', props)), css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n                  display: inline-block;\n                  color: ", ";\n                  position: absolute;\n                  top: 50%;\n                  transform: translateY(-50%);\n                  box-sizing: border-box;\n                  line-height: 1;\n                "], ["\n                  display: inline-block;\n                  color: ", ";\n                  position: absolute;\n                  top: 50%;\n                  transform: translateY(-50%);\n                  box-sizing: border-box;\n                  line-height: 1;\n                "])), theme.colors.formInputPlaceholderText)) }), props.children)); }, IndicatorsContainer: function (props) {
                    var selectProps = props.selectProps;
                    var value = selectProps.value, showAllSelectedWhenOpen = selectProps.showAllSelectedWhenOpen, maxVisibleValues = selectProps.maxVisibleValues, menuIsOpen = selectProps.menuIsOpen;
                    if (maxVisibleValues !== undefined) {
                        var selectedValuesCount = value.length;
                        var indicatorChildren = __spread(props.children);
                        indicatorChildren.splice(-1, 0, renderExtraValuesIndicator({
                            maxVisibleValues: maxVisibleValues,
                            selectedValuesCount: selectedValuesCount,
                            showAllSelectedWhenOpen: showAllSelectedWhenOpen,
                            menuIsOpen: menuIsOpen,
                        }));
                        return React.createElement(IndicatorsContainer, __assign({}, props, { children: indicatorChildren }));
                    }
                    return React.createElement(IndicatorsContainer, __assign({}, props));
                }, IndicatorSeparator: function () { return React.createElement(React.Fragment, null); }, Control: CustomControl, Option: SelectMenuOptions, ClearIndicator: function (props) {
                    var clearValue = props.clearValue;
                    return (React.createElement(Icon, { name: "times", onMouseDown: function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            clearValue();
                        } }));
                }, LoadingIndicator: function (props) {
                    return React.createElement(Icon, { className: "fa-spin", name: "fa fa-spinner" });
                }, LoadingMessage: function (props) {
                    return React.createElement("div", { className: styles.loadingMessage }, loadingMessage);
                }, NoOptionsMessage: function (props) {
                    return (React.createElement("div", { className: styles.loadingMessage, "aria-label": "No options provided" }, noOptionsMessage));
                }, DropdownIndicator: function (props) { return React.createElement(DropdownIndicator, { isOpen: props.selectProps.menuIsOpen }); }, SingleValue: SingleValue, MultiValueContainer: MultiValueContainer, MultiValueRemove: MultiValueRemove }, components), styles: __assign(__assign({}, resetSelectStyles()), { menuPortal: function (_a) {
                    var position = _a.position, width = _a.width;
                    return ({
                        position: position,
                        width: width,
                        zIndex: theme.zIndex.dropdown,
                    });
                }, 
                //These are required for the menu positioning to function
                menu: function (_a) {
                    var top = _a.top, bottom = _a.bottom, position = _a.position;
                    return ({
                        top: top,
                        bottom: bottom,
                        position: position,
                        marginBottom: !!bottom ? '10px' : '0',
                        minWidth: '100%',
                        zIndex: theme.zIndex.dropdown,
                    });
                }, container: function () { return ({
                    position: 'relative',
                    width: width ? 8 * width + "px" : '100%',
                }); }, option: function (provided, state) { return (__assign(__assign({}, provided), { opacity: state.isDisabled ? 0.5 : 1 })); } }), className: className }, commonSelectProps, creatableProps, asyncSelectProps))));
}
var templateObject_1;
//# sourceMappingURL=SelectBase.js.map