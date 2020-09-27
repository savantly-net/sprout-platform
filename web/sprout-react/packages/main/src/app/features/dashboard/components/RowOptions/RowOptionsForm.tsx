import React, { FC, useCallback, useState } from 'react';
import { Button, Field, Form, HorizontalGroup, Input } from '@grafana/ui';

export type OnRowOptionsUpdate = (title: string | null) => void;

export interface Props {
  title: string | null;
  repeat?: string | null;
  onUpdate: OnRowOptionsUpdate;
  onCancel: () => void;
}

export const RowOptionsForm: FC<Props> = ({ repeat, title, onUpdate, onCancel }) => {

  return (
    <Form
      defaultValues={{ title }}
      onSubmit={(formData: { title: string | null }) => {
        onUpdate(formData.title);
      }}
    >
      {({ register }) => (
        <>
          <Field label="Title">
            <Input css={null} name="title" ref={register} type="text" />
          </Field>
          <HorizontalGroup>
            <Button type="submit">Update</Button>
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </HorizontalGroup>
        </>
      )}
    </Form>
  );
};
