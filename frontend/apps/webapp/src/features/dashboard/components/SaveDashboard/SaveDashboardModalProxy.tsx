import React from 'react';
import { SaveDashboardAsModal } from './SaveDashboardAsModal';
import { SaveDashboardModalProps } from './types';
import { SaveDashboardModal } from './SaveDashboardModal';

export const SaveDashboardModalProxy: React.FC<SaveDashboardModalProps> = ({ dashboard, onDismiss, onSaveSuccess }) => {
  const isProvisioned = dashboard.meta.provisioned;
  const isNew = dashboard.id === null;
  const isChanged = true; // TODO: detect if changed

  const modalProps = {
    dashboard,
    onDismiss,
    onSaveSuccess,
  };

  return (
    <>
      {isChanged && !isProvisioned && <SaveDashboardModal {...modalProps} />}
      {isNew && <SaveDashboardAsModal {...modalProps} isNew />}
    </>
  );
};
