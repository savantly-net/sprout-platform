import { publishErrorNotification, publishSuccessNotification } from '@savantly/sprout-api';
import { CodeEditor, Form } from '@sprout-platform/ui';
import { useField } from 'formik';
import React, { Fragment, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'reactstrap';
import Page from '../../core/components/Page/Page';
import { getNavModel } from '../../core/selectors/navModel';
import { StoreState } from '../../types';
import DragAndDropMenuBuilder from './DragAndDropMenuBuilder';
import { menuAdminService, MenuDto } from './menuAdminService';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

export type internalMenuItemsStateType = MenuDto[] | undefined;

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

  const fetchMenuItems = async () => {
    setFetchingMenus(true);
    menuAdminService.getMenus().then((response) => {
      if (response.status !== 200) {
        setFetchError('Failed to fetch menus');
      } else {
        let sortArray  = response.data;
        if(sortArray.length > 0){
          setMenuItems(sortArray.sort((next:any , prev:any) => (next.weight - prev.weight)));
        }else{
          setMenuItems(response.data);
        }
        // setMenuItems(response.data);
        setFetchingMenus(false);
      }
    });
  };

  const deleteMenuItem = async (menuItem: MenuDto) => {
    const response = await menuAdminService.deleteMenu(menuItem);
    fetchMenuItems();
  };

  useMemo(() => {
    if (!menuItems && !fetchingMenus && !fetchError) {
      fetchMenuItems();
    }
  }, [fetchingMenus, menuItems, menuAdminService, fetchError]);

  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

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
                  menuAdminService
                    .updateMenus(tabIndex === 0 ? menuItems : JSON.parse(values.menuJson))
                    .then((response) => {
                      publishSuccessNotification('Saved', 'Saved menu');
                      fetchMenuItems();
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
                <Tabs align="center" index={tabIndex} onChange={handleTabsChange}>
                  <TabList>
                    <Tab>Drag'n'Drop</Tab>
                    <Tab>Advanced</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      {menuItems && (
                        <DragAndDropMenuBuilder
                          menuItems={menuItems}
                          tabIndex={tabIndex}
                          setMenuItems={setMenuItems}
                          deleteMenuItem={deleteMenuItem}
                        />
                      )}
                    </TabPanel>
                    <TabPanel>
                      <p>
                        <CodeEditorField name="menuJson" />
                      </p>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Form>
            </Fragment>
          )}
        </>
      </Page.Contents>
    </Page>
  );
};
