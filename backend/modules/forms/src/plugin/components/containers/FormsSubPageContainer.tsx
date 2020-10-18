import { AppPluginMeta, NavModelItem } from '@savantly/sprout-api';
import React, { useEffect } from 'react';
import { Outlet, Route, Routes, useParams } from 'react-router-dom';
import FormEditor from '../FormEditor';
import CreateFormPage from '../pages/CreateFormPage';
import FormListPage from '../pages/FormListPage';
import InfoPage from '../pages/InfoPage';

interface Props {
    path: string;
    onNavChanged: Function;
    meta: AppPluginMeta;
}

const TAB_CREATE = 'create';
const TAB_LIST = 'list';
const TAB_DEFAULT = 'default';

export const FormsSubPageContainer = ({ path, onNavChanged, meta }: Props) => {
  const params = useParams();

  useEffect(() => {
    const tabs: NavModelItem[] = [];
    tabs.push({
      text: 'Info',
      icon: 'fa fa-fw fa-file-text-o',
      url: '',
      id: TAB_DEFAULT,
    });
    tabs.push({
      text: 'List Forms',
      icon: 'fa fa-fw fa-file-text-o',
      url: TAB_LIST,
      id: TAB_LIST,
    });
    tabs.push({
      text: 'Edit Form',
      icon: 'fa fa-fw fa-file-text-o',
      url: 'form/123/edit',
      id: 'edit',
    });
    tabs.push({
      text: 'Create Forms',
      icon: 'fa fa-fw fa-file-text-o',
      url: TAB_CREATE,
      id: TAB_CREATE,
    });

    const activeTab = params['*'] || TAB_DEFAULT;
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
  }, [meta, params]);

  return (
    <div>
        <Routes>
          <Route path='/*' element={<Outlet />}>
            <Route path='list' element={<FormListPage />} />
            <Route path='create' element={<CreateFormPage />} />
            <Route path='form/:formId/edit' element={<FormEditor />} />
            <Route path='*' element={<InfoPage />} />
          </Route>
        </Routes>
    </div>
  );
};
