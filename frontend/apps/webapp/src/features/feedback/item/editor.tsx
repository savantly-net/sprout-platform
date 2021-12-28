import { ItemEditorProps } from '@sprout-platform/ui';
import { css } from 'emotion';
import { Field, Form, Formik, FormikProps } from 'formik';
import React, { Fragment, useState } from 'react';
import { Prompt, useNavigate } from 'react-router-dom';
import { Alert, Button } from 'reactstrap';
import FormikSelect from '../../../core/components/FormikSelect';
import FormikTags from '../../../core/components/FormikTags';
import FormikTextArea from '../../../core/components/FormikTextArea';
import FormikTextInput from '../../../core/components/FormikTextInput';
import {
  IssueEntity as EntityClass,
  issueEntityService as service,
  issueStateProvider as stateProvider
} from '../entity';
import { publishSuccessNotification,publishErrorNotification } from '@savantly/sprout-api';

const statusOptions = [{ value: 'OPEN' }, { value: 'CLOSED' }];

export const IssueEntityEditor = ({ item, afterSave }: ItemEditorProps<EntityClass>) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  console.log('item', item);

  return (
    <Fragment>
      {error && <Alert color="danger">{error}</Alert>}
      <Formik
        initialValues={item || stateProvider.props.initialState.example}
        validate={(values: EntityClass) => {
          const errors: any = {};
          return errors;
        }}
        validateOnBlur={true}
        onSubmit={(values: EntityClass, helpers: any) => {
          const promiseToSave = values.itemId ? service.update(values.itemId, values) : service.create(values);
          promiseToSave
            .then((response) => {
              helpers.setSubmitting(false);
              helpers.resetForm();
              afterSave(response.data, helpers);
              const message= values.itemId ? 'Issues updated successfully!' : 'Issues added successfully!';
              publishSuccessNotification('Saved', message);
            })
            .catch((err) => {
              publishErrorNotification('Failed to save issue ', err);
              setError(err.message || err.detail || 'An error occurred while saving.');
            });
        }}
      >
        {(props: FormikProps<EntityClass>) => (
          <Form>
            <Prompt message="You have unsaved changes. Are you sure?" when={props.dirty} />
            <div
              className={css`
                display: flex;
              `}
            >
              <Button className="ml-auto" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button className="ml-2" color="primary" type="submit">
                Save
              </Button>
            </div>
            <Field name="title" label="Title" component={FormikTextInput} />
            <Field name="description" component={FormikTextArea} label="Description" />
            <Field name="status" component={FormikSelect} options={statusOptions} label="Status" />
            <Field name="tags" component={FormikTags} label="Tags" />
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};