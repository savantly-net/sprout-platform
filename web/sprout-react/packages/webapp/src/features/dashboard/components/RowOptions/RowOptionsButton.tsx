import React, { FC } from 'react';
import { Icon, ModalsController } from '@savantly/sprout-ui';

import { RowOptionsModal } from './RowOptionsModal';
import { OnRowOptionsUpdate } from './RowOptionsForm';

export interface RowOptionsButtonProps {
  title: string | null;
  onUpdate: OnRowOptionsUpdate;
}

export const RowOptionsButton: FC<RowOptionsButtonProps> = ({title, onUpdate }) => {
  const onUpdateChange = (hideModal: () => void) => (title: string | null) => {
    onUpdate(title);
    hideModal();
  };

  return (
    <ModalsController>
      {({ showModal, hideModal }) => {
        return (
          <a
            className="pointer"
            onClick={() => {
              showModal(RowOptionsModal, { title, onDismiss: hideModal, onUpdate: onUpdateChange(hideModal) });
            }}
          >
            <Icon name="cog" />
          </a>
        );
      }}
    </ModalsController>
  );
};

RowOptionsButton.displayName = 'RowOptionsButton';
