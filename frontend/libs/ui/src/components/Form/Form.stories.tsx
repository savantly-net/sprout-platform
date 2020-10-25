import { Story } from '@storybook/react/types-6-0';
import { FormikValues } from 'formik';
import React, { ComponentProps } from 'react';
import { Row } from 'reactstrap';
import { Form } from '../Form/Form';
import { FormField } from '../FormField/FormField';

// This default export determines where your story goes in the story list
export default {
  title: 'Form',
  component: Form,
};

const DefaultTemplate: Story<ComponentProps<typeof Form>> = (args) => <Form {...args} />;

const defaultOnSubmit = (
  values: FormikValues,
  { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
) => {
  setSubmitting(true);
  // simulating delay
  setTimeout(() => {
    alert('values: ' + JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 500);
};

export const simpleForm = DefaultTemplate.bind({});
simpleForm.args = {
  initialValues: {
    testField: ''
  },
  onSubmit: defaultOnSubmit,
  children: (
    <Row form>
      <FormField label="test label" name="testField" />
    </Row>
  ),
  onCancel: () => alert('Cancel button clicked')
};

export const withValidation = DefaultTemplate.bind({});
withValidation.args = {
  initialValues: {
    firstName: '',
    lastName: ''
  },
  validate: (values) => {
    const errors: any = {};
    if (!values.firstName) {
      errors.firstName = 'Required';
    }
    if(!values.lastName || values.lastName.length < 3) {
        errors.lastName = 'Requires at least 3 characters';
    }
    return errors;
  },
  onSubmit: defaultOnSubmit,
  children: (
    <Row form>
      <FormField label="First Name" name="firstName" />
      <FormField label="Last Name" name="lastName" />
    </Row>
  ),
  onCancel: () => alert('Cancel button clicked')
};
