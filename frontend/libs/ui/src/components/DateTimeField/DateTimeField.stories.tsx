import { Story } from '@storybook/react/types-6-0';
import React, { ComponentProps } from 'react';
import { Form } from '../Form/Form';
import { DateTimeField } from './DateTimeField';

// This default export determines where your story goes in the story list
export default {
  title: 'Form/DateTimeField',
  component: DateTimeField,
  decorators: [
    (story: any) => (
      <Form
        initialValues={{
          email: ''
        }}
        onSubmit={(values) => {
          alert('values: ' + JSON.stringify(values, null, 2));
          console.log(values);
        }}
        submitText="Save"
      >
        <div className="m-3">{story()}</div>
      </Form>
    )
  ]
};

const Template: Story<ComponentProps<typeof DateTimeField>> = (args) => <DateTimeField {...args} />;

export const SimpleDateTimeField = Template.bind({});
SimpleDateTimeField.args = {
  label: 'My Date Field',
  name: 'date'
};

export const CustomDisplayFormat = Template.bind({});
CustomDisplayFormat.args = {
  label: 'My Date Field',
  name: 'date',
  dateDisplayFormat: 'MM/DD/YYYY',
  timeDisplayFormat: 'hh:mm:ss A'
};
