import { cx } from 'emotion';
import { ErrorMessage, Field, FieldAttributes, useFormikContext } from 'formik';
import React, { Fragment } from 'react';

export const ValidatedFormField = (props: FieldAttributes<any>): any => {
  const formik = useFormikContext();
  const { errors, touched } = formik;
  const { name } = props;
  const isInvalid = !!(errors as any)[name] as any && !!(touched as any)[name];
  return (
    <Fragment>
      <Field className={cx(['form-control', { 'is-invalid': isInvalid }])} {...props} />
      {isInvalid && <ErrorMessage name={name} className="text-error" />}
    </Fragment>
  );
};
