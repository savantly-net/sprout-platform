import { EntityStateProvider, NavModel, NavModelItem, TenantedEntity } from '@savantly/sprout-api';
import { FormikHelpers } from 'formik';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EntityPageIconProvider, EntityPageSubTitleProvider, EntityPageTitleProvider } from '../../types';
import { RoutedEntityPage } from './RoutedEntityPage';

export interface EntityItemCreatePageProps<E extends TenantedEntity> {
  titleProvider: EntityPageTitleProvider<E>;
  subTitleProvider: EntityPageSubTitleProvider<E>;
  iconProvider: EntityPageIconProvider<E>;
  entityStateProvider: EntityStateProvider<E>;
  editor: ({ item, afterSave }: { item: E; afterSave: (values: E, helpers: FormikHelpers<E>) => void }) => ReactElement;
}

export const EntityItemCreatePage = ({
  iconProvider,
  subTitleProvider,
  titleProvider,
  entityStateProvider,
  editor
}: EntityItemCreatePageProps<any>) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navModelItem: NavModelItem = {
    text: titleProvider({ pageName: 'create' }),
    subTitle: subTitleProvider({ pageName: 'create' }),
    url: '.',
    icon: iconProvider({ pageName: 'create' })
  };

  const navModel: NavModel = {
    main: navModelItem,
    node: navModelItem
  };
  return (
    <RoutedEntityPage model={navModel}>
      {editor({
        item: entityStateProvider.props.initialState.example,
        afterSave: (values) => {
          dispatch(entityStateProvider.loadState());
          navigate(`../item/${values.itemId}`);
        }
      })}
    </RoutedEntityPage>
  );
};
