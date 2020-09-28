import { __assign } from "tslib";
import { GrafanaThemeType } from '@grafana/data';
import hoistNonReactStatics from 'hoist-non-react-statics';
import React, { useContext, useEffect } from 'react';
import { getTheme } from './getTheme';
import { stylesFactory } from './stylesFactory';
/**
 * Mock used in tests
 */
var ThemeContextMock = null;
// Used by useStyles()
export var memoizedStyleCreators = new WeakMap();
// Use Grafana Dark theme by default
export var ThemeContext = React.createContext(getTheme(GrafanaThemeType.Dark));
ThemeContext.displayName = 'ThemeContext';
export var withTheme = function (Component) {
    var WithTheme = function (props) {
        /**
         * If theme context is mocked, let's use it instead of the original context
         * This is used in tests when mocking theme using mockThemeContext function defined below
         */
        var ContextComponent = ThemeContextMock || ThemeContext;
        // @ts-ignore
        return React.createElement(ContextComponent.Consumer, null, function (theme) { return React.createElement(Component, __assign({}, props, { theme: theme })); });
    };
    WithTheme.displayName = "WithTheme(" + Component.displayName + ")";
    hoistNonReactStatics(WithTheme, Component);
    return WithTheme;
};
export function useTheme() {
    return useContext(ThemeContextMock || ThemeContext);
}
/**
 * Hook for using memoized styles with access to the theme.
 *
 * NOTE: For memoization to work, you need to ensure that the function
 * you pass in doesn't change, or only if it needs to. (i.e. declare
 * your style creator outside of a function component or use `useCallback()`.)
 * */
export function useStyles(getStyles) {
    var theme = useTheme();
    var memoizedStyleCreator = memoizedStyleCreators.get(getStyles);
    if (!memoizedStyleCreator) {
        memoizedStyleCreator = stylesFactory(getStyles);
        memoizedStyleCreators.set(getStyles, memoizedStyleCreator);
    }
    useEffect(function () {
        return function () {
            memoizedStyleCreators.delete(getStyles);
        };
    }, [getStyles]);
    return memoizedStyleCreator(theme);
}
/**
 * Enables theme context  mocking
 */
export var mockThemeContext = function (theme) {
    ThemeContextMock = React.createContext(theme);
    return function () {
        ThemeContextMock = null;
    };
};
//# sourceMappingURL=ThemeContext.js.map