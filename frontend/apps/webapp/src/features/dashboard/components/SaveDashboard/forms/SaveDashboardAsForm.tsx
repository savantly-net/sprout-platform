import { Form, FormField } from '@sprout-platform/ui';
/* eslint-disable */
import React from 'react';
/* eslint-enable */
import { DashboardModel } from '../../../state';
import { SaveDashboardFormProps } from '../types';

interface SaveDashboardAsFormDTO {
  title: string;
  $folder: { id?: number; title?: string };
  copyTags: boolean;
}

const getSaveAsDashboardClone = (dashboard: DashboardModel) => {
  const clone: any = dashboard.getSaveModelClone();
  clone.id = null;
  clone.uid = '';
  clone.title += ' Copy';
  clone.editable = true;
  clone.hideControls = false;

  delete clone.autoUpdate;
  return clone;
};

export const SaveDashboardAsForm: React.FC<SaveDashboardFormProps & { isNew?: boolean }> = ({
  dashboard,
  onSubmit,
  onCancel,
  onSuccess
}) => {
  const defaultValues: SaveDashboardAsFormDTO = {
    title: `${dashboard.title} Copy`,
    $folder: {
      id: dashboard.meta.folderId || 0,
      title: dashboard.meta.folderTitle
    },
    copyTags: false
  };

  return (
    <Form
      initialValues={defaultValues}
      onCancel={() => onCancel()}
      onSubmit={async (data: SaveDashboardAsFormDTO) => {
        if (!onSubmit) {
          return;
        }

        const clone = getSaveAsDashboardClone(dashboard);
        clone.title = data.title;
        if (!data.copyTags) {
          clone.tags = [];
        }

        const result = await onSubmit(
          clone,
          {
            folderId: data.$folder?.id || 0
          },
          dashboard
        );

        if (result.status === 200) {
          onSuccess();
        }
      }}
    >
      {({ values }) => (
        <>
          <FormField label="Dashboard name" name="title" aria-label="Save dashboard title field" autoFocus />
        </>
      )}
    </Form>
  );
};
