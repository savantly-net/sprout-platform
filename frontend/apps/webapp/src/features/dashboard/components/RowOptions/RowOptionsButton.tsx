import React, { FC } from 'react';
import { ModalsController } from '@savantly/sprout-ui';
import { Icon } from '@sprout-platform/ui';
import { RowOptionsModal } from './RowOptionsModal';
import { OnRowOptionsUpdate } from './RowOptionsForm';

export interface RowOptionsButtonProps {
  title: string | null;
  onUpdate: OnRowOptionsUpdate;
}

export const RowOptionsButton: FC<RowOptionsButtonProps> = ({ title, onUpdate }) => {
  const onUpdateChange = (hideModal: () => void) => (title: string | null) => {
    onUpdate(title);
    hideModal();
  };

  return (
    <ModalsController>
      {({ showModal, hideModal }) => {
        return (
          <a
            href="javascript:;"
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
