import { AppRootProps } from '@savantly/sprout-api';
import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import { FormsSubPageContainer } from './FormsSubPageContainer';
import { getFormStateModule } from './state/FormStateModule';

interface Props extends AppRootProps {}

export const FormsRootPage = ({ path, onNavChanged, meta }: Props) => {
  return (
    <div>
      <DynamicModuleLoader modules={[getFormStateModule()]}>
        <FormsSubPageContainer path={path} onNavChanged={onNavChanged} meta={meta} />
      </DynamicModuleLoader>
    </div>
  );
};
