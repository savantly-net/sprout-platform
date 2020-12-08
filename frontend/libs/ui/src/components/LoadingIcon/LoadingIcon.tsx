import { css } from 'emotion';
import React from 'react';
import { IconName } from '../../types';
import { Icon, IconProps } from '../Icon/Icon';

interface OwnProps extends Omit<IconProps, 'name'> {
  name?: IconName;
}

export const LoadingIcon = ({ size = '5x', name = 'cog', ...rest }: OwnProps) => {
  return (
    <div
      className={css`
        margin: auto;
      `}
    >
      <Icon name={name} size={size} spin {...rest} />
    </div>
  );
};
