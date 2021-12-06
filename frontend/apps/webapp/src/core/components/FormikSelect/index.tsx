import { FieldProps } from 'formik';
import React from 'react';
import { Select } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/react';

import './styles.scss';

interface Props {
  options: Array<any>;
  label: string;
}

const FormikSelect: React.FC<FieldProps & Props> = ({ label, options, field, form }) => (
  <FormControl>
    <FormLabel className="FormikSelect__label">{label || field.name}</FormLabel>
    <Select
      name={field.name}
      value={options ? options.find((option) => option.value === field.value) : ''}
      onChange={(option: any) => form.setFieldValue(field.name, option.value)}
      onBlur={field.onBlur}
      width="max-content"
    >
      {options.map(({ value }) => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </Select>
  </FormControl>
);

export default FormikSelect;
