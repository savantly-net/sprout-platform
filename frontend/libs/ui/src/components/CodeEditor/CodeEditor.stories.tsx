import { Story } from '@storybook/react/types-6-0';
import React, { ComponentProps, ReactElement } from 'react';
import { CodeEditor } from './CodeEditor';

export default {
  title: 'CodeEditor',
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
  },
  decorators: [(storyFn: () => ReactElement) => <div>{storyFn()}</div>]
};

const Template: Story<ComponentProps<typeof CodeEditor>> = (args) => (
  <div>
    <CodeEditor {...args} />
  </div>
);

export const DefaultCodeEditor = Template.bind({});
DefaultCodeEditor.args = {
  value: '<div>{{foo}}</div>',
  onChange: (value, event) => {
    console.log(value, event);
  }
};
