import { ItemEditorProps } from '@sprout-platform/ui';
import { css } from 'emotion';
import { Field, Form, Formik, FormikProps } from 'formik';
import React, { Fragment, useState } from 'react';
import { Prompt, useNavigate } from 'react-router-dom';
import { Alert, Button } from 'reactstrap';
import FormikMultiSelect from '../../../core/components/FormikMultiSelect';
import FormikSelect from '../../../core/components/FormikSelect';
import FormikTextInput from '../../../core/components/FormikTextInput';
import FormikCommonTextInput from '../../../core/components/FormikCommonTextInput';
import { UserEntity as EntityClass, userEntityService as service, userStateProvider as stateProvider } from '../entity';

const roleOptions = [{ value: 'ADMIN' }, { value: 'ANONYMOUS' }, { value: 'SYSTEM' }];

export const UserEntityEditor = ({ item, afterSave }: ItemEditorProps<EntityClass>) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const storeResult = {
      itemId: item?.itemId,
      displayName: item?.displayName,
      username: item?.username,
      firstName: item?.firstName,
      lastName: item?.lastName,
      emailAddress: item?.emailAddress,
      primaryEmailAddress: item?.emailAddress,
      password: item?.password,
      roles: (item?.roles?.length > 0) ? item?.roles[0]?.name : ''
    };
  return (
    <Fragment>
      {error && <Alert color="danger">{error}</Alert>}
      <Formik
        initialValues={storeResult || stateProvider.props.initialState.example}
        validate={(values: EntityClass) => {
          const errors: any = {};
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
          if (!values.emailAddress) {
            errors.emailAddress = 'Email address cannot be blank!';
          } else if (!regex.test(values.emailAddress)) {
            errors.emailAddress = 'Invalid email format';
          }
          if (!values.password && item?.itemId == '') {
            errors.password = 'Password cannot be blank!';
          }
          if (!values.displayName) {
            errors.displayName = 'Display name cannot be blank!';
          }
          if (!values.username) {
            errors.username = 'User name cannot be blank!';
          }  
          if (!values.firstName) {
            errors.firstName = 'First name cannot be blank!';
          }
          if (!values.lastName) {
            errors.lastName = 'Last name cannot be blank!';
          }
          return errors;
        }}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={(values: EntityClass, helpers: any) => {
          values.roles= (!values.roles) ? [values.roles] : ['ADMIN']
          // const promiseToSave = values.itemId ? service.update(values.itemId, result) : service.create(result);
          const promiseToSave = values.itemId ? service.update(values.itemId, values) : service.create(values);
          promiseToSave.then((response) => {
              helpers.setSubmitting(false);
              helpers.resetForm();
              afterSave(response.data, helpers);
            })
            .catch((err) => {
              setError(err.message || err.detail || 'An error occurred while saving.');
            });
        }}
      >
        {(props: FormikProps<EntityClass>) => (
          <Form  >
            <Prompt message="You have unsaved changes. Are you sure?" when={props.dirty} />
            <div  className={css`display: flex;`}>
              <Button className="ml-auto" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button className="ml-2" color="primary" type="submit">
                Save
              </Button>
            </div>
            <Field name="username" label="User Name" type="text" placeholder="User Name" component={FormikCommonTextInput} />
            {props.errors.username ? <div className={css({color: 'red', fontSize: '12px;', marginBottom: '5px;'})}>{props.errors.username}</div> : null}
            <Field name="displayName" label="Display Name" type="text" component={FormikCommonTextInput} />
            {props.errors.displayName ? <div className={css({color: 'red', fontSize: '12px;', marginBottom: '5px;'})}>{props.errors.displayName}</div> : null}
            <Field name="firstName" label="First Name" type="text" component={FormikCommonTextInput} />
            {props.errors.firstName ? <div className={css({color: 'red', fontSize: '12px;', marginBottom: '5px;'})}>{props.errors.firstName}</div> : null}
            <Field name="lastName" label="Last Name" type="text" component={FormikCommonTextInput} />
            {props.errors.lastName ? <div className={css({color: 'red', fontSize: '12px;', marginBottom: '5px;'})}>{props.errors.lastName}</div> : null}
            <Field name="emailAddress" label="Email Address" type="text" required component={FormikCommonTextInput} />
            {props.errors.emailAddress ? <div className={css({color: 'red', fontSize: '12px;', marginBottom: '5px;'})}>{props.errors.emailAddress}</div> : null}
            <Field name="password" type="password" label="Password" component={FormikCommonTextInput} />
            {props.errors.password ? <div className={css({color: 'red', fontSize: '12px;', marginBottom: '5px;'})}>{props.errors.password}</div> : null}
            <Field name="roles" component={FormikSelect} options={roleOptions} label="Roles" />
            {/* <Field name="roles" component={FormikMultiSelect} isMulti={true} options={roleOptions} label="Roles" /> */}
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};
