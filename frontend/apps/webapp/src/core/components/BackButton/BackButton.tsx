import React, { ButtonHTMLAttributes } from 'react';
import { IconButton } from '@sprout-platform/ui';
import { selectors } from '@grafana/e2e-selectors';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  surface: 'dashboard' | 'panel' | 'header';
}

export const BackButton: React.FC<Props> = ({ surface, onClick }) => {
  return (
    <IconButton
      name="arrow-left"
      tooltip="Go back (Esc)"
      tooltipPlacement="bottom"
      size="2x"
      surface={surface}
      aria-label={selectors.components.BackButton.backArrow}
      onClick={(e) => onClick ? onClick(e as any): {}}
    />
  );
};

BackButton.displayName = 'BackButton';
