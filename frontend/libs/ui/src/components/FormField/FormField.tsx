import { cx } from 'emotion';
import { ErrorMessage, Field, FieldAttributes, FieldProps, FormikProps, FormikValues, useFormikContext } from 'formik';
import _ from 'lodash';
import React, { HTMLAttributes } from 'react';
import { Col, ColProps, FormGroup, Label } from 'reactstrap';

export interface FormFieldProps extends Partial<FormikProps<FormikValues>>, FieldAttributes<any> {
  name: string;
  wrapperProps?: ColProps;
  formGroupProps?: HTMLAttributes<HTMLDivElement>;
  labelProps?: HTMLAttributes<HTMLLabelElement>;
  children?:
    | ((props: FieldProps & HTMLAttributes<any>) => React.ReactElement | React.ReactElement[])
    | React.ReactElement
    | React.ReactElement[];
}

export const FormField = (props: FormFieldProps) => {
  const formik = useFormikContext<FormikValues>();
  const { errors, touched } = formik;
  const { name, className, wrapperProps, formGroupProps, labelProps, children, ...rest } = props;
  const isInvalid = (!!(errors as any)[name] as any) && !!(touched as any)[name];

  const renderField = () => {
    if (children) {
      if (_.isFunction(children)) {
        return (
          <Field name={name} className={cx(['form-control', { 'is-invalid': isInvalid }])} {...rest}>
            {(childProps: FieldProps) => children(childProps)}
          </Field>
        );
      } else {
        return (
          <Field
            name={name}
            className={cx(['form-control', { 'is-invalid': isInvalid }])}
            {...rest}
            children={children}
          />
        );
      }
    } else return <Field name={name} className={cx(['form-control', { 'is-invalid': isInvalid }])} {...rest} />;
  };

  return (
    <Col {...wrapperProps}>
      <FormGroup {...formGroupProps}>
        {props.label && <Label {...labelProps}>{props.label}</Label>}
        {renderField()}
        {isInvalid && (
          <ErrorMessage name={name} render={(errorMessage) => <small className="text-danger">{errorMessage}</small>} />
        )}
      </FormGroup>
    </Col>
  );
};
