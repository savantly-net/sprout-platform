import { Story } from '@storybook/react/types-6-0';
import React, { ComponentProps } from 'react';
import { CodeEditor } from './CodeEditor';

export default {
  title: 'Code/CodeEditor',
  component: CodeEditor,
  argTypes: {
    mode: {
      control: {
        type: 'select',
        options: ['javascript', 'html', 'handlebars']
      }
    },
    theme: {
      control: {
        type: 'select',
        options: ['light', 'dark']
      }
    }
  }
};

const Template: Story<ComponentProps<typeof CodeEditor>> = (args) => <CodeEditor {...args} />;

export const DefaultCodeEditor = Template.bind({});
DefaultCodeEditor.args = {
  onEditorChange: (value) => {
    console.log(value);
  }
};
