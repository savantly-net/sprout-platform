// Libraries
import { KeyValue, PanelProps } from '@savantly/sprout-api';
import { CustomScrollbar } from '@savantly/sprout-ui';
// import { CustomScrollbar, stylesFactory } from '@savantly/sprout-ui';
import { HandlebarsViewer, LoadingIcon } from '@sprout-platform/ui';
import axios from 'axios';
import { css, cx } from 'emotion';
import { Field, Formik, useField, useFormikContext } from 'formik';
import { JSONPath } from 'jsonpath-plus';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import Datetime from 'react-datetime';
import { Alert, Button } from 'reactstrap';
import { SERVER_API_URL } from '../../../config/constants';
import { QueryParameterControl } from './editors/QueryParametersEditor';
// Types
import { TablePanelOptions } from './types';

interface Props extends PanelProps<TablePanelOptions> {}

const DateField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  // const { setFieldValue, values } = useFormikContext();
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

const extractColumns = ({ rows }: { rows: any[] }): ColumnDescription[] => {
  console.log(`extracting columns from `, rows);
  if (rows && rows[0]) {
    const result: ColumnDescription[] = [];
    Object.keys(rows[0]).map((k) => {
      result.push({
        dataField: k,
        text: k,
        sort: true
      });
    });
    return result;
  } else {
    return [
      {
        dataField: 'dummy',
        isDummyField: true,
        text: 'error extracting columns'
      }
    ];
  }
};

const RenderData = ({ data, dataType, jsonDataPath }: { data: any; dataType: string; jsonDataPath: string }) => {
  if (data) {
    const { ExportCSVButton } = CSVExport;
    let columns: ColumnDescription[] = [];
    let _data = data;
    if (dataType) {
      const match = dataType.toUpperCase().match(/JSON/);
      if (match && match.length > 0) {
        const extractedRowCollection = JSONPath({ path: jsonDataPath, json: data });
        console.log(`extracted data from JSONPath:`, extractedRowCollection);
        if (extractedRowCollection) {
          _data = extractedRowCollection;
        }
        columns = extractColumns({ rows: _data as any[] });
        console.log(`extracted columns: `, columns);
      }
    }
    return (
      <Fragment>
        <ToolkitProvider keyField={'id'} data={_data} columns={columns} exportCSV>
          {(props) => (
            <div>
              <ExportCSVButton className="btn btn-info" {...props.csvProps}>
                Export CSV
              </ExportCSVButton>
              <hr />
              <BootstrapTable {...props.baseProps} striped hover condensed />
            </div>
          )}
        </ToolkitProvider>
      </Fragment>
    );
  } else {
    return <LoadingIcon />;
  }
};

const RenderHeader = ({ data, dataType, templateSource }: { data: any; dataType: string; templateSource: string }) => {
  if (data && templateSource) {
    let _data = {};
    const match = dataType.toUpperCase().match(/JSON/);
    if (match && match.length > 0) {
      _data = data;
    }
    return <HandlebarsViewer data={_data} templateSource={templateSource} />;
  } else {
    return <div></div>;
  }
};

interface ProxyRequestPayload {
  url: string;
  headers: any;
  method: string;
}
export const TablePanel = (props: Props) => {
  const { url, queryParameters, headerTemplate, headers, useProxy, jsonDataPath } = props.options;
  const [data, setData] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [dataType, setDataType] = useState('');
  const [payload, setPayload] = useState(undefined as undefined | ProxyRequestPayload);
  const [error] = useState('');
  // const [error, setError] = useState('');
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
  }, [url, paramString,useProxy]);

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
      if (targetUrl) {
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
  }, [targetUrl, useProxy, payload, headers]);

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

  // const styles = getStyles();

  if (error) {
    return <Alert color="warning">{error}</Alert>;
  }

  return (
    <CustomScrollbar autoHeightMin="100%">
      {queryParameters && queryParameters.controls && queryParameters.controls.length > 0 && (
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
      {targetUrl && headerTemplate && headerTemplate.templateSource && (
        <RenderHeader data={data} dataType={dataType} templateSource={headerTemplate.templateSource} />
      )}
      {targetUrl && <RenderData data={data} dataType={dataType} jsonDataPath={jsonDataPath || '$.rows.*'} />}
    </CustomScrollbar>
  );
};

// const getStyles = stylesFactory(() => {
//   return {
//     content: css`
//       height: 100%;
//       border: none;
//     `
//   };
// });
