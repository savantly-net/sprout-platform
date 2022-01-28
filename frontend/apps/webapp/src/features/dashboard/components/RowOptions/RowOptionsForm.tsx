import {  Form } from '@savantly/sprout-ui';
// import { Form, FormField, HorizontalGroup } from '@sprout-platform/ui';
import {  FormField, HorizontalGroup } from '@sprout-platform/ui';
import { Button } from '@chakra-ui/react';
import React, { FC, Fragment } from 'react';

export type OnRowOptionsUpdate = (title: string | null) => void;

export interface Props {
  title: string | null;
  repeat?: string | null;
  onUpdate: OnRowOptionsUpdate;
  onCancel: () => void;
}

export const RowOptionsForm: FC<Props> = ({ repeat, title, onUpdate, onCancel }) => {
  return (
    <>
      {/* <Form
        cancelText="Cancel"
        initialValues={{
          title: '',
          repeat: '',
        }}
        onCancel={onCancel}
        onSubmit={(formData: { title: string | null }) => {
          onUpdate(formData.title);
        }}
        showButtonsOnTop={false}
        showCancelButton={false}
        showSubmitButton
        submitText="Save"
      >
        <Fragment>
          <FormField label="Title" css={null} name="title" type="text" />
        </Fragment>
      </Form> */}

      <Form
       defaultValues={{ title }}
       onSubmit={(formData: { title: string | null }) => {
         onUpdate(formData.title);
       }}
     >
       {({ register }) => (
         <>
           <FormField label="Title" css={null} name="title" ref={register} type="text" />
           <HorizontalGroup>
             <Button type="submit">Update</Button>
             <Button variant="secondary" onClick={onCancel}>
               Cancel
             </Button>
           </HorizontalGroup>
         </>
       )}
    </Form>
    </>
  );
};
