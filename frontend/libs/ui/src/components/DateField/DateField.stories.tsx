import { Story } from '@storybook/react/types-6-0';
import React, { ComponentProps } from 'react';
import { Form } from '../Form/Form';
import { DateField } from './DateField';

// This default export determines where your story goes in the story list
export default {
  title: 'Form/DateField',
  component: DateField,
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

const Template: Story<ComponentProps<typeof DateField>> = (args) => <DateField {...args} />;

export const SimpleDateField = Template.bind({});
SimpleDateField.args = {
  label: 'My Date Field',
  name: 'date'
};

export const CustomDateFormat = Template.bind({});
CustomDateFormat.args = {
  label: 'My Date Field',
  name: 'date',
  dateFormat: 'MM/DD/YYYY'
};
