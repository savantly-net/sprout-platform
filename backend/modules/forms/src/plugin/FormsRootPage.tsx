import { AppRootProps, NavModelItem } from '@savantly/sprout-api';
import React, { useEffect } from 'react';
import { DynamicModuleLoader } from "redux-dynamic-modules";
import FormEditor from './components/FormEditor';
import { Route, Routes, useRoutes } from 'react-router-dom';
import { getFormStateModule } from './state/FormStateModule';

interface Props extends AppRootProps { }

const TAB_CREATE = 'createForm';
const TAB_LIST = 'listForms';

export const FormsRootPage = ({ path, onNavChanged, query, meta }: Props) => {
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
  }, [meta]);

  const routes = useRoutes([
    { path: 'edit', element: <FormEditor /> },
    { path: '', element: <h1>hello from route</h1>}
  ]);

  return (
    <div>
      <DynamicModuleLoader modules={[getFormStateModule()]}>
        <h1>hello</h1>
        {routes}
        {/**
          <Route path={'edit'} element={<FormEditor />} />
          <Route path={'./'}>
            <h1>No path match</h1>
          </Route> */}
      </DynamicModuleLoader>
    </div>
  );
};
