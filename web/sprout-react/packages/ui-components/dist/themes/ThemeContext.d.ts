import { GrafanaTheme } from '@grafana/data';
import React from 'react';
import { Themeable } from '../types/theme';
export declare const memoizedStyleCreators: WeakMap<object, any>;
export declare const ThemeContext: React.Context<GrafanaTheme>;
export declare const withTheme: <P extends Themeable, S extends {} = {}>(Component: React.ComponentType<P>) => React.FunctionComponent<Pick<P, Exclude<keyof P, "theme">>> & S;
export declare function useTheme(): GrafanaTheme;
/**
 * Hook for using memoized styles with access to the theme.
 *
 * NOTE: For memoization to work, you need to ensure that the function
 * you pass in doesn't change, or only if it needs to. (i.e. declare
 * your style creator outside of a function component or use `useCallback()`.)
 * */
export declare function useStyles<T>(getStyles: (theme: GrafanaTheme) => T): T;
/**
 * Enables theme context  mocking
 */
export declare const mockThemeContext: (theme: Partial<GrafanaTheme>) => () => void;
