import { cx } from 'emotion';
import { ErrorMessage, Field, FieldAttributes, FormikProps, FormikValues, useFormikContext } from 'formik';
import _ from 'lodash';
import React from 'react';
import { Col, ColProps, FormGroup, Label } from 'reactstrap';

export interface FormFieldProps extends Partial<FormikProps<FormikValues>>, FieldAttributes<any>, ColProps {
  name: string;
  children?:
    | ((props: FormFieldProps) => React.ReactElement | React.ReactElement[])
    | React.ReactElement
    | React.ReactElement[];
}

export const FormField = (props: FormFieldProps) => {
  const formik = useFormikContext<FormikValues>();
  const { errors, touched } = formik;
  const { name } = props;
  const { ...colProps }: ColProps = props; 
  const isInvalid = (!!(errors as any)[name] as any) && !!(touched as any)[name];

  const renderFormikField = () => {
    return <Field className={cx(['form-control', { 'is-invalid': isInvalid }])} {...props} />;
  };

  const renderField = () => {
    const { children, ...rest } = props;
    const useFormikField = props.as === 'select' || !children || _.isArrayLike(children);
    if (useFormikField) {
      return renderFormikField();
    }
    if (children) {
      const childProps = { ...rest, ...formik };
      if (_.isFunction(children)) {
        return children(childProps);
      } else {
        return React.cloneElement(children as React.ReactElement, childProps);
      }
    } else {
      return renderFormikField();
    }
  };
  return (
    <Col {...colProps}>
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
