import { Story } from '@storybook/react/types-6-0';
import React, { ComponentProps } from 'react';
import { Form } from '../Form/Form';
import { FormField, FormFieldChildProps } from './FormField';

// This default export determines where your story goes in the story list
export default {
  title: 'FormField',
  component: FormField,
  decorators: [
    (story: any) => (
      <Form
        initialValues={{
          myFieldName: '',
          email: ''
        }}
        onSubmit={(values) => {
          alert('values: ' + JSON.stringify(values, null, 2));
          console.log(values);
        }}
        submitText="Save"
      >
        {story()}
      </Form>
    )
  ]
};

const Template: Story<ComponentProps<typeof FormField>> = (args) => <FormField {...args} />;

export const SimpleFormField = Template.bind({});
SimpleFormField.args = {
  label: 'My String Field',
  name: 'myFieldName'
};

export const WithCustomInput = Template.bind({});
WithCustomInput.args = {
  label: 'Email Address',
  name: 'email',
  children: (props: FormFieldChildProps) => (
    <input type="email" name="email" value={props.values?.email} onChange={props.handleChange} />
  )
};
