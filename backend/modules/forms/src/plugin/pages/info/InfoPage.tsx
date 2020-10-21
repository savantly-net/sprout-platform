import { FormModuleRootState, FormModuleState } from '../../types';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { useInRouterContext } from 'react-router-dom';

const CreateFormPage: FC<any> = ({}: FormModuleState) => {
  const inRouterContext = useInRouterContext();
  console.log(`CreateForm in router context: ${inRouterContext}`);

  return (
    <div>
      <h3>Form Management</h3>
      <p>Sprout plugin by Savantly.net</p>
    </div>
  );
};

const mapStateToProps = (state: FormModuleRootState) => {
  return {};
};

export default connect(mapStateToProps)(CreateFormPage);
