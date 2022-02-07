import { FieldProps } from 'formik';
import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

import './styles.scss';

const FormikCommonTextInput: React.FC<FieldProps> = ({ field, form }) => (
  <FormControl>
    <FormLabel className="FormikTextInput__label">{field.name}</FormLabel>
    <Input
      placeholder={field.name}
      onChange={(e: any) => form.setFieldValue(field.name, e.target.value)}
      onBlur={field.onBlur}
      name={field.name}
      type={field.name === 'email' ? 'email': field.name === 'password' ? 'password':''}
      value={ field.value || "" }
    />
  </FormControl>
);

export default FormikCommonTextInput;
