import { EntityManager, EntityPageName, ColumnDescription } from '@sprout-platform/ui';
import React from 'react';
import { StoreState } from '../../types';
import {
  UserEntity as EntityClass,
  userEntityService as service,
  userStateProvider as stateProvider,
} from './entity';
import { UserEntityEditor as Editor } from './item/editor';
import { UserEntityViewer as Viewer } from './item/viewer';
import { getNavModel } from '../../core/selectors/navModel';
import { useSelector } from 'react-redux';

const stateSelector = (state: StoreState) => state.issues;

const columns: Array<ColumnDescription<EntityClass>> = [
  {
    dataField: 'firstName',
    text: 'First Name'
  }, 
  {
    dataField: 'lastName',
    text: 'Last Name'
  },
  {
    dataField: 'username',
    text: 'User Name'
  },
  {
    dataField: 'emailAddress',
    text: 'Email Address'
  },
  {
    dataField: 'displayName',
    text: 'Display Name',
  },

];

const IndexPage = () => {
  const navModel = useSelector((state: StoreState) => getNavModel(state.navIndex, 'userManagement'));


  return (
    <EntityManager
      entityEditor={Editor}
      entityListColumns={columns}
      entityService={service}
      entityStateProvider={stateProvider}
      entityStateSelector={stateSelector}
      entityViewer={Viewer}
      iconProvider={({ item, pageName }: { item?: EntityClass; pageName: EntityPageName }) => {
        return 'user-circle';
      }}
      subTitleProvider={({ item, pageName }: { item?: EntityClass; pageName: EntityPageName }) => {
        switch (pageName) {
          case 'create':
            return 'Create a new User';
          case 'edit':
            return '';
          case 'list':
            return 'Manage the Users';
          case 'view':
            return '';
          default:
            return '';
        }
      }}
      titleProvider={({ item, pageName }: { item?: EntityClass; pageName: EntityPageName }) => {
        switch (pageName) {
          case 'create':
            return 'Create an User';
          case 'edit':
            return `Editing the User: ${item?.username}`;
          case 'list':
            return 'All Users';
          case 'view':
            return item?.username || '';
          default:
            return '';
        }
      }}
    />
  );
};

export default IndexPage;
