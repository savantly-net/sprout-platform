import { Story } from '@storybook/react/types-6-0';
import React, { ComponentProps, Fragment } from 'react';
import { Button } from 'reactstrap';
import { demoEntityState_fetched } from '../../util/mocks/entity';
import { ProviderWrapper } from '../../util/mocks/provider';
import { Icon } from '../Icon/Icon';
import { DataTable, DataTableColumnProvider } from './DataTable';

// This default export determines where your story goes in the story list
export default {
  title: 'Tables/DataTable',
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

export const HideActionsColumn = Template.bind({});
HideActionsColumn.args = {
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
    ],
    showActionColumn: false
  }),
  entityState: demoEntityState_fetched,
  keyField: 'id'
};

export const WithActions = Template.bind({});
WithActions.args = {
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
    ],
    onDeleteClick: (row) => console.log(`delete clicked: `, row),
    onEditClick: (row) => console.log(`edit clicked: `, row),
    onViewClick: (row) => console.log(`view clicked: `, row)
  }),
  entityState: demoEntityState_fetched,
  keyField: 'id'
};

export const WithExtraActions = Template.bind({});
WithExtraActions.args = {
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
    ],
    onDeleteClick: (row) => console.log(`delete clicked: `, row),
    onEditClick: (row) => console.log(`edit clicked: `, row),
    onViewClick: (row) => console.log(`view clicked: `, row),
    extraActions: (row) => (
      <Fragment>
        <Button color="primary" onClick={(e) => alert(`custom action clicked: ${JSON.stringify(row)}`)}>
          <Icon name="map" />
        </Button>

        <Button onClick={(e) => alert(`custom action clicked: ${JSON.stringify(row)}`)}>
          <Icon name="user" />
        </Button>
      </Fragment>
    )
  }),
  entityState: demoEntityState_fetched,
  keyField: 'id'
};
