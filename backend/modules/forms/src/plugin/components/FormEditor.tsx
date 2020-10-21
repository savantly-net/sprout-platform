import { FormModuleRootState, FormModuleState } from '../types';
import React, { FC } from 'react';
import { FormBuilder } from 'react-formio';
import { connect } from 'react-redux';
import { useInRouterContext } from 'react-router-dom';

const FormEditor: FC<any> = ({ form }: FormModuleState) => {
  const inRouterContext = useInRouterContext();
  console.log(`FormEditor in router context: ${inRouterContext}`);

  const showActiveFormOrNot = () => {
    if (form) {
      return <FormBuilder form={{ display: 'form' }} onChange={(schema: any) => console.log(schema)} />;
    } else {
      return <h1>There is no active form</h1>;
    }
  };
  return <div>{showActiveFormOrNot()}</div>;
};

const mapStateToProps = (state: FormModuleRootState) => {
  console.log(state);
  return {
    form: state.formModuleState.form,
  };
};

export default connect(mapStateToProps)(FormEditor);
