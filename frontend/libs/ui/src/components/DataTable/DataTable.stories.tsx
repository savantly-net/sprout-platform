import { Story } from '@storybook/react/types-6-0';
import React, { ComponentProps } from 'react';
import { DataTable, DataTableColumnProvider } from './DataTable';
import { demoEntityState_fetched } from '../../util/mocks/entity';
import { ProviderWrapper } from '../../util/mocks/provider';

// This default export determines where your story goes in the story list
export default {
  title: 'Data/DataTable',
  component: DataTable,
  decorators: [(story: any) => <ProviderWrapper>{story()}</ProviderWrapper>]
};

const Template: Story<ComponentProps<typeof DataTable>> = (args) => <DataTable {...args} />;

export const SimpleDataTable = Template.bind({});
SimpleDataTable.args = {
  columnProvider: new DataTableColumnProvider<any>({
    columnDescriptions: [
      {
        dataField: 'id',
        text: 'The ID'
      },
      {
        dataField: 'name',
        text: 'The Name'
      }
    ]
  }),
  entityState: demoEntityState_fetched,
  keyField: 'id'
};
