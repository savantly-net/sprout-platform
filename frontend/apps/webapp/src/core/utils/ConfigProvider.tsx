import React from 'react';
import { config, SproutBootConfig } from '@savantly/sprout-runtime';
import { ThemeContext, getTheme } from '@sprout-platform/ui';
import { GrafanaThemeType } from '@savantly/sprout-api';

export const ConfigContext = React.createContext<SproutBootConfig>(config);
export const ConfigConsumer = ConfigContext.Consumer;

export const provideConfig = (component: React.ComponentType<any>) => {
  const ConfigProvider = (props: any) => (
    <ConfigContext.Provider value={config}>
      {React.createElement(component, {...props})}
    </ConfigContext.Provider>
  );

  return ConfigProvider;
};

export const getCurrentThemeName = () =>
  config.bootData.user.lightTheme ? GrafanaThemeType.Light : GrafanaThemeType.Dark;

export const getCurrentTheme = () => getTheme(getCurrentThemeName());

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigConsumer>
      {config => {
        return <ThemeContext.Provider value={getCurrentTheme()}>{children}</ThemeContext.Provider>;
      }}
    </ConfigConsumer>
  );
};

export const provideTheme = (Component: React.ComponentType<any>) => {
  return provideConfig((props: any) => 
    <ThemeProvider>
      <Component { ...props }/>
    </ThemeProvider>);
};
