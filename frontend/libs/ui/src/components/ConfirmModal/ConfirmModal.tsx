// typescript version of
// https://github.com/algm/reactstrap-confirm/blob/master/src/components/ConfirmModal.js

import React, { ComponentType, ReactElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ThemeColor } from '../../types';

export interface ConfirmModalProps {
  onClose: (result: boolean) => void;
  message?: string | ReactElement;
  title?: string | ReactElement;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: ThemeColor;
  cancelColor?: ThemeColor;
  className?: string;
  buttonsComponent?: ComponentType<{ onClose: (result: boolean) => void }>;
  size?: string;
}

export const ConfirmModal = ({
  onClose,
  message,
  title,
  confirmText,
  cancelText,
  confirmColor,
  cancelColor,
  className,
  buttonsComponent,
  size
}: ConfirmModalProps) => {
  let buttonsContent = (
    <>
      {cancelText && (
        <Button color={cancelColor} onClick={() => onClose(false)}>
          {cancelText}
        </Button>
      )}{' '}
      <Button color={confirmColor} onClick={() => onClose(true)}>
        {confirmText}
      </Button>
    </>
  );

  if (buttonsComponent) {
    const CustomComponent = buttonsComponent;
    buttonsContent = <CustomComponent onClose={onClose} />;
  }

  return (
    <Modal size={size} isOpen toggle={() => onClose(false)} className={className}>
      {title && <ModalHeader toggle={() => onClose(false)}>{title || null}</ModalHeader>}
      <ModalBody>{message}</ModalBody>
      <ModalFooter>{buttonsContent}</ModalFooter>
    </Modal>
  );
};

ConfirmModal.defaultProps = {
  message: 'Are you sure?',
  title: 'Warning!',
  confirmText: 'Ok',
  cancelText: 'Cancel',
  confirmColor: 'primary',
  cancelColor: '',
  className: '',
  buttonsComponent: null,
  size: null
};

export const confirm = (props: Omit<ConfirmModalProps, 'onClose'>) => {
  return new Promise((resolve) => {
    let el: HTMLDivElement | null = document.createElement('div');

    const handleResolve = (result: any) => {
      if (el) {
        unmountComponentAtNode(el);
        el = null;
        resolve(result);
      }
    };

    render(<ConfirmModal {...props} onClose={handleResolve} />, el);
  });
};
