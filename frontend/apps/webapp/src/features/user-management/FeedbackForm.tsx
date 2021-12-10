import React from 'react';
import { Field } from 'formik';
import { userEntityService } from './entity';
import { createSuccessNotification, eventBus, eventNotification } from '@savantly/sprout-api';
import FormikTags from '../../core/components/FormikTags';
import FormikTextArea from '../../core/components/FormikTextArea';
import { openChakraDialog } from '../../core/components/ChakraDialogModal';

export interface UserFormProps {}

export const FeedbackForm = (prop: UserFormProps) => {
  return (
    <>
      <Field name="text" component={FormikTextArea} label="Feedback details" />
      <Field name="tags" component={FormikTags} label="Tags" />
    </>
  );
};

export const openFeedbackModal = () => {
  openChakraDialog({
    initialValue: {
      text: '',
      tags: []
    },
    body: () => <FeedbackForm />
  }).then((response) => {
    if (response.result) {
      // console.log('response.result', response.value);
      // userEntityService
      //   .create({
      //     username: `Feedback: ${window.location.pathname}`,
      //     displayName: `Feedback: ${window.location.pathname}`,
      //     // description: response.value.text,
      //     // tags: response.value.tags
      //   })
      //   .then((response) => {
      //     const notification = createSuccessNotification('Feedback Submitted', 'Thank you for the feedback!');
      //     eventBus.publish(eventNotification(notification));
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });
    }
  });
};
