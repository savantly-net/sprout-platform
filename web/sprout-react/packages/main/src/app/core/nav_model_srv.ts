import config from './config';
import _ from 'lodash';
import { NavModel } from '@grafana/data';

export class NavModelSrv {
  navItems: any;

  /** @ngInject */
  constructor() {
    this.navItems = config.bootData.navTree;
  }

  getCfgNode() {
    return _.find(this.navItems, { id: 'cfg' });
  }

  getNav(...args: Array<string | number>) {
    let children = this.navItems;
    const nav: NavModel = {
      breadcrumbs: new Array<any>(),
      main: {
          text: 'home'
      },
      node: {
          text: 'Home'
      }
    };

    for (const id of args) {
      // if its a number then it's the index to use for main
      if (_.isNumber(id) && nav.breadcrumbs && nav.breadcrumbs[id]) {
        nav.main = nav.breadcrumbs[id];
        break;
      }

      const node: any = _.find(children, { id: id });
      nav.breadcrumbs?.push(node);
      nav.node = node;
      nav.main = node;
      children = node.children;
    }

    if (nav.main.children) {
      for (const item of nav.main.children) {
        item.active = false;

        if (item.url === nav.node.url) {
          item.active = true;
        }
      }
    }

    return nav;
  }

  getNotFoundNav() {
    return getNotFoundNav(); // the exported function
  }
}

export function getNotFoundNav(): NavModel {
  return getWarningNav('Page not found', '404 Error');
}

export function getWarningNav(text: string, subTitle?: string): NavModel {
  const node = {
    text,
    subTitle,
    icon: 'exclamation-triangle',
  };
  return {
    breadcrumbs: [node],
    node: node,
    main: node,
  };
}