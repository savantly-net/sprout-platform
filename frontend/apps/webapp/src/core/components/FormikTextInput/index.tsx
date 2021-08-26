import { FieldProps } from 'formik';
import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

import './styles.scss';

interface Props {
  label?: string;
}

const FormikTextInput: React.FC<FieldProps> = ({ field, form }) => (
  <FormControl>
    <FormLabel className="FormikTextInput__label">{field.name}</FormLabel>
    <Input
      placeholder="Issue Description"
      onChange={(e: any) => form.setFieldValue(field.name, e.target.value)}
      onBlur={field.onBlur}
      name={field.name}
      value={field.value}
    />
  </FormControl>
);

export default FormikTextInput;
