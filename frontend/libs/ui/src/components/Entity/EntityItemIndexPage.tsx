import { EntityState, EntityStateProvider, NavModel, NavModelItem, TenantedEntity,BaseEntityService } from '@savantly/sprout-api';
import { css } from 'emotion';
import _ from 'lodash';
import React, { Fragment, ReactElement, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { EntityPageIconProvider, EntityPageSubTitleProvider, EntityPageTitleProvider } from '../../types';
import { Icon } from '../Icon/Icon';
import { LoadingIcon } from '../LoadingIcon/LoadingIcon';
import { RoutedEntityPage } from './RoutedEntityPage';

export interface EntityItemIndexPageProps<E> {
  titleProvider: EntityPageTitleProvider<E>;
  subTitleProvider: EntityPageSubTitleProvider<E>;
  iconProvider: EntityPageIconProvider<E>;
  entityState: EntityState<E>;
  entityStateProvider: EntityStateProvider<E>;
  entityViewer: ({ item }: { item: E }) => ReactElement;
  entityService: BaseEntityService<E>;
}

export const EntityItemIndexPage = ({
  titleProvider,
  subTitleProvider,
  iconProvider,
  entityState,
  entityStateProvider,
  entityViewer,
  entityService
}: EntityItemIndexPageProps<any>) => {
  type ItemState = TenantedEntity | undefined;
  const params = useParams();
  const itemId = params['itemId'];

  const [item, setItem] = useState(undefined as ItemState);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const Viewer = entityViewer;
  
  useMemo(() => {
    if (!entityState.isFetched && !entityState.isFetching) {
      dispatch(entityStateProvider.loadState());
    } else {
      if (!item){
        entityService.getById(itemId)
        .then((response:any) => {
          setItem(response.data);
          setError('');
        })
        .catch((err:any) => {
          setError('Item not found!');
        });
      }
    }
  }, [entityState, item, itemId, dispatch]);

  const navModelItem: NavModelItem = {
    text: titleProvider({ item, pageName: 'view' }),
    subTitle: subTitleProvider({ item, pageName: 'view' }),
    icon: iconProvider({ item, pageName: 'view' }),
    url: '.'
  };

  const navModel: NavModel = {
    main: navModelItem,
    node: navModelItem
  };

  return (
    <Fragment>
      {!item && !error && <LoadingIcon />}
      {item && (
        <RoutedEntityPage model={navModel}>
          <div
            className={css`
              display: flex;
              justify-content: end;
            `}
          >
            <NavLink to={`./edit`}  onClick={() => {setItem(undefined)}} className="btn btn-warning ml-1">
              <Icon name="pen" className="mr-1" />
              <span>Edit</span>
            </NavLink>
            <NavLink to={`./../..`} className="btn btn-info ml-1">
              <span>Back to list</span>
            </NavLink>
          </div>
          <Viewer item={item} />
        </RoutedEntityPage>
      )}

      {error && <Alert color="warning">{error}</Alert>}
    </Fragment>
  );
};
