import { Story } from '@storybook/react/types-6-0';
import React, { ComponentProps } from 'react';
import { Button } from 'reactstrap';
import { confirm, ConfirmModal } from './ConfirmModal';

// This default export determines where your story goes in the story list
export default {
  title: 'ConfirmModal',
  component: ConfirmModal
};

const Template: Story<ComponentProps<typeof ConfirmModal>> = (args) => <Button onClick={() => {
    confirm(args)
}}>
    Open Confirm
</Button>;

export const DefaultConfirmModal = Template.bind({});
DefaultConfirmModal.args = {
  onClose: (result) => {
    console.log(`ConfirmModal result: ${result}`);
  }
};
