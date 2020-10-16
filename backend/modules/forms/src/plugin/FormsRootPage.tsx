import { AppRootProps, NavModelItem } from '@savantly/sprout-api';
import React, { useEffect } from 'react';
import { FormBuilder } from 'react-formio';
interface Props extends AppRootProps {}
import { cx } from 'emotion';

const TAB_ID_A = 'createForm';

export const FormsRootPage = React.memo(function FormsRootPage({ path, onNavChanged, query, meta }: Props) {
  useEffect(() => {
    const tabs: NavModelItem[] = [];
    tabs.push({
      text: 'Create Form',
      icon: 'fa fa-fw fa-file-text-o',
      url: path + '?tab=' + TAB_ID_A,
      id: TAB_ID_A,
    });

    const activeTab = query.tab || TAB_ID_A;
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
      <FormBuilder
        className={cx(`
        .panel {
          height: auto;
        }
      `)}
        form={{ display: 'form' }}
        onChange={(schema: any) => console.log(schema)}
      />
    </div>
  );
});
