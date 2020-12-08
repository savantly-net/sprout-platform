import { Story } from '@storybook/react/types-6-0';
import React, { ComponentProps } from 'react';
import { withCenteredStory } from '../../util/storybook/withCenteredStory';
import { MarkdownEditor } from './MarkdownEditor';

export default {
  title: 'Markdown/Editor',
  component: MarkdownEditor,
  decorators: [withCenteredStory]
};

const Template: Story<ComponentProps<typeof MarkdownEditor>> = (args) => <MarkdownEditor {...args} />;

export const SimpleEditor = Template.bind({});
SimpleEditor.args = {
  value: '# Test Me',
  readOnly: false
};
