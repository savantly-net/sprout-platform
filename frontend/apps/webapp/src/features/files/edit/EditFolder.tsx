import { FormField } from '@sprout-platform/ui';
/* eslint-disable */
import React, { Fragment } from 'react';
/* eslint-enable */
export interface EditFolderProps {}

export const EditFolder = (props: EditFolderProps) => {
  return (
    <Fragment>
      <FormField name="name" label="Name" />
    </Fragment>
  );
};
