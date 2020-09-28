import React, { FC } from 'react';
import { ConfirmButton } from './ConfirmButton';
import { ComponentSize } from '../../types/size';
import { Button } from '../Button';

export interface Props {
  /** Confirm action callback */
  onConfirm(): void;
  /** Button size */
  size?: ComponentSize;
  /** Disable button click action */
  disabled?: boolean;
}

export const DeleteButton: FC<Props> = ({ size, disabled, onConfirm }) => {
  return (
    <ConfirmButton
      confirmText="Delete"
      confirmVariant="destructive"
      size={size || 'md'}
      disabled={disabled}
      onConfirm={onConfirm}
    >
      <Button variant="destructive" icon="times" size={size || 'sm'} />
    </ConfirmButton>
  );
};
