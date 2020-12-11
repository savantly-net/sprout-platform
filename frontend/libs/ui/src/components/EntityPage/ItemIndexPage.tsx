import { EntityState, EntityStateProvider, NavModel, NavModelItem, TenantedEntity } from '@savantly/sprout-api';
import { css } from 'emotion';
import React, { ReactElement, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { EntityPageIconProvider, EntityPageSubTitleProvider, EntityPageTitleProvider } from '../../types';
import { Icon } from '../Icon/Icon';
import { LoadingIcon } from '../LoadingIcon/LoadingIcon';
import { RoutedEntityPage } from './RoutedEntityPage';

interface ItemIndexPageProps<E> {
  titleProvider: EntityPageTitleProvider<E>;
  subTitleProvider: EntityPageSubTitleProvider<E>;
  iconProvider: EntityPageIconProvider<E>;
  entityState: EntityState<E>;
  entityStateProvider: EntityStateProvider<E>;
  entityViewer: ({ item }: { item: E }) => ReactElement;
}

const ItemIndexPage = ({
  titleProvider,
  subTitleProvider,
  iconProvider,
  entityState,
  entityStateProvider,
  entityViewer
}: ItemIndexPageProps<any>) => {
  type ItemState = TenantedEntity | undefined;
  const params = useParams();
  const itemId = params['itemId'];

  const [item, setItem] = useState(undefined as ItemState);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useMemo(() => {
    if (!entityState.isFetched && !entityState.isFetching) {
      dispatch(entityStateProvider.loadState());
    } else {
      if (!item && entityState.response && !entityState.response.empty) {
        const found = entityState.response.content.filter((k) => k.itemId === itemId);
        if (found.length > 0) {
          setItem(found[0]);
        } else {
          setError('Item not found');
        }
      } else if (entityState.error) {
        setError(entityState.error);
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

  if (item) {
    return (
      <RoutedEntityPage model={navModel}>
        <div
          className={css`
            display: flex;
          `}
        >
          <NavLink to={`./edit`} className="btn btn-warning ml-auto">
            <Icon name="pen" className="mr-1" />
            <span>Edit</span>
          </NavLink>
        </div>
        {entityViewer({ item })}
      </RoutedEntityPage>
    );
  } else if (error) {
    return <Alert color="warning">{error}</Alert>;
  } else {
    return <LoadingIcon />;
  }
};

export default ItemIndexPage;
