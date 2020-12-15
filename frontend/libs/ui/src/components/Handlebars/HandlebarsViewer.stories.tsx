import { Story } from '@storybook/react/types-6-0';
import React, { ComponentProps } from 'react';
import { HandlebarsViewer } from './HandlebarsViewer';

export default {
  title: 'Code/HandlebarsViewer',
  component: HandlebarsViewer
};

const Template: Story<ComponentProps<typeof HandlebarsViewer>> = (args) => <HandlebarsViewer {...args} />;

export const DefaultHandlebarsViewer = Template.bind({});
DefaultHandlebarsViewer.args = {
  data: { message: 'Hello World' },
  templateSource: '<div class="text-info">{{message}}</div>'
};
