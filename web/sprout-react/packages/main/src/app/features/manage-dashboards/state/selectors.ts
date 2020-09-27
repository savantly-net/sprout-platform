import { NavModel } from '@savantly/sprout-api';
import { StoreState } from '../../../types';
import { getUrl } from '../../../core/selectors/location';
import { getNavModel } from '../../../core/selectors/navModel';

export const getDashboardNavModel = (state: StoreState): NavModel => {
  const url = getUrl(state.location);
  const navModel = getNavModel(state.navIndex, 'dashboards');
  const nav = { ...navModel };
  const node = nav.main.children?.find(item => item.url === url);

  if (node) {
    nav.node = node;
  }

  if(!navModel.main.children) {
    navModel.main.children = [];
  }
  // This needs to be copied to avoid mutating the store in a selector
  nav.main.children = [...navModel.main.children];

  for (const item of nav.main.children) {
    item.active = false;

    if (item.url === nav.node.url) {
      item.active = true;
    }
  }

  return nav;
};
