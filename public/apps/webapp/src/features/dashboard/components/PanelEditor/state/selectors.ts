import memoizeOne from 'memoize-one';
import { PanelPlugin, urlUtil } from '@savantly/sprout-api';
import { PanelEditorTab, PanelEditorTabId } from '../types';
import { getConfig } from '../../../../../core/config';

export const getPanelEditorTabs = memoizeOne((plugin?: PanelPlugin) => {
  const tabs: PanelEditorTab[] = [];

  if (!plugin) {
    return tabs;
  }

  const queryParams = urlUtil.getUrlSearchParams();

  let defaultTab = PanelEditorTabId.Visualize;

  const activeTab = tabs.find(item => item.id === (queryParams.tab || defaultTab)) ?? tabs[0];
  if(activeTab) {
    activeTab.active = true;
  }

  return tabs;
});
