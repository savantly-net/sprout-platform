import { FieldProps } from 'formik';
import React from 'react';
import { Select } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/react';

import './styles.scss';

interface Props {
  options: Array<any>;
  label: string;
}

const FormikMultiSelect: React.FC<FieldProps & Props> = ({ label, options, field, form }) => (
  <FormControl>
    {/* {console.log(field, " ssssssssss")}
    {console.log(options, " options")} */}
    <FormLabel className="FormikSelect__label">{label || field.name}</FormLabel>
    <Select isMulti
      name={field.name}
      // selectedOptionColor="SYSTEM" 
      value={options ? options.find((option) => option.value === field.value) : console.log(field.value, "sss")}
      onChange={(option: any) => form.setFieldValue(field.name, option.target.value)}
      // onChange={(option: any) => form.setFieldValue(field.name, option.value)}
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

export default FormikMultiSelect;
