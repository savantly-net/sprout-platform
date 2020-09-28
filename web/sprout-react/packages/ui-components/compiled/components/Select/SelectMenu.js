import { __assign } from "tslib";
import React from 'react';
import { useTheme } from '../../themes/ThemeContext';
import { getSelectStyles } from './getSelectStyles';
import { cx } from 'emotion';
import { Icon } from '../Icon/Icon';
import { CustomScrollbar } from '../CustomScrollbar/CustomScrollbar';
export var SelectMenu = React.forwardRef(function (props, ref) {
    var theme = useTheme();
    var styles = getSelectStyles(theme);
    var children = props.children, maxHeight = props.maxHeight, innerRef = props.innerRef, innerProps = props.innerProps;
    return (React.createElement("div", __assign({}, innerProps, { className: styles.menu, ref: innerRef, style: { maxHeight: maxHeight }, "aria-label": "Select options menu" }),
        React.createElement(CustomScrollbar, { autoHide: false, autoHeightMax: "inherit", hideHorizontalTrack: true }, children)));
});
SelectMenu.displayName = 'SelectMenu';
export var SelectMenuOptions = React.forwardRef(function (props, ref) {
    var theme = useTheme();
    var styles = getSelectStyles(theme);
    var children = props.children, innerProps = props.innerProps, data = props.data, renderOptionLabel = props.renderOptionLabel, isSelected = props.isSelected, isFocused = props.isFocused;
    return (React.createElement("div", __assign({ ref: ref, className: cx(styles.option, isFocused && styles.optionFocused) }, innerProps, { "aria-label": "Select option" }),
        data.imgUrl && React.createElement("img", { className: styles.optionImage, src: data.imgUrl }),
        React.createElement("div", { className: styles.optionBody },
            React.createElement("span", null, renderOptionLabel ? renderOptionLabel(data) : children),
            data.description && React.createElement("div", { className: styles.optionDescription }, data.description)),
        isSelected && (React.createElement("span", null,
            React.createElement(Icon, { name: "check" })))));
});
//# sourceMappingURL=SelectMenu.js.map