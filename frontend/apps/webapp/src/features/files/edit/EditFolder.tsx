import { FormField } from '@sprout-platform/ui';
import React, { Fragment } from 'react';

export interface EditFolderProps {}

export const EditFolder = (props: EditFolderProps) => {
  return (
    <Fragment>
      <FormField name="name" label="Name" />
    </Fragment>
  );
};
