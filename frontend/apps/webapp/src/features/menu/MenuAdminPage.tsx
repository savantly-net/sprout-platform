import { publishErrorNotification, publishSuccessNotification } from '@savantly/sprout-api';
import { CodeEditor, Form } from '@sprout-platform/ui';
import { useField } from 'formik';
import React, { Fragment, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'reactstrap';
import Page from '../../core/components/Page/Page';
import { getNavModel } from '../../core/selectors/navModel';
import { StoreState } from '../../types';
import { menuAdminService, MenuDto } from './menuAdminService';

type internalMenuItemsStateType = MenuDto[] | undefined;

const CodeEditorField = (props: { name: string }) => {
  // this will return field props for an <input />
  const [field, meta, helpers] = useField<string>(props.name);
  return (
    <>
      <CodeEditor
        className="mt-2"
        mode={'json'}
        defaultValue={meta.value}
        minLines={50}
        height="500px"
        onChange={(val) => {
          helpers.setValue(val);
        }}
      />
      {meta.error && meta.touched && <div>{meta.error}</div>}
    </>
  );
};

export const MenuAdminPage = () => {
  const navModel = useSelector((state: StoreState) => getNavModel(state.navIndex, 'appMenu'));
  const [fetchingMenus, setFetchingMenus] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [menuItems, setMenuItems] = useState(undefined as internalMenuItemsStateType);

  const [error, setError] = useState('');

  useMemo(() => {
    if (!menuItems && !fetchingMenus && !fetchError) {
      setFetchingMenus(true);
      menuAdminService.getMenus().then((response) => {
        if (response.status !== 200) {
          setFetchError('Failed to fetch menus');
        } else {
          setMenuItems(response.data);
          setFetchingMenus(false);
        }
      });
    }
  }, [fetchingMenus, menuItems, menuAdminService, fetchError]);

  return (
    <Page navModel={navModel}>
      <Page.Contents>
        <>
          {error && <Alert color="danger">{error}</Alert>}
          {menuItems && (
            <Fragment>
              <Form
                showButtonsOnTop={true}
                showCancelButton={false}
                submitText="Save"
                initialValues={{ menuJson: JSON.stringify(menuItems, null, 2) }}
                onSubmit={(values, helpers) => {
                  console.log('submitted', values);
                  menuAdminService
                    .updateMenus(JSON.parse(values.menuJson))
                    .then((response) => {
                      publishSuccessNotification('Saved', 'Saved menu');
                    })
                    .catch((err) => {
                      setError(err.message || 'Failed to save');
                      publishErrorNotification('Failed to save', err);
                    })
                    .finally(() => {
                      helpers.setSubmitting(false);
                    });
                }}
              >
                {(props) => <CodeEditorField name="menuJson" />}
              </Form>
            </Fragment>
          )}
        </>
      </Page.Contents>
    </Page>
  );
};
