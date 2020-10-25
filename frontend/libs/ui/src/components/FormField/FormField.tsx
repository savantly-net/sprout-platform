import { cx } from 'emotion';
import { ErrorMessage, Field, FormikProps, FormikValues, useFormikContext } from 'formik';
import _ from 'lodash';
import React from 'react';
import { Col, FormGroup, Label } from 'reactstrap';

export type FormFieldChildProps = Partial<FormikProps<FormikValues>>;

export interface FormFieldProps extends FormFieldChildProps {
  label?: string;
  name: string;
  children?: ((props: FormFieldChildProps) => React.ReactElement) | React.ReactElement;
}

export const FormField = (props: FormFieldProps) => {
  const formik = useFormikContext<FormikValues>();
  const { errors, touched } = formik;
  const { name } = props;
  const isInvalid = (!!(errors as any)[name] as any) && !!(touched as any)[name];
  const renderField = () => {
    const { children, ...rest } = props;
    if (children) {
      const childProps = {...rest, ...formik};
      if (_.isFunction(children)) {
        return children(childProps);
      } else {
        return React.cloneElement(children, childProps);
      }
    } else {
      return (
        <Field className={cx(['form-control', { 'is-invalid': isInvalid }])} name={props.name}/>
      );
    }
  };
  return (
    <Col>
      <FormGroup>
        {props.label && <Label>{props.label}</Label>}
        {renderField()}
        {isInvalid && (
          <ErrorMessage name={name} render={(errorMessage) => <small className="text-danger">{errorMessage}</small>} />
        )}
      </FormGroup>
    </Col>
  );
};
