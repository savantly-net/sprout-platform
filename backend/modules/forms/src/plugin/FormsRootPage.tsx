import { AppRootProps, NavModelItem } from '@savantly/sprout-api';
import React, { useEffect } from 'react';
import { DynamicModuleLoader } from "redux-dynamic-modules";
import FormEditor from './components/FormEditor';
import { Route, Switch } from 'react-router-dom';
import { getFormStateModule } from './state/FormStateModule';
import { RouteComponentProps } from "react-router-dom";

interface Props extends AppRootProps, RouteComponentProps { }

const TAB_CREATE = 'createForm';
const TAB_LIST = 'listForms';

export const FormsRootPage = React.memo(function FormsRootPage({ path, onNavChanged, query, meta }: Props) {
  useEffect(() => {
    const tabs: NavModelItem[] = [];
    tabs.push({
      text: 'List Forms',
      icon: 'fa fa-fw fa-file-text-o',
      url: path + '?tab=' + TAB_LIST,
      id: TAB_LIST,
    });
    tabs.push({
      text: 'Create Forms',
      icon: 'fa fa-fw fa-file-text-o',
      url: path + '?tab=' + TAB_CREATE,
      id: TAB_CREATE,
    });

    const activeTab = query.tab || TAB_LIST;
    tabs.forEach(tab => (tab.active = activeTab === tab.id));

    const node = {
      text: 'Form Management',
      img: `${meta.baseUrl}/${meta.info.logos.large}`,
      subTitle: 'Create and delete forms for the website',
      url: path,
      children: tabs,
    };

    // Update the page header
    onNavChanged({
      node: node,
      main: node,
    });
  }, [meta, onNavChanged, path, query.tab]);

  return (
    <div>
      <DynamicModuleLoader modules={[getFormStateModule()]}>
          <Route exact path={path + '/edit'} component={FormEditor} />
          <Route path={path}>
            <h1>No path match</h1>
          </Route>
      </DynamicModuleLoader>
    </div>
  );
});
