import { Story } from '@storybook/react/types-6-0';
import { FormikValues } from 'formik';
import React, { ComponentProps, Fragment } from 'react';
import { Row } from 'reactstrap';
import { Form } from '../Form/Form';
import { FormField } from '../FormField/FormField';

// This default export determines where your story goes in the story list
export default {
  title: 'Form',
  component: Form
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
    if (!values.lastName || values.lastName.length < 3) {
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

export const MultipleRows = DefaultTemplate.bind({});
MultipleRows.args = {
  initialValues: {
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    and: '',
    more: '',
    foo: '',
    bar: '',
    data: ''
  },
  validate: (values) => {
    const errors: any = {};
    if (!values.firstName) {
      errors.firstName = 'Required';
    }
    if (!values.lastName || values.lastName.length < 3) {
      errors.lastName = 'Requires at least 3 characters';
    }
    if (!values.street) {
      errors.street = 'Required';
    }
    if (!values.city) {
      errors.city = 'Required';
    }
    if (!values.state) {
      errors.state = 'Required';
    }
    if (!values.zip) {
      errors.zip = 'Required';
    } else if (!/^\d{5}(-\d{4})?$/.test(values.zip)) {
      errors.zip = 'Please use a 5 or 9 digit zipcode'
    }
    return errors;
  },
  onSubmit: defaultOnSubmit,
  children: (
    <Fragment>
      <Row form>
        <FormField md={6} xs={12} label="First Name" name="firstName" />
        <FormField md={6} xs={12} label="Last Name" name="lastName" />
      </Row>
      <Row form>
        <FormField md={4} xs={6} label="Street Address" name="street" />
        <FormField md={3} xs={6} label="City" name="city" />
        <FormField md={2} xs={6} as="select" label="State" name="state">
          <option></option>
          <option>Alabama</option>
          <option>Alaska</option>
          <option>Arizona</option>
          <option>Arizona</option>
          <option>etc...</option>
        </FormField>
        <FormField md={3} xs={6} label="Zip" name="zip" />
      </Row>
      <Row form>
        <FormField md={3} xs={12} label="And" name="and" />
        <FormField md={3} xs={12} label="More" name="more" />
        <FormField md={2} xs={12} label="Foo" name="foo" />
        <FormField md={2} xs={12} label="Bar" name="bar" />
        <FormField md={2} xs={12} label="Data" name="data" />
      </Row>
    </Fragment>
  ),
  onCancel: () => alert('Cancel button clicked')
};
