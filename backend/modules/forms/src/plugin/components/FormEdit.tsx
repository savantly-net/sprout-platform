import { LoadingPlaceholder } from '@savantly/sprout-ui';
import { Form, FormField } from '@sprout-platform/ui';
import _camelCase from 'lodash/camelCase';
import _cloneDeep from 'lodash/cloneDeep';
import _set from 'lodash/set';
import { AppFormDto } from 'plugin/types';
import React, { Fragment, useEffect, useReducer } from 'react';
import { FormBuilder } from 'react-formio';
import { Col, Row } from 'reactstrap';

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
  }, [props, form._id, form.modified]);

  const saveForm = (values: AppFormDto) => {
    const { saveForm } = props;
    if (saveForm && typeof saveForm === 'function') {
      saveForm(values);
    }
  };

  const formChange = (newForm: AppFormDto) => dispatchFormAction({ type: 'formChange', value: newForm });

  const { options, builder, saveText } = props;

  if (!props.form) {
    return <LoadingPlaceholder text="Loading Form..." />;
  }

  return (
    <div>
      <Form
        submitText={saveText}
        showButtonsOnTop={true}
        initialValues={{ ...form }}
        validate={(values: AppFormDto) => {
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
        {({ values }) => {
          return (
            <Fragment>
              <h5>Details</h5>
              <hr />
              <Row form>
                <Col md={3}>
                <FormField
                    name="title"
                    type="text"
                    label="Title"
                    placeholder="Enter the form title"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      dispatchFormAction({ type: 'title', value: e.target.value });
                    }}
                  />
                  <FormField name="name" type="text" label="Name" placeholder="Enter the form machine name" />
                  <FormField
                    name="path"
                    type="text"
                    label="Path"
                    placeholder="path-to/form"
                    style={{ textTransform: 'lowercase', width: '120px' }}
                  />
                </Col>
                <Col md={3}>
                  
                  <FormField as="select" className="form-control" name="display">
                    <option label="Form" value="form">
                      Form
                    </option>
                    <option label="Wizard" value="wizard">
                      Wizard
                    </option>
                  </FormField>
                  <FormField as="select" className="form-control" name="type">
                    <option label="Form" value="form">
                      Form
                    </option>
                    <option label="Resource" value="resource">
                      Resource
                    </option>
                  </FormField>
                </Col>
              </Row>
              <Row>
                <h5>Components</h5>
                <hr />
                <FormBuilder key={values._id} form={values} options={options} builder={builder} onChange={formChange} />
              </Row>
            </Fragment>
          );
        }}
      </Form>
    </div>
  );
};
