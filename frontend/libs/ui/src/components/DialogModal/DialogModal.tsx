// typescript version of
// https://github.com/algm/reactstrap-confirm/blob/master/src/components/ConfirmModal.js

import { Formik, FormikHelpers, FormikProps } from 'formik';
import React, { ComponentType, ReactElement, useState } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ThemeColor } from '../../types';

export interface DialogModalCloseRespose<T> {
  result: boolean;
  value: T;
  helpers?: FormikHelpers<T>;
}
export interface DialogModalProps<T> {
  onClose: (response: DialogModalCloseRespose<T>) => void;
  initialValue: T;
  body: ComponentType<FormikProps<T>>;
  title?: string | ReactElement;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: ThemeColor;
  cancelColor?: ThemeColor;
  className?: string;
  buttonsComponent?: ComponentType<{ onClose: (response: DialogModalCloseRespose<T>) => void }>;
  size?: string;
}

export const DialogModal = ({
  onClose,
  initialValue,
  body,
  title,
  confirmText,
  cancelText,
  confirmColor,
  cancelColor,
  className,
  buttonsComponent,
  size
}: DialogModalProps<any>) => {
  const [state] = useState(initialValue);

  const _cancelClick = () => onClose({result: false, value: state});
  const Body = body;

  const buttonsContent = (formProps: FormikProps<typeof initialValue>) => {
    if (buttonsComponent) {
      const CustomComponent = buttonsComponent;
      return <CustomComponent onClose={onClose} />;
    } else {
      return (
        <>
          {cancelText && (
            <Button color={cancelColor} onClick={_cancelClick}>
              {cancelText}
            </Button>
          )}{' '}
          <Button type="submit" color={confirmColor} onClick={() => formProps.submitForm()}>
            {confirmText}
          </Button>
        </>
      );
    }
  };

  return (
    <Formik
      initialValues={state}
      onSubmit={(values, helpers) => {
        onClose({result: true, value: values, helpers: helpers});
      }}
    >
      {(formProps) => (
        <Modal size={size} isOpen toggle={_cancelClick} className={className}>
          {title && <ModalHeader toggle={_cancelClick}>{title || null}</ModalHeader>}
          <ModalBody>
            <Body {...formProps} />
          </ModalBody>
          <ModalFooter>{buttonsContent(formProps)}</ModalFooter>
        </Modal>
      )}
    </Formik>
  );
};

DialogModal.defaultProps = {
  confirmText: 'Ok',
  cancelText: 'Cancel',
  confirmColor: 'primary',
  cancelColor: '',
  className: '',
  buttonsComponent: null,
  size: null
};

export const openDialog = <T extends unknown>(props: Omit<DialogModalProps<T>, 'onClose'>) => {
  return new Promise<DialogModalCloseRespose<T>>((resolve) => {
    let el: HTMLDivElement | null = document.createElement('div');

    const handleResolve = (result: DialogModalCloseRespose<T>) => {
      if (el) {
        unmountComponentAtNode(el);
        el = null;
        resolve(result);
      }
    };

    render(<DialogModal {...props} onClose={handleResolve} />, el);
  });
};
