import { Story } from '@storybook/react/types-6-0';
import React, { ComponentProps } from 'react';
import { DemoEntityService, demoEntityState_fetched } from '../../util/mocks/entity';
import { ProviderWrapper } from '../../util/mocks/provider';
import { EntityPage } from './EntityPage';

// This default export determines where your story goes in the story list
export default {
  title: 'Tables/EntityPage',
  component: EntityPage,
  decorators: [(story: any) => <ProviderWrapper>{story()}</ProviderWrapper>]
};

const Template: Story<ComponentProps<typeof EntityPage>> = (args) => <EntityPage {...args} />;

export const SimpleEntityPage = Template.bind({});
SimpleEntityPage.args = {
  entityState: demoEntityState_fetched,
  columndescriptions: [
    {
      dataField: 'id',
      text: 'The ID'
    },
    {
      dataField: 'name',
      text: 'The Name'
    }
  ],
  entityEditor: ({entity, save, cancel}) => <div>some fancy editor here: {JSON.stringify(entity)}</div>,
  entityService: new DemoEntityService()
};
