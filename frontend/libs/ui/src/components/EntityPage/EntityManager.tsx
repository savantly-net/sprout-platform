import { BaseEntityService, EntityState, EntityStateProvider, TenantedEntity } from '@savantly/sprout-api';
import { FormikHelpers } from 'formik';
import React, { ReactElement } from 'react';
import { ColumnDescription } from 'react-bootstrap-table-next';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { EntityPageIconProvider, EntityPageSubTitleProvider, EntityPageTitleProvider } from '../../types';
import EntityListPage from './EntityListPage';
import ItemCreatePage from './ItemCreatePage';
import ItemEditPage from './ItemEditPage';
import ItemIndexPage from './ItemIndexPage';

export interface EntityIndexPageProps<E extends TenantedEntity = any> {
  entityListColumns: Array<ColumnDescription<E>>;
  titleProvider: EntityPageTitleProvider<E>;
  subTitleProvider: EntityPageSubTitleProvider<E>;
  iconProvider: EntityPageIconProvider<E>;
  entityService: BaseEntityService<E>;
  entityStateProvider: EntityStateProvider<E>;
  entityStateSelector: (state: any) => EntityState<E>;
  entityEditor: ({
    item,
    afterSave
  }: {
    item: E;
    afterSave: (values: E, helpers: FormikHelpers<E>) => void;
  }) => ReactElement;
  entityViewer: ({ item }: { item: E }) => ReactElement;
}

const EntityManager = ({
  entityListColumns,
  titleProvider,
  subTitleProvider,
  iconProvider,
  entityService,
  entityStateProvider,
  entityStateSelector,
  entityEditor,
  entityViewer
}: EntityIndexPageProps<any>) => {
  const entityState = useSelector(entityStateSelector);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <EntityListPage
            entityListColumns={entityListColumns}
            entityService={entityService}
            entityStateProvider={entityStateProvider}
            entityStateSelector={entityStateSelector}
            iconProvider={iconProvider}
            subTitleProvider={subTitleProvider}
            titleProvider={titleProvider}
          />
        }
      />
      <Route
        path="/new"
        element={
          <ItemCreatePage
            editor={entityEditor}
            entityStateProvider={entityStateProvider}
            iconProvider={iconProvider}
            subTitleProvider={subTitleProvider}
            titleProvider={titleProvider}
          />
        }
      />
      <Route
        path="/item/:itemId"
        element={
          <ItemIndexPage
            titleProvider={titleProvider}
            subTitleProvider={subTitleProvider}
            iconProvider={iconProvider}
            entityState={entityState}
            entityStateProvider={entityStateProvider}
            entityViewer={entityViewer}
          />
        }
      />
      <Route
        path="/item/:itemId/edit"
        element={
          <ItemEditPage
            editor={entityEditor}
            titleProvider={titleProvider}
            subTitleProvider={subTitleProvider}
            iconProvider={iconProvider}
            entityService={entityService}
            entityStateProvider={entityStateProvider}
          />
        }
      />
    </Routes>
  );
};

export default EntityManager;
