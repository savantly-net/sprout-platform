import { Story } from '@storybook/react/types-6-0';
import { css, cx } from 'emotion';
import React, { ChangeEvent, ComponentProps, useState } from 'react';
import { IconName, monoIcons } from '../../types';
import { withCenteredStory } from '../../util/storybook/withCenteredStory';
import { fabIcons, fasIcons, Icon } from './Icon';

const withDupes = fabIcons.concat(fasIcons).concat(monoIcons);
const availableFaIcons = withDupes.filter((name, index) => {
  return withDupes.indexOf(name) === index;
});

const icons = availableFaIcons.sort((a, b) => a.localeCompare(b));

export default {
  title: 'Icon',
  component: Icon,
  decorators: [withCenteredStory],
  argTypes: {
    name: {
      control: {
        type: 'select',
        options: icons
      }
    },
    size: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x']
      }
    },
    color: { control: 'color' }
  }
};

const Template: Story<ComponentProps<typeof Icon>> = (args) => <Icon {...args} />;

export const ExampleIcon = Template.bind({});
ExampleIcon.args = {
  name: 'check',
  size: '3x',
  color: 'blue'
};

const IconWrapper: React.FC<{ name: IconName }> = ({ name }) => {
  return (
    <div
      className={css`
        width: 150px;
        padding: 12px;
        text-align: center;
      `}
    >
      <Icon name={name} size="lg" />
      <div
        className={css`
          padding-top: 16px;
          word-break: break-all;
        `}
      >
        {name}
      </div>
    </div>
  );
};

export const availableIcons = () => {
  const [filter, setFilter] = useState('');

  const searchIcon = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        width: 100%;
      `}
    >
      <input
        className={cx(
          css`
            width: 300px;
          `,
          'form-control'
        )}
        onChange={searchIcon}
        placeholder="Search icons by name"
      />
      <div
        className={css`
          display: flex;
          flex-wrap: wrap;
        `}
      >
        {icons
          .filter((val) => val.includes(filter))
          .map((i) => {
            return <IconWrapper name={i} key={i} />;
          })}
      </div>
    </div>
  );
};
