import { Story } from '@storybook/react/types-6-0';
import React, { ComponentProps, Fragment } from 'react';
import { Form } from '../Form/Form';
import { FormField, FormFieldProps } from './FormField';

// This default export determines where your story goes in the story list
export default {
  title: 'Form/FormField',
  component: FormField,
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
        {story()}
      </Form>
    )
  ]
};

const Template: Story<ComponentProps<typeof FormField>> = (args) => <FormField {...args} />;

export const SimpleFormField = Template.bind({});
SimpleFormField.args = {
  label: 'My String Field',
  name: 'email'
};

export const WithCustomInput = Template.bind({});
WithCustomInput.args = {
  label: 'Email Address',
  name: 'email',
  children: (props: FormFieldProps) => (
    <input type="email" name="email" value={props.values?.email} onChange={props.handleChange} />
  )
};

export const WithSelect = Template.bind({});
WithSelect.args = {
  label: 'Select one',
  name: 'email',
  as: 'select',
  children: (
    <Fragment>
      <option></option>
      <option>him@example.com</option>
      <option>her@example.com</option>
    </Fragment>
  )
};
