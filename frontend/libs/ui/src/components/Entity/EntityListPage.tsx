import {
  BaseEntityService,
  EntityState,
  EntityStateProvider,
  NavModel,
  NavModelItem,
  TenantedEntity
} from '@savantly/sprout-api';
import React, { useMemo } from 'react';
import { ColumnDescription } from 'react-bootstrap-table-next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EntityPageIconProvider, EntityPageSubTitleProvider, EntityPageTitleProvider } from '../../types';
import { DataTable, DataTableColumnProvider } from '../DataTable/DataTable';
import { RoutedEntityPage } from './RoutedEntityPage';

export interface EntityListPageProps<E extends TenantedEntity = any> {
  entityListColumns: Array<ColumnDescription<E>>;
  titleProvider: EntityPageTitleProvider<E>;
  subTitleProvider: EntityPageSubTitleProvider<E>;
  iconProvider: EntityPageIconProvider<E>;
  entityService: BaseEntityService<E>;
  entityStateProvider: EntityStateProvider<E>;
  entityStateSelector: (state: any) => EntityState<E>;
}

export const EntityListPage = ({
  entityListColumns,
  titleProvider,
  subTitleProvider,
  iconProvider,
  entityService,
  entityStateProvider,
  entityStateSelector
}: EntityListPageProps<any>) => {
  const state = useSelector(entityStateSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useMemo(() => {
    if (!state.isFetched && !state.isFetching) {
      dispatch(entityStateProvider.loadState());
    }
  }, [state, dispatch]);

  const navModelItem: NavModelItem = {
    text: titleProvider({ pageName: 'list' }),
    subTitle: subTitleProvider({ pageName: 'list' }),
    icon: iconProvider({ pageName: 'list' }),
    url: './'
  };

  const navModel: NavModel = {
    main: navModelItem,
    node: navModelItem
  };

  return (
    <RoutedEntityPage model={navModel}>
      <div>
        <DataTable
          onCreateClick={() => navigate('./new')}
          columnProvider={
            new DataTableColumnProvider<any>({
              columnDescriptions: [...entityListColumns],
              deleteModalProps: {
                onClose: (result) => {}
              },
              onEditClick: (row) => {
                navigate(`./item/${row.itemId}/edit`);
              },
              onDeleteClick: (row) => {
                if (row.itemId) {
                  entityService.delete(row.itemId).then(() => {
                    dispatch(entityStateProvider.loadState());
                  });
                }
              },
              onViewClick: (row) => {
                navigate(`./item/${row.itemId}`);
              }
            })
          }
          entityState={state}
        />
      </div>
    </RoutedEntityPage>
  );
};
