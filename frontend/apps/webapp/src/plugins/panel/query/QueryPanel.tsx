// Libraries
import { KeyValue, PanelProps } from '@savantly/sprout-api';
import { CustomScrollbar, stylesFactory } from '@savantly/sprout-ui';
import { HandlebarsViewer, LoadingIcon, MarkdownViewer } from '@sprout-platform/ui';
import axios from 'axios';
import { css, cx } from 'emotion';
import { Field, Formik, useField, useFormikContext } from 'formik';
/* eslint-disable */
import React, { Fragment, useEffect, useMemo, useState } from 'react';
/* eslint-enable */
import Datetime from 'react-datetime';
import { Alert, Button } from 'reactstrap';
import { SERVER_API_URL } from '../../../config/constants';
import { QueryParameterControl } from './editors/QueryParametersEditor';
// Types
import { QueryPanelOptions } from './types';

interface Props extends PanelProps<QueryPanelOptions> {}

export const DateField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
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
      utc={true}
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

const getFullUrl = (url: string, paramString: string) => {
  const hasQuestionMark = url && url.includes('?');
  const urlWithQuestionMark = hasQuestionMark ? url : url + '?';
  return `${urlWithQuestionMark}${paramString}`;
};

// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function validURL(str: string) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(str);
}

const RenderData = ({
  data,
  useTemplate,
  templateSource,
  dataType
}: {
  data: any;
  useTemplate: boolean;
  templateSource: string;
  dataType: string;
}) => {
  if (useTemplate && data) {
    const _templateSource =
      templateSource ||
      `<div><h3>Define a template in the configuration</h3><p>data:</p><pre>${JSON.stringify(
        { data }, // wrapping, so we may provide additional context in this object later
        null,
        2
      )}</pre></div>`;
    return <HandlebarsViewer data={{ data }} templateSource={_templateSource} />;
  } else if (!useTemplate && data) {
    let _data = data;
    if (dataType) {
      const match = dataType.toUpperCase().match(/JSON/);
      if (match && match.length > 0) {
        _data = JSON.stringify(data);
      }
    }
    return <MarkdownViewer className={cx(getStyles().content)}>{_data}</MarkdownViewer>;
  } else {
    return <LoadingIcon />;
  }
};

interface ProxyRequestPayload {
  url: string;
  headers: any;
  method: string;
}
export const QueryPanel = (props: Props) => {
  const { url, queryParameters, displayType, useTemplate, template, headers, useProxy } = props.options;
  const [data, setData] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [dataType, setDataType] = useState('');
  const [payload, setPayload] = useState(undefined as undefined | ProxyRequestPayload);
  const [error] = useState('');
  const defaultState: KeyValue = {};
  const [state, setState] = useState(defaultState);
  const paramString = buildParamString(state);

  useMemo(() => {
    if (url && (url.startsWith('/') || validURL(url))) {
      if (useProxy) {
        setTargetUrl(`${SERVER_API_URL}/api/proxy`);
      } else {
        const _targetUrl = getFullUrl(url, paramString);
        setTargetUrl(_targetUrl);
      }
    }
  }, [url, targetUrl, paramString,useProxy]);

  useMemo(() => {
    if (useProxy && targetUrl) {
      setPayload({
        url: getFullUrl(url, paramString),
        headers: JSON.parse(headers),
        method: 'GET'
      });
    } else {
      setPayload(undefined);
    }
  }, [useProxy, headers, targetUrl, url, paramString]);

  useEffect(() => {
    const fetchData = async () => {
      if (targetUrl && displayType === 'RENDER') {
        if (useProxy && payload) {
          const result = await axios.post(targetUrl, payload);
          setDataType(result.headers['content-type']);
          setData(result.data);
        } else if (!useProxy) {
          const result = await axios.get(targetUrl, {
            headers: headers ? JSON.parse(headers) : {}
          });
          setDataType(result.headers['content-type']);
          setData(result.data);
        }
      }
    };
    fetchData();
  }, [targetUrl, useProxy, displayType, payload, headers]);

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

  const styles = getStyles();

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
      {displayType === 'FRAME' && targetUrl && <iframe title="query panel iframe" src={targetUrl} className={cx(styles.content)} />}
      {displayType === 'RENDER' && targetUrl && (
        <RenderData
          data={data}
          dataType={dataType}
          templateSource={template.templateSource}
          useTemplate={useTemplate}
        />
      )}
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
