// Libraries
import { KeyValue, PanelProps } from '@savantly/sprout-api';
import { CustomScrollbar, stylesFactory } from '@savantly/sprout-ui';
import { HandlebarsViewer, LoadingIcon } from '@sprout-platform/ui';
import { css, cx } from 'emotion';
import { Field, Formik, useField, useFormikContext } from 'formik';
import React, { Fragment, useState } from 'react';
import Datetime from 'react-datetime';
import { Alert, Button } from 'reactstrap';
import { QueryParameterControl } from './editors/QueryParametersEditor';
import axios from 'axios';
// Types
import { QueryPanelOptions } from './types';

interface Props extends PanelProps<QueryPanelOptions> {}

export const DateField = ({ ...props }) => {
  const { setFieldValue, values } = useFormikContext();
  const [field] = useField(props as any);
  return (
    <Datetime
      {...field}
      {...props}
      value={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        if (field.value !== val) {
          if (typeof val === 'string') {
            setFieldValue(field.name, val);
          } else {
            setFieldValue(field.name, val.format('YYYY-MM-DD'));
          }
        }
      }}
      closeOnSelect={true}
      dateFormat="YYYY-MM-DD"
      timeFormat={false}
    />
  );
};

const buildParamString = (values: KeyValue) => {
  return (
    '&' +
    Object.keys(values)
      .map((value) => {
        return `${value}=${values[value]}`;
      })
      .join('&')
  );
};

const renderChoiceControl = (control: QueryParameterControl) => {
  return (
    <div
      key={control.id}
      className={cx(
        'col',
        css`
          flex-direction: column;
          display: inline-grid;
        `
      )}
    >
      <small>{control.label}</small>
      <Field as="select" name={control.id} className="form-control">
        {control.options &&
          control.options.choices &&
          control.options.choices.map((choice) => (
            <option key={choice.value} value={choice.value}>
              {choice.name}
            </option>
          ))}
      </Field>
    </div>
  );
};

const renderDateControl = (control: QueryParameterControl) => {
  return (
    <div
      key={control.id}
      className={cx(
        'col',
        css`
          flex-direction: column;
          display: inline-grid;
        `
      )}
    >
      <small>{control.label}</small>
      <DateField name={control.id} />
    </div>
  );
};

const renderTextControl = (control: QueryParameterControl) => {
  return (
    <div
      key={control.id}
      className={cx(
        'col',
        css`
          flex-direction: column;
          display: inline-grid;
        `
      )}
    >
      <small>{control.label}</small>
      <Field name={control.id} className="form-control" />
    </div>
  );
};

export const QueryPanel = (props: Props) => {
  const { url, queryParameters, useTemplate, template } = props.options;
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const defaultState: KeyValue = {};
  const [state, setState] = useState(defaultState);
  const paramString = buildParamString(state);

  const getInitialValues = (): KeyValue => {
    const valueMap: KeyValue = {};
    queryParameters.controls.map((control) => {
      valueMap[control.id] = control.defaultValue;
    });
    return valueMap;
  };

  const getFormControls = () => {
    const formControlList: any[] = [];
    queryParameters.controls.map((control) => {
      if (control.type === 'CHOICE') {
        formControlList.push(renderChoiceControl(control));
      } else if (control.type === 'DATE') {
        formControlList.push(renderDateControl(control));
      } else {
        formControlList.push(renderTextControl(control));
      }
    });
    return formControlList;
  };

  const getFullUrl = () => {
    const hasQuestionMark = url && url.includes('?');
    const urlWithQuestionMark = hasQuestionMark ? url : url + '?';
    return `${urlWithQuestionMark}${paramString}`;
  };

  const styles = getStyles();

  const loadData = () => {
    axios
      .get(getFullUrl(), {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'application/json'
        }
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch data.');
      });
  };

  const iframeOrTemplate = () => {
    if (useTemplate && data) {
      return <HandlebarsViewer data={data} templateSource={template.templateSource} />;
    } else if (useTemplate) {
      loadData();
      return <LoadingIcon />;
    } else {
      return <iframe src={getFullUrl()} className={cx(styles.content)} />;
    }
  };

  if (error) {
    return <Alert color="warning">{error}</Alert>;
  }

  return (
    <CustomScrollbar autoHeightMin="100%">
      {queryParameters.controls && queryParameters.controls.length > 0 && (
        <Fragment>
          <Formik
            initialValues={getInitialValues()}
            onSubmit={(values) => {
              console.log(`submitted: ${values}`);
            }}
          >
            {({ values }) => (
              <form className="form-inline">
                {getFormControls()}
                <div>
                  <Button
                    className="mt-auto"
                    onClick={() => {
                      setState(values);
                    }}
                  >
                    Update
                  </Button>
                </div>
              </form>
            )}
          </Formik>
          <hr />
        </Fragment>
      )}
      {url && iframeOrTemplate()}
    </CustomScrollbar>
  );
};

const getStyles = stylesFactory(() => {
  return {
    content: css`
      height: 100%;
      border: none;
    `
  };
});
