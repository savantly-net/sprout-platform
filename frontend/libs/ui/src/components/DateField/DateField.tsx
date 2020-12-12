import { css, cx } from 'emotion';
import { useField, useFormikContext } from 'formik';
import React, { Fragment } from 'react';
import Datetime, { DatetimepickerProps } from 'react-datetime';

export interface DateFieldProps extends DatetimepickerProps {
  name: string;
  label: string;
  dateFormat?: string;
}

export const DateField = ({ name, label, dateFormat = 'YYYY-MM-DD', ...dateControlProps }: DateFieldProps) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);
  return (
    <Fragment>
      <div
        key={field.name}
        className={cx(
          'col',
          css`
            flex-direction: column;
            display: inline-grid;
          `
        )}
      >
        <small>{label}</small>
        <Datetime
          {...field}
          {...dateControlProps}
          value={(field.value && new Date(field.value)) || null}
          onChange={(val: moment.Moment | string) => {
            if (field.value !== val) {
              if (typeof val === 'string') {
                setFieldValue(field.name, val);
              } else {
                setFieldValue(field.name, val.format(dateFormat));
              }
            }
          }}
          closeOnSelect={true}
          dateFormat={dateFormat}
          timeFormat={false}
        />
      </div>
    </Fragment>
  );
};
