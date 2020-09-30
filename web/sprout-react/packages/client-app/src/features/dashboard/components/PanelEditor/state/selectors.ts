import memoizeOne from 'memoize-one';
import { LocationState } from '../../../../../types';
import { PanelPlugin } from '@savantly/sprout-api';
import { PanelEditorTab, PanelEditorTabId } from '../types';
import { getConfig } from '../../../../../core/config';

export const getPanelEditorTabs = memoizeOne((location: LocationState, plugin?: PanelPlugin) => {
  const tabs: PanelEditorTab[] = [];

  if (!plugin) {
    return tabs;
  }

  let defaultTab = PanelEditorTabId.Visualize;

  const activeTab = tabs.find(item => item.id === (location.query.tab || defaultTab)) ?? tabs[0];
  if(activeTab) {
    activeTab.active = true;
  }

  return tabs;
});
