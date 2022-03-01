import { Form, FormField } from '@sprout-platform/ui';
import React, { Fragment } from 'react';
import { SaveDashboardFormProps } from '../types';

interface SaveDashboardFormDTO {
  message: string;
  saveVariables: boolean;
  saveTimerange: boolean;
}

export const SaveDashboardForm: React.FC<SaveDashboardFormProps> = ({ dashboard, onCancel, onSuccess, onSubmit }) => {
  return (
    <>
      <Form
        cancelText="Cancel"
        initialValues={{
          message: '',
          saveVariables: true,
          saveTimerange: true
        }}
        onCancel={onCancel}
        onSubmit={async (data: SaveDashboardFormDTO) => {
          if (!onSubmit) {
            return;
          }
          const result = await onSubmit(dashboard.getSaveModelClone(data), data, dashboard);
          if (result.status === 200) {
            onSuccess();
          }
        }}
        showButtonsOnTop={false}
        showCancelButton={false}
        showSubmitButton
        submitText="Save"
      >
        <Fragment>
          <FormField as="textarea" rows="2" placeholder="Add a note to describe your changes..." name="message" />
        </Fragment>
      </Form>
    </>
  );
};
