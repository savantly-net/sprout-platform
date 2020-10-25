import { LoadingPlaceholder } from '@savantly/sprout-ui';
import { Field, Form, Formik } from 'formik';
import _camelCase from 'lodash/camelCase';
import _cloneDeep from 'lodash/cloneDeep';
import _set from 'lodash/set';
import { AppFormDto } from 'plugin/types';
import React, { useEffect, useReducer } from 'react';
import { FormBuilder } from 'react-formio';
import { ValidatedFormField } from './ValidatedFormField';

interface OwnProps {
  form: AppFormDto;
  options?: any;
  builder?: any;
  saveText?: string;
  saveForm?: (form: AppFormDto) => void;
}

const reducer = (form: AppFormDto, { type, value }: { type: string; value: any }) => {
  const formCopy = _cloneDeep(form);
  switch (type) {
    case 'formChange':
      return { ...form, ...value };
    case 'replaceForm':
      return _cloneDeep(value);
    case 'title':
      if (type === 'title' && !form._id) {
        formCopy.name = _camelCase(value);
        formCopy.path = _camelCase(value).toLowerCase();
      }
      break;
    default:
      return form;
  }
  _set(formCopy, type, value);
  return formCopy;
};

export const FormEdit = (props: OwnProps) => {
  const [form, dispatchFormAction] = useReducer(reducer, _cloneDeep(props.form));
  useEffect(() => {
    const { form: newForm } = props;
    if (newForm && (form._id !== newForm._id || form.modified !== newForm.modified)) {
      dispatchFormAction({ type: 'replaceForm', value: newForm });
    }
  }, [props.form]);

  const saveForm = (values: AppFormDto) => {
    const { saveForm } = props;
    if (saveForm && typeof saveForm === 'function') {
      saveForm(values);
    }
  };

  const formChange = (newForm: AppFormDto) => dispatchFormAction({ type: 'formChange', value: newForm });

  const { saveText, options, builder } = props;

  if (!props.form) {
    return <LoadingPlaceholder text="Loading Form..." />;
  }

  return (
    <div>
      <Formik
        initialValues={{ ...form }}
        validate={values => {
          const errors: any = {};
          if (!values.title) {
            errors.title = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          saveForm(values);
        }}
        enableReinitialize={true}
      >
        {({ errors, touched, isSubmitting, values }) => {
          return (
            <Form>
              <div>
                <div className="mb-3">
                  <div className="d-flex p-2 mb-2 justify-content-end align-items-end">
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {saveText || 'Save Form'}
                    </button>
                  </div>
                  <h5>Details</h5>
                  <hr />
                  <div className="d-flex form-row">
                    <div className="col-md-3 col-sm-6">
                      <div id="form-group-title" className="form-group">
                        <label htmlFor="title" className="control-label field-required">
                          Title
                        </label>
                        <ValidatedFormField
                          name="title"
                          type="text"
                          placeholder="Enter the form title"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            dispatchFormAction({ type: 'title', value: e.target.value });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                      <div id="form-group-name" className="form-group">
                        <label htmlFor="name" className="control-label field-required">
                          Name
                        </label>
                        <ValidatedFormField
                          name="name"
                          type="text"
                          className="form-control"
                          placeholder="Enter the form machine name"
                        />
                      </div>
                    </div>
                    <div className="col-md-2 col-sm-4">
                      <div id="form-group-path" className="form-group">
                        <label htmlFor="path" className="control-label field-required">
                          Path
                        </label>
                        <div className="input-group">
                          <ValidatedFormField
                            name="path"
                            type="text"
                            className="form-control"
                            placeholder="example"
                            style={{ textTransform: 'lowercase', width: '120px' }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2 col-sm-4">
                      <div id="form-group-display" className="form-group">
                        <label htmlFor="name" className="control-label">
                          Display as
                        </label>
                        <div className="input-group">
                          <ValidatedFormField as="select" className="form-control" name="display">
                            <option label="Form" value="form">
                              Form
                            </option>
                            <option label="Wizard" value="wizard">
                              Wizard
                            </option>
                          </ValidatedFormField>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2 col-sm-4">
                      <div id="form-group-type" className="form-group">
                        <label htmlFor="form-type" className="control-label">
                          Type
                        </label>
                        <div className="input-group">
                          <ValidatedFormField as="select" className="form-control" name="type">
                            <option label="Form" value="form">
                              Form
                            </option>
                            <option label="Resource" value="resource">
                              Resource
                            </option>
                          </ValidatedFormField>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h5>Components</h5>
                <hr />
                <FormBuilder key={values._id} form={values} options={options} builder={builder} onChange={formChange} />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
