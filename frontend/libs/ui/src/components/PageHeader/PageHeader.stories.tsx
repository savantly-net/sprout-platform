import { Story } from '@storybook/react/types-6-0';
import React, { ComponentProps } from 'react';
import { PageHeader } from './PageHeader';

// This default export determines where your story goes in the story list
export default {
  title: 'PageHeader',
  component: PageHeader
};

const Template: Story<ComponentProps<typeof PageHeader>> = (args) => <PageHeader {...args} />;

export const EmptyPageHeader = Template.bind({});
EmptyPageHeader.args = {
  model: {
    main: {
      text: 'main',
      url: './',
      children: [
        {
          text: 'sub',
          url: './sub'
        }
      ]
    },
    node: {
      text: 'sub',
      url: './sub'
    }
  }
};
