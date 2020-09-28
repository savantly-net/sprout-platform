import { __assign } from "tslib";
import React from 'react';
import { ThemeContext } from '../../themes/ThemeContext';
import { getTheme } from '../../themes/index';
import { GrafanaThemeType } from '@grafana/data';
import { useDarkMode } from 'storybook-dark-mode';
var ThemeableStory = function (_a) {
    var children = _a.children, handleSassThemeChange = _a.handleSassThemeChange;
    var theme = useDarkMode() ? GrafanaThemeType.Dark : GrafanaThemeType.Light;
    handleSassThemeChange(theme);
    return React.createElement(ThemeContext.Provider, { value: getTheme(theme) }, children);
};
// Temporary solution. When we update to Storybook V5 we will be able to pass data from decorator to story
// https://github.com/storybooks/storybook/issues/340#issuecomment-456013702
export var renderComponentWithTheme = function (component, props) {
    return (React.createElement(ThemeContext.Consumer, null, function (theme) {
        return React.createElement(component, __assign(__assign({}, props), { theme: theme }));
    }));
};
export var withTheme = function (handleSassThemeChange) { return function (story) { return (React.createElement(ThemeableStory, { handleSassThemeChange: handleSassThemeChange }, story())); }; };
//# sourceMappingURL=withTheme.js.map