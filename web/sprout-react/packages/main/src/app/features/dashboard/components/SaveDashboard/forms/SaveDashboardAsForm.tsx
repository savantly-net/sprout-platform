import React from 'react';
import { Button, HorizontalGroup, Input, Switch, Form, Field, InputControl } from '@grafana/ui';
import { DashboardModel, PanelModel } from '../../../state';
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
  onSuccess,
}) => {
  const defaultValues: SaveDashboardAsFormDTO = {
    title: `${dashboard.title} Copy`,
    $folder: {
      id: dashboard.meta.folderId,
      title: dashboard.meta.folderTitle,
    },
    copyTags: false,
  };

  return (
    <Form
      defaultValues={defaultValues}
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
            folderId: data.$folder.id,
          },
          dashboard
        );

        if (result.status === 'success') {
          onSuccess();
        }
      }}
    >
      {({ register, control, errors, getValues }) => (
        <>
          <Field label="Dashboard name" invalid={!!errors.title} error={errors.title?.message}>
            <Input css={null}
              name="title"
              aria-label="Save dashboard title field"
              autoFocus
            />
          </Field>
          <HorizontalGroup>
            <Button type="submit" aria-label="Save dashboard button">
              Save
            </Button>
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </HorizontalGroup>
        </>
      )}
    </Form>
  );
};
