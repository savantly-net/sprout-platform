import { Story } from '@storybook/react/types-6-0';
import React, { ComponentProps, Fragment } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { DemoEntityService, demoEntityStateProvider, demoEntityState_fetched } from '../../util/mocks/entity';
import { ProviderWrapper } from '../../util/mocks/provider';
import { EntityManager } from './EntityManager';

const NavMe = () => {
  const navigtate = useNavigate();
  return <Button onClick={() => navigtate('test/')}>click me</Button>;
};

// This default export determines where your story goes in the story list
export default {
  title: 'Entity/EntityIndexPage',
  component: EntityManager,
  decorators: [
    (story: any) => {
      return (
        <ProviderWrapper>
          <Fragment>
            <NavMe />
            <Routes>
              <Route path="/test/*">{story()}</Route>
            </Routes>
          </Fragment>
        </ProviderWrapper>
      );
    }
  ]
};

const Template: Story<ComponentProps<typeof EntityManager>> = (args) => <EntityManager {...args} />;

export const SimpleEntityIndexPage = Template.bind({});
SimpleEntityIndexPage.args = {
  entityListColumns: [
    {
      dataField: 'id',
      text: 'The ID'
    },
    {
      dataField: 'name',
      text: 'The Name'
    }
  ],
  entityEditor: ({ item, afterSave }) => <div>some fancy editor here: {JSON.stringify(item)}</div>,
  entityService: new DemoEntityService(),
  entityStateProvider: demoEntityStateProvider,
  entityStateSelector: (state) => demoEntityState_fetched,
  entityViewer: ({ item }) => <div>some fancy editor here: {JSON.stringify(item)}</div>,
  iconProvider: ({ item, pageName }) => 'id-card',
  subTitleProvider: ({ item, pageName }) => 'the subtitle',
  titleProvider: ({ item, pageName }) => 'The Title'
};
