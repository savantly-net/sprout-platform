import { AppPluginMeta, NavModelItem } from '@savantly/sprout-api';
import React, { useEffect } from 'react';
import { Outlet, Route, Routes, useParams } from 'react-router-dom';
import { FormIndex } from './pages/form';
import CreateFormPage from './pages/form/CreateFormPage';
import InfoPage from './pages/info/InfoPage';

interface Props {
  path: string;
  onNavChanged: Function;
  meta: AppPluginMeta;
}

const TAB_CREATE = 'create';
const TAB_LIST = 'form';
const TAB_DEFAULT = 'info';

export const FormsSubPageContainer = ({ path, onNavChanged, meta }: Props) => {
  const params = useParams();
  const formSubPagesMatch = window.location.pathname.match(/.*\/savantly-forms-module\/form.*$/)?.length;

  /* eslint-disable */
  useEffect(() => {
    // eslint
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
      text: 'Create Forms',
      icon: 'fa fa-fw fa-file-text-o',
      url: TAB_CREATE,
      id: TAB_CREATE,
    });

    let activeTab = params['*'] || TAB_DEFAULT;
    if (formSubPagesMatch) {
      activeTab = TAB_LIST;
    }
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
  /* eslint-enable */

  return (
    <div>
      <Routes>
        <Route path="/" element={<InfoPage />} />
        <Route path="/form/*" element={<FormIndex />} />
        <Route path="/create" element={<CreateFormPage />} />
      </Routes>
      <Outlet />
    </div>
  );
};
