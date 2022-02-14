/* eslint-disable */
import React from 'react';
/* eslint-enable */
import { Button, ButtonVariant, ModalsController, FullWidthButtonContainer } from '@savantly/sprout-ui';
import { DashboardModel } from '../../state';
import { SaveDashboardAsModal } from './SaveDashboardAsModal';
import { SaveDashboardModalProxy } from './SaveDashboardModalProxy';

interface SaveDashboardButtonProps {
  dashboard: DashboardModel;
  onSaveSuccess?: () => void;
}

export const SaveDashboardButton: React.FC<SaveDashboardButtonProps> = ({ dashboard, onSaveSuccess }) => {
  return (
    <ModalsController>
      {({ showModal, hideModal }) => {
        return (
          <Button
            onClick={() => {
              showModal(SaveDashboardModalProxy, {
                dashboard,
                onSaveSuccess,
                onDismiss: hideModal,
              });
            }}
          >
            Save dashboard
          </Button>
        );
      }}
    </ModalsController>
  );
};

export const SaveDashboardAsButton: React.FC<SaveDashboardButtonProps & { variant?: ButtonVariant }> = ({
  dashboard,
  onSaveSuccess,
  variant,
}) => {
  return (
    <ModalsController>
      {({ showModal, hideModal }) => {
        return (
          <FullWidthButtonContainer>
            <Button
              onClick={() => {
                showModal(SaveDashboardAsModal, {
                  dashboard,
                  onSaveSuccess,
                  onDismiss: hideModal,
                });
              }}
              // TODO[angular-migrations]: Hacking the different variants for this single button
              // In Dashboard Settings in sidebar we need to use new form but with inverse variant to make it look like it should
              // Everywhere else we use old button component :(
              variant={variant as ButtonVariant}
            >
              Save As...
            </Button>
          </FullWidthButtonContainer>
        );
      }}
    </ModalsController>
  );
};
