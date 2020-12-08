import { Story } from '@storybook/react/types-6-0';
import React, { ComponentProps } from 'react';
import { withCenteredStory } from '../../util/storybook/withCenteredStory';
import { MarkdownViewer } from './MarkdownViewer';

export default {
  title: 'Markdown/Viewer',
  component: MarkdownViewer,
  decorators: [withCenteredStory]
};

const Template: Story<ComponentProps<typeof MarkdownViewer>> = (args) => <MarkdownViewer {...args} />;

export const SimpleViewer = Template.bind({});
SimpleViewer.args = {
  children: `
  # Read Only  
  You cannot edit this  
  `
};

export const AllowHtml = Template.bind({});
AllowHtml.args = {
  allowDangerousHtml: true,
  children: `
  # Allow html  
  <ul>
    <li> Im using html
  </ul>
  `
};
