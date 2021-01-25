import { StandardEditorProps } from '@savantly/sprout-api';
import { Form, FormField, Icon } from '@sprout-platform/ui';
import { css, cx } from 'emotion';
import { Field, FieldArray } from 'formik';
import React, { Fragment, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { TablePanelOptions } from '../types';

export type QueryParameterControlType = 'CHOICE' | 'TEXT' | 'DATE';

interface NameValue {
  name: string;
  value: string;
}
export interface QueryParameterControlOptions {
  choices: NameValue[];
}

export interface QueryParameterControl {
  type: QueryParameterControlType;
  label: string;
  id: string;
  defaultValue?: string;
  options: QueryParameterControlOptions;
}

export interface QueryParametersConfiguration {
  controls: QueryParameterControl[];
}

const initialParameterControl: QueryParameterControl = {
  type: 'TEXT',
  label: 'My Param',
  id: 'param1',
  options: {
    choices: []
  }
};

export const QueryParametersEditor: React.FC<
  StandardEditorProps<QueryParametersConfiguration, any, TablePanelOptions>
> = ({ value, onChange, context, item }) => {
  const [state, setState] = useState(value);

  if (!state) {
    console.log(`no value passed to editor`);
  }

  if (!state) {
    return <h4>Loading...</h4>;
  }

  return (
    <div className="gf-form-group">
      <div className="edit-tab-content">
        <Form
          initialValues={state}
          onSubmit={(values, helpers) => {
            onChange(values);
            helpers.setSubmitting(false);
          }}
          showCancelButton={false}
          showSubmitButton={true}
          submitText="Update"
        >
          {({ values }) => (
            <Row>
              <Col>
                <div
                  className={cx(
                    'justify-content-between',
                    css`
                      display: flex;
                    `
                  )}
                ></div>
                <FieldArray name="controls">
                  {({ insert, remove, push }) => (
                    <Fragment>
                      <Button
                        color="info"
                        onClick={() => {
                          push(initialParameterControl);
                        }}
                      >
                        Add Parameter Control
                      </Button>
                      <div className="p-1">
                        {values.controls &&
                          values.controls.length > 0 &&
                          values.controls.map((control, index) => (
                            <Fragment key={`control-${index}`}>
                              <div className="mb-1" key={`control-${index}`}>
                                <div className="form-row">
                                  <div className="mr-2">
                                    <Button
                                      color="danger"
                                      onClick={() => {
                                        remove(index);
                                      }}
                                    >
                                      <Icon name="trash-alt" />
                                    </Button>
                                  </div>
                                  <div>
                                    <Field name={`controls.${index}.type`} as="select" className="form-control">
                                      <option value="CHOICE">Choice</option>
                                      <option value="TEXT">Text</option>
                                      <option value="DATE">Date</option>
                                    </Field>
                                  </div>
                                </div>
                                <Row>
                                  <FormField name={`controls.${index}.id`} label="ID" />
                                  <FormField name={`controls.${index}.label`} label="Label" />
                                  <FormField name={`controls.${index}.defaultValue`} label="Default" />
                                </Row>
                                {values.controls[index].type === 'CHOICE' && (
                                  <FieldArray name={`controls.${index}.options.choices`}>
                                    {({ insert, remove, push }) => (
                                      <div>
                                        <Button
                                          color="info"
                                          onClick={() => {
                                            push({ name: 'friendly name', value: 'value' });
                                          }}
                                        >
                                          Add Choice
                                        </Button>
                                        <Fragment>
                                          {values.controls[index].options.choices &&
                                            values.controls[index].options.choices.length > 0 &&
                                            values.controls[index].options.choices.map((control, subIndex) => (
                                              <div className="form-inline" key={`choice-${subIndex}`}>
                                                <Button
                                                  color="danger"
                                                  className="mr-2"
                                                  onClick={() => {
                                                    remove(subIndex);
                                                  }}
                                                >
                                                  <Icon name="trash-alt" />
                                                </Button>
                                                <div className="input-group">
                                                  <div className="input-group-prepend">
                                                    <div className="input-group-text">Name</div>
                                                  </div>
                                                  <Field
                                                    name={`controls.${index}.options.choices.${subIndex}.name`}
                                                    className="form-control"
                                                  />
                                                </div>
                                                <div className="input-group">
                                                  <div className="input-group-prepend">
                                                    <div className="input-group-text">Value</div>
                                                  </div>
                                                  <Field
                                                    name={`controls.${index}.options.choices.${subIndex}.value`}
                                                    className="form-control"
                                                  />
                                                </div>
                                              </div>
                                            ))}
                                        </Fragment>
                                      </div>
                                    )}
                                  </FieldArray>
                                )}
                              </div>
                              <hr />
                            </Fragment>
                          ))}
                      </div>
                    </Fragment>
                  )}
                </FieldArray>
              </Col>
            </Row>
          )}
        </Form>
      </div>
    </div>
  );
};
