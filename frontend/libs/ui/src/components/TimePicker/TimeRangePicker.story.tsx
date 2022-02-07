import React from 'react';
import { action } from '@storybook/addon-actions';

import { TimeRangePicker } from '@sprout-platform/ui';
import { UseState } from '../../util/storybook/UseState';
import { withCenteredStory } from '../../util/storybook/withCenteredStory';
import { TimeFragment, dateTime } from '@savantly/sprout-api';

export default {
  title: 'Pickers and Editors/TimePickers/TimeRangePicker',
  component: TimeRangePicker,
  decorators: [withCenteredStory],
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
          <TimeRangePicker
            onChangeTimeZone={() => {}}
            timeZone="browser"
            value={value}
            onChange={timeRange => {
              action('onChange fired')(timeRange);
              updateValue(timeRange);
            }}
            onMoveBackward={() => {
              action('onMoveBackward fired')();
            }}
            onMoveForward={() => {
              action('onMoveForward fired')();
            }}
            onZoom={() => {
              action('onZoom fired')();
            }}
          />
        );
      }}
    </UseState>
  );
};
