import React, { Fragment, ReactElement } from 'react';
import { Button } from 'reactstrap';
import { ThemeColor } from '../../types/colors';
import { openDialog } from '../DialogModal/DialogModal';

interface ModalUploadValue {
  files: FileList;
}

export interface FileUploadButtonProps {
  /**
   * Restrict file types in browser. Default is everything.
   */
  accept: string[];
  /**
   * Supply custom content for the button
   */
  buttonContent?: ReactElement | string;
  buttonColor?: ThemeColor | string;
  /**
   * When the file selection is confirmed
   */
  onConfirm: (value: ModalUploadValue) => void;
  /**
   * When the file selection is cancelled
   */
  onCancel: () => void;
  dialogTitle?: string;
}

const openModalUploadFile = (props: FileUploadButtonProps) => {
  const calculateMbs = (size?: number) => {
    if (size && size > 0) {
      return (size / 1024 / 1024).toFixed(2);
    } else {
      return 0;
    }
  };

  const fileNames = (fileList: FileList) => {
    const names: string[] = [];
    if (fileList) {
      for (let index = 0; index < fileList.length; index++) {
        names.push(`${fileList.item(index)?.name} (${calculateMbs(fileList.item(index)?.size)}mB)`);
      }
    }

    return names;
  };

  openDialog({
    initialValue: {} as ModalUploadValue,
    title: props.dialogTitle || 'Upload File',
    body: (formikProps) => (
      <Fragment>
        <div className="form-group col">
          <div className="custom-file">
            <input
              required
              id="file"
              name="file"
              type="file"
              accept={props.accept?.join()}
              onChange={(event) => {
                if (event.currentTarget.files) {
                  formikProps.setFieldValue('files', event.currentTarget.files);
                }
              }}
              className="custom-file-input"
            />
            <label className="custom-file-label">
              {fileNames(formikProps.values.files).join(', ') || 'Choose file(s)'}
            </label>
          </div>
        </div>
      </Fragment>
    )
  }).then((dialogResult) => {
    if (dialogResult.result) {
      props.onConfirm(dialogResult.value);
    } else {
      props.onCancel();
    }
  });
};

export const FileUploadButton = (props: FileUploadButtonProps) => {
  return (
    <Button color={props.buttonColor} onClick={() => openModalUploadFile(props)}>
      {props.buttonContent || 'Select File(s)'}
    </Button>
  );
};
