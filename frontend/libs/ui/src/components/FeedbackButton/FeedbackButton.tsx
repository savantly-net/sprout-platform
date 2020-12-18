import { css } from 'emotion';
import React from 'react';
import { Button } from 'reactstrap';
import { IconSize } from '../../types';
import { Icon } from '../Icon/Icon';

export interface FeedbackButtonProps {
  size: IconSize;
  showLabel: boolean;
}

// do we really need a button, or can we just use the navigation button
export const FeedbackButton = ({ size, showLabel }: FeedbackButtonProps) => {
  return (
    <div
      className={css`
        margin: auto;
      `}
    >
      <Button  color="warning" onClick={() => {}}>
        <Icon name="exclamation-circle" size={size} />
        {showLabel && <span className="ml-1">Feedback</span>}
      </Button>
    </div>
  );
};
