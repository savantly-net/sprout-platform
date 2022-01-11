import { IconName, stylesFactory, Tab, TabContent, TabsBar } from '@sprout-platform/ui';
import { css } from 'emotion';
import React from 'react';
import config from '../../../../core/config';
import { DashboardModel } from '../../state';
import { PanelModel } from '../../state/PanelModel';
import { PanelEditorTab } from './types';

interface PanelEditorTabsProps {
  panel: PanelModel;
  dashboard: DashboardModel;
  tabs: PanelEditorTab[];
  onChangeTab: (tab: PanelEditorTab) => void;
}

export const PanelEditorTabs: React.FC<PanelEditorTabsProps> = ({ panel, dashboard, tabs, onChangeTab }) => {
  const styles = getPanelEditorTabsStyles();
  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <TabsBar className={styles.tabBar}>
        {tabs.map(tab => {
          return (
            <Tab
              css={null}
              key={tab.id}
              label={tab.text}
              active={tab.active}
              onChangeTab={() => onChangeTab(tab)}
              icon={tab.icon as IconName}
            />
          );
        })}
      </TabsBar>
      <TabContent className={`${styles.tabContent} panel-editor-tab-content`}>
        <div>TODO: add editor?</div>
      </TabContent>
    </div>
  );
};

const getPanelEditorTabsStyles = stylesFactory(() => {
  const { theme } = config;

  return {
    wrapper: css`
      display: flex;
      flex-direction: column;
      height: 100%;
    `,
    tabBar: css`
      padding-left: ${theme.spacing.md};
    `,
    tabContent: css`
      padding: 0;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      min-height: 0;
      background: ${theme.colors.panelBg};
      border-right: 1px solid ${theme.colors.pageHeaderBorder};

      .toolbar {
        background: transparent;
      }
    `,
  };
});
