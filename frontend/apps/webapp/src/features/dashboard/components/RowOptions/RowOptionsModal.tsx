import React, { FC } from 'react';
import { Modal, stylesFactory } from '@sprout-platform/ui';
import { css } from 'emotion';

import { OnRowOptionsUpdate, RowOptionsForm } from './RowOptionsForm';

export interface RowOptionsModalProps {
  title: string | null;
  onDismiss: () => void;
  onUpdate: OnRowOptionsUpdate;
}

export const RowOptionsModal: FC<RowOptionsModalProps> = ({title, onDismiss, onUpdate }) => {
  const styles = getStyles();
  return (
    <Modal isOpen={true} title="Row Options" icon="copy" onDismiss={onDismiss} className={styles.modal}>
      <RowOptionsForm title={title} onCancel={onDismiss} onUpdate={onUpdate} />
    </Modal>
  );
};

const getStyles = stylesFactory(() => {
  return {
    modal: css`
      label: RowOptionsModal;
      width: 500px;
    `,
  };
});
