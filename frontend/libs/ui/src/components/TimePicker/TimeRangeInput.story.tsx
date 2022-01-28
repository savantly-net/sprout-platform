import React from 'react';
import { action } from '@storybook/addon-actions';
import { dateTime, TimeFragment } from '@savantly/sprout-api';
import { withCenteredStory } from '../../util/storybook/withCenteredStory';
import { UseState } from '../../util/storybook/UseState';
import { TimeRangeInput } from '@savantly/sprout-ui';
import mdx from './TimeRangeInput.mdx';

export default {
  title: 'Pickers and Editors/TimePickers/TimeRangeInput',
  component: TimeRangeInput,
  decorators: [withCenteredStory],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const basic = () => {
  return (
    <UseState
      initialState={{
        from: dateTime(),
        to: dateTime(),
        raw: { from: 'now-6h' as TimeFragment, to: 'now' as TimeFragment },
      }}
    >
      {(value, updateValue) => {
        return (
          <TimeRangeInput
            value={value}
            onChange={timeRange => {
              action('onChange fired')(timeRange);
              updateValue(timeRange);
            }}
          />
        );
      }}
    </UseState>
  );
};

export const clearable = () => {
  return (
    <UseState
      initialState={{
        from: dateTime(),
        to: dateTime(),
        raw: { from: 'now-6h' as TimeFragment, to: 'now' as TimeFragment },
      }}
    >
      {(value, updateValue) => {
        return (
          <TimeRangeInput
            clearable
            value={value}
            onChange={timeRange => {
              action('onChange fired')(timeRange);
              updateValue(timeRange);
            }}
          />
        );
      }}
    </UseState>
  );
};
