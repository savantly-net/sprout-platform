import { FieldProps } from 'formik';
/* eslint-disable */
import React from 'react';
/* eslint-enable */
import { FormControl, FormLabel, Textarea } from '@chakra-ui/react';

import './styles.scss';

interface Props {
  label?: string;
}

const FormikTextArea: React.FC<FieldProps & Props> = ({ label, field, form }) => (
  <FormControl>
    <FormLabel className="FormikTextArea__label">{label || field.name}</FormLabel>
    <Textarea
      placeholder="Issue Description"
      onChange={(e: any) => form.setFieldValue(field.name, e.target.value)}
      onBlur={field.onBlur}
      name={field.name}
      value={field.value}
    />
  </FormControl>
);

export default FormikTextArea;
