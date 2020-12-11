import { Story } from '@storybook/react/types-6-0';
import { css } from 'emotion';
import { FieldProps } from 'formik';
import React, { ComponentProps, Fragment } from 'react';
import { Form } from '../Form/Form';
import { FormField } from './FormField';

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
  children: (props: FieldProps) => (
    <input type="email" name="email" value={props.field.value} onChange={props.form.handleChange} />
  )
};

export const WithCustomComponentProps = Template.bind({});
WithCustomComponentProps.args = {
  label: 'Email Address',
  name: 'email',
  wrapperProps: {
    className: css`
      padding: 0;
    `
  },
  labelProps: {
    className: css`
      color: blue;
    `
  },
  formGroupProps: {
    className: css`
      border: green solid 2px;
    `
  },
  children: (props: FieldProps) => (
    <input
      className="form-control"
      type="email"
      name="email"
      value={props.field.value}
      onChange={props.form.handleChange}
    />
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
