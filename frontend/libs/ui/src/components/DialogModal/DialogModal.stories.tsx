import { Story } from '@storybook/react/types-6-0';
import React, { ComponentProps, Fragment } from 'react';
import { Button } from 'reactstrap';
import { DateField } from '../DateField/DateField';
import { FormField } from '../FormField/FormField';
import { DialogModal, openDialog } from './DialogModal';

// This default export determines where your story goes in the story list
export default {
  title: 'Notification/DialogModal',
  component: DialogModal
};

const Template: Story<ComponentProps<typeof DialogModal>> = (args) => (
  <Fragment>
    <Button
      onClick={() => {
        openDialog(args)
          .then((response) => {
            console.log('confirmed: ', response);
          })
          .catch((err) => {
            console.error(err);
          });
      }}
    >
      Open Dialog
    </Button>
  </Fragment>
);

export const SimpleDialog = Template.bind({});
SimpleDialog.args = {
    initialValue: {
        name: ''
    },
    body: () => (
        <Fragment>
            <FormField name="name" label="Name" />
        </Fragment>
    )
}

export const DialogWithSelect = Template.bind({});
DialogWithSelect.args = {
    initialValue: {
        name: '',
        address: '',
        state: '',
        date: undefined
    },
    body: () => (
        <Fragment>
            <FormField name="name" label="Name" />
            <FormField name="address" label="Address" />
            <FormField name="state" label="State" as="select">
                <option>Texas</option>
                <option>Other</option>
                <option>etc..</option>
            </FormField>
            <DateField name="date" label="Select Date" />
        </Fragment>
    )
}

