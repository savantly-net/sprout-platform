import { BaseEntityService, EntityStateProvider, NavModel, NavModelItem, TenantedEntity } from '@savantly/sprout-api';
import { FormikHelpers } from 'formik';
import React, { ReactElement, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { EntityPageIconProvider, EntityPageSubTitleProvider, EntityPageTitleProvider } from '../../types';
import { LoadingIcon } from '../LoadingIcon/LoadingIcon';
import { RoutedEntityPage } from './RoutedEntityPage';

interface ItemEditPageProps<E extends TenantedEntity> {
  titleProvider: EntityPageTitleProvider<E>;
  subTitleProvider: EntityPageSubTitleProvider<E>;
  iconProvider: EntityPageIconProvider<E>;
  entityService: BaseEntityService<E>;
  entityStateProvider: EntityStateProvider<E>;
  editor: ({ item, afterSave }: { item: E; afterSave: (values: E, helpers: FormikHelpers<E>) => void }) => ReactElement;
}

const ItemEditPage = ({
  titleProvider,
  subTitleProvider,
  iconProvider,
  entityService,
  entityStateProvider,
  editor
}: ItemEditPageProps<any>) => {
  type ItemState = TenantedEntity | undefined;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemId = useParams().itemId;
  const [error, setError] = useState('');
  const [item, setItem] = useState(undefined as ItemState);
  const Editor = editor;

  if (!itemId) {
    setError('missing itemid url parameter');
  }

  useMemo(() => {
    if (!item) {
      entityService
        .getById(itemId)
        .then((response) => {
          setItem(response.data);
          setError('');
        })
        .catch((err) => {
          setError(err.message || err.detail || 'An error occurred while retreiving the item');
        });
    }
  }, [itemId, item]);

  const navModelItem: NavModelItem = {
    text: titleProvider({ item, pageName: 'edit' }),
    subTitle: subTitleProvider({ item, pageName: 'edit' }),
    icon: iconProvider({ item, pageName: 'edit' }),
    url: '.'
  };

  const navModel: NavModel = {
    main: navModelItem,
    node: navModelItem
  };
  return (
    <RoutedEntityPage model={navModel}>
      {error && <Alert color="warning">{error}</Alert>}
      {!item && <LoadingIcon />}
      {item && (
        <Editor
          item={item}
          afterSave={(values, helpers) => {
            dispatch(entityStateProvider.loadState());
            navigate(`../`);
          }}
        />
      )}
    </RoutedEntityPage>
  );
};

export default ItemEditPage;
