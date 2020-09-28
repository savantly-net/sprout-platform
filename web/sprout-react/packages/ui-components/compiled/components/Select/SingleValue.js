import { __assign, __makeTemplateObject } from "tslib";
import React from 'react';
import { css, cx } from 'emotion';
// Ignoring because I couldn't get @types/react-select work with Torkel's fork
// @ts-ignore
import { components } from '@torkelo/react-select';
import { useDelayedSwitch } from '../../utils/useDelayedSwitch';
import { stylesFactory, useTheme } from '../../themes';
import { SlideOutTransition } from '../transitions/SlideOutTransition';
import { FadeTransition } from '../transitions/FadeTransition';
import { Spinner } from '../Spinner/Spinner';
var getStyles = stylesFactory(function (theme) {
    var singleValue = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    label: singleValue;\n    color: ", ";\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    box-sizing: border-box;\n    max-width: 100%;\n    /* padding-right: 40px; */\n  "], ["\n    label: singleValue;\n    color: ", ";\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    box-sizing: border-box;\n    max-width: 100%;\n    /* padding-right: 40px; */\n  "])), theme.colors.formInputText);
    var container = css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    width: 16px;\n    height: 16px;\n    display: inline-block;\n    margin-right: 10px;\n    position: relative;\n    vertical-align: middle;\n    overflow: hidden;\n  "], ["\n    width: 16px;\n    height: 16px;\n    display: inline-block;\n    margin-right: 10px;\n    position: relative;\n    vertical-align: middle;\n    overflow: hidden;\n  "])));
    var item = css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    width: 100%;\n    height: 100%;\n    position: absolute;\n  "], ["\n    width: 100%;\n    height: 100%;\n    position: absolute;\n  "])));
    return { singleValue: singleValue, container: container, item: item };
});
export var SingleValue = function (props) {
    var children = props.children, data = props.data;
    var theme = useTheme();
    var styles = getStyles(theme);
    var loading = useDelayedSwitch(data.loading || false, { delay: 250, duration: 750 });
    return (React.createElement(components.SingleValue, __assign({}, props),
        React.createElement("div", { className: cx(styles.singleValue, css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n            overflow: hidden;\n          "], ["\n            overflow: hidden;\n          "])))) },
            data.imgUrl ? (React.createElement(FadeWithImage, { loading: loading, imgUrl: data.imgUrl })) : (React.createElement(SlideOutTransition, { horizontal: true, size: 16, visible: loading, duration: 150 },
                React.createElement("div", { className: styles.container },
                    React.createElement(Spinner, { className: styles.item, inline: true })))),
            !data.hideText && children)));
};
var FadeWithImage = function (props) {
    var theme = useTheme();
    var styles = getStyles(theme);
    return (React.createElement("div", { className: styles.container },
        React.createElement(FadeTransition, { duration: 150, visible: props.loading },
            React.createElement(Spinner, { className: styles.item, inline: true })),
        React.createElement(FadeTransition, { duration: 150, visible: !props.loading },
            React.createElement("img", { className: styles.item, src: props.imgUrl }))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=SingleValue.js.map