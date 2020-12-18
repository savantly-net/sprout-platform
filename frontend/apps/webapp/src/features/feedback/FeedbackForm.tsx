import { FormField, openDialog } from '@sprout-platform/ui';
import React, { Fragment } from 'react';
import { issueEntityService } from './entity';
import { createSuccessNotification, eventBus, eventNotification } from '@savantly/sprout-api';

export interface FeedbackFormProps {}

export const FeedbackForm = (prop: FeedbackFormProps) => {
  return (
    <Fragment>
      <FormField as="textarea" name="text" label="Feedback details..." />
    </Fragment>
  );
};

export const openFeedbackModal = () => {
  openDialog({
    initialValue: {
      text: ''
    },
    body: () => <FeedbackForm />
  }).then((response) => {
    if (response.result) {
      issueEntityService
        .create({
          title: `Feedback: ${window.location.pathname}`,
          description: response.value.text
        })
        .then(response => {
          const notification = createSuccessNotification('Feedback Submitted', 'Thank you for the feedback!');
          eventBus.publish(eventNotification(notification));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });
};
