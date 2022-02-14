import { confirm, FormField, openDialog } from '@sprout-platform/ui';
import { ChonkyActions, FileBrowser, FileContextMenu, FileList, FileNavbar, FileToolbar } from 'chonky';
import { css, cx } from 'emotion';
/* eslint-disable */
import React, { Fragment, useMemo, useState } from 'react';
/* eslint-enable */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { StoreState } from '../../types';
import { EditFolder } from './edit/EditFolder';
import { fileService } from './service';
import { createFolder, loadFiles, uploadFile } from './state';
import { FileMetaData } from './types';

const FilesIndexPage = () => {
  const dispatch = useDispatch();
  const fileState = useSelector((state: StoreState) => state.files);
  const params = useParams();
  const navigate = useNavigate();
  const [filePath, setFilePath] = useState('');

  console.log(params);

  useMemo(() => {
    const filePathStar = params['*'];
    const filePathParam = params['filePath'];
    let _filePath = '';
    if (filePathParam) {
      _filePath = filePathParam + filePathStar;
    }
    setFilePath(_filePath);
  }, [params]);

  useMemo(() => {
    if (fileState.path !== filePath) {
      if (!fileState.fetching) {
        dispatch(loadFiles(filePath));
      }
    } else {
      // path is already updated
      if (!fileState.fetched && !fileState.fetching) {
        // load current path files
        dispatch(loadFiles(filePath));
      }
    }
  }, [dispatch, filePath, fileState]);

  const folderChain = fileState.item?.folderChain || [];

  const openModalEditFolder = () => {
    openDialog({
      initialValue: {
        name: 'New Folder'
      },
      title: 'Create Folder',
      body: () => <EditFolder />
    }).then((dialogResult) => {
      if (dialogResult.result) {
        dispatch(
          createFolder({
            name: dialogResult.value.name,
            parent: fileState.path
          })
        );
      }
    });
  };

  const openModalUploadFile = () => {
    openDialog({
      initialValue: {
        name: '',
        file: undefined as any
      },
      title: 'Upload File',
      body: (formikProps) => (
        <Fragment>
          <div className="form-group col">
            <div className="custom-file">
              <input
                required
                id="file"
                name="file"
                type="file"
                onChange={(event) => {
                  if (event.currentTarget.files) {
                    const file = event.currentTarget.files[0];
                    formikProps.setFieldValue('file', file);
                    if (file) {
                      formikProps.setFieldValue('name', event.currentTarget.files[0].name);
                    }
                  }
                }}
                className="custom-file-input"
              />
              <label className="custom-file-label">{formikProps.values.file?.name || 'Choose file'}</label>
            </div>
          </div>
          <FormField name="name" label="Name" />
        </Fragment>
      )
    }).then((dialogResult) => {
      if (dialogResult.result) {
        dispatch(
          uploadFile({
            name: dialogResult.value.name,
            parent: fileState.path,
            file: dialogResult.value.file
          })
        );
      }
    });
  };

  const downloadFile = (data: FileMetaData[]) => {
    const url = data[0]?.downloadUrl;
    if (url) {
      window.open(url, '_download');
    }
  };

  const handleOpenFiles = (data: FileMetaData) => {
    if (data) {
      if (data.name === '/') {
        navigate('/files');
      } else {
        if (data.isDir) {
          navigate(`/files/item/${data.id}`);
        } else if (data.downloadUrl) {
          downloadFile([data]);
        }
      }
    }
  };

  const deleteFiles = (data: FileMetaData[]) => {
    if (data && data[0]) {
      confirm({
        title: `Delete ${data[0].name}`,
        message: data[0].isDir ? 'Permanently delete this folder and all children?' : 'Permanently delete these files?'
      }).then((result) => {
        if (result) {
          fileService.deleteFileByPath(data[0].id).then(() => {
            dispatch(loadFiles(filePath));
          });
        }
      });
    }
  };

  return (
    <Fragment>
      <div
        className={cx(
          'col',
          css`
            height: 100%;
          `
        )}
      >
        {fileState.error && <Alert color="warning">{fileState.error}</Alert>}
        <FileBrowser
          files={fileState.item?.children || []}
          folderChain={folderChain}
          fileActions={[
            ChonkyActions.CreateFolder,
            ChonkyActions.UploadFiles,
            ChonkyActions.DownloadFiles,
            ChonkyActions.DeleteFiles
          ]}
          onFileAction={(data) => {
            console.log('file browser action', data);
            switch (data.action.id) {
              case 'create_folder':
                openModalEditFolder();
                break;
              case 'open_files':
                handleOpenFiles((data.payload as any)?.targetFile as FileMetaData);
                break;
              case 'open_parent_folder':
                break;
              case 'upload_files':
                openModalUploadFile();
                break;
              case 'download_files':
                downloadFile(data.state.selectedFilesForAction);
                break;
              case 'delete_files':
                deleteFiles(data.state.selectedFilesForAction);
                break;
            }
          }}
        >
          <FileNavbar />
          <FileToolbar />
          <FileList />
          <FileContextMenu />
        </FileBrowser>
      </div>
    </Fragment>
  );
};

export default FilesIndexPage;
