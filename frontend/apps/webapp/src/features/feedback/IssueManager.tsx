import { EntityManager, EntityPageName, ColumnDescription } from '@sprout-platform/ui';
import React from 'react';
import { StoreState } from '../../types';
import {
  IssueEntity as EntityClass,
  issueEntityService as service,
  issueStateProvider as stateProvider,
} from './entity';
import { IssueEntityEditor as Editor } from './item/editor';
import { IssueEntityViewer as Viewer } from './item/viewer';

const stateSelector = (state: StoreState) => state.issues;

const columns: Array<ColumnDescription<EntityClass>> = [
  {
    dataField: 'title',
    text: 'Title',
  },
  {
    dataField: 'description',
    text: 'Description',
  },
  {
    dataField: 'tags',
    text: 'Tags',
  },
];

const IndexPage = () => {
  return (
    <EntityManager
      entityEditor={Editor}
      entityListColumns={columns}
      entityService={service}
      entityStateProvider={stateProvider}
      entityStateSelector={stateSelector}
      entityViewer={Viewer}
      iconProvider={({ item, pageName }: { item?: EntityClass; pageName: EntityPageName }) => {
        return 'exclamation-circle';
      }}
      subTitleProvider={({ item, pageName }: { item?: EntityClass; pageName: EntityPageName }) => {
        switch (pageName) {
          case 'create':
            return 'Create a new issue';
          case 'edit':
            return '';
          case 'list':
            return 'Manage the issues';
          case 'view':
            return '';
          default:
            return '';
        }
      }}
      titleProvider={({ item, pageName }: { item?: EntityClass; pageName: EntityPageName }) => {
        switch (pageName) {
          case 'create':
            return 'Create an Issue';
          case 'edit':
            return `Editing the Issue: ${item?.title}`;
          case 'list':
            return 'All Issues';
          case 'view':
            return item?.title || '';
          default:
            return '';
        }
      }}
    />
  );
};

export default IndexPage;
