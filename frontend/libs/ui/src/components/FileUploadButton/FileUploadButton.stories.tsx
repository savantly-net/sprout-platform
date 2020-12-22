import { Story } from '@storybook/react/types-6-0';
import React, { ComponentProps } from 'react';
import { withCenteredStory } from '../../util/storybook/withCenteredStory';
import { FileUploadButton } from './FileUploadButton';

export default {
  title: 'Form/FileUploadButton',
  component: FileUploadButton,
  decorators: [withCenteredStory]
};

const Template: Story<ComponentProps<typeof FileUploadButton>> = (args) => <FileUploadButton {...args} />;

export const DefaultStyle = Template.bind({});
DefaultStyle.args = {
  onCancel: () => console.log('cancelled'),
  onConfirm: (value) => console.log(value)
};

export const WithFileRestriction = Template.bind({});
WithFileRestriction.args = {
  accept: ['.jpg', '.gif']
};
