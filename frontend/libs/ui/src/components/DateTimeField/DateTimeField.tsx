import { dateTime } from '@savantly/sprout-api';
import { css, cx } from 'emotion';
import { useField, useFormikContext } from 'formik';
import React, { Fragment } from 'react';
import Datetime, { DatetimepickerProps } from 'react-datetime';

export interface DateTimeFieldProps extends Omit<DatetimepickerProps, 'dateFormat' | 'timeFormat' | 'value'> {
  name: string;
  label: string;
  dateValueFormat?: string;
  timeValueFormat?: string;
  dateDisplayFormat?: string;
  timeDisplayFormat?: string;
  dateTimeValueSeparator?: string;
}

interface DateTimeWrapperProps {
  onChange: ((value: string | moment.Moment) => void) | undefined;
  dateControlProps: DatetimepickerProps;
  value?: string;
  dateFormat: string;
  timeFormat: string;
}

const DateTimeWrapper = ({ dateControlProps, onChange, value, dateFormat, timeFormat }: DateTimeWrapperProps) => {
  return (
    <Datetime
      {...dateControlProps}
      value={value}
      onChange={onChange}
      closeOnSelect={true}
      dateFormat={dateFormat}
      timeFormat={timeFormat}
    />
  );
};

export const DateTimeField = ({
  name,
  label,
  dateValueFormat = 'YYYY-MM-DD',
  timeValueFormat = 'HH:mm:ssZ',
  dateDisplayFormat = 'YYYY-MM-DD',
  timeDisplayFormat = 'hh:mm:ss A',
  dateTimeValueSeparator = 'T',
  onChange,
  ...dateControlProps
}: DateTimeFieldProps) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const formatInternalValue = (val: moment.Moment | string) => {
    if (typeof val === 'string') {
      const _value = dateTime(val) || dateTime();
      return _value.format(`${dateValueFormat}${dateTimeValueSeparator}${timeValueFormat}`);
    } else {
      return val.format(`${dateValueFormat}${dateTimeValueSeparator}${timeValueFormat}`);
    }
  };

  const _pickerOnChange = (val: moment.Moment | string) => {
    if (field.value !== val) {
      setFieldValue(field.name, formatInternalValue(val));
    }
  };

  const formatDisplayValue = () => {
    if (typeof field.value === 'string') {
      console.log('formatting value', field.value);
      const _value = dateTime(field.value) || dateTime();
      return _value.format(`${dateDisplayFormat} ${timeDisplayFormat}`);
    } else {
      return undefined;
    }
  };

  const displayValue = formatDisplayValue();

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
        <DateTimeWrapper
          onChange={_pickerOnChange}
          dateFormat={dateDisplayFormat}
          timeFormat={timeDisplayFormat}
          value={displayValue}
          dateControlProps={dateControlProps}
        />
      </div>
    </Fragment>
  );
};
