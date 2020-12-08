import { Story } from '@storybook/react/types-6-0';
import React, { ComponentProps, Fragment } from 'react';
import { Button } from 'reactstrap';
import { confirm, ConfirmModal } from './ConfirmModal';

// This default export determines where your story goes in the story list
export default {
  title: 'Notification/ConfirmModal',
  component: ConfirmModal
};

const Template: Story<ComponentProps<typeof ConfirmModal>> = (args) => (
  <Fragment>
    <Button
      onClick={() => {
        confirm(args)
          .then((response) => {
            console.log('confirmed: ', response);
          })
          .catch((err) => {
            console.error(err);
          });
      }}
    >
      Open Confirm
    </Button>
  </Fragment>
);

export const DefaultStyle = Template.bind({});
