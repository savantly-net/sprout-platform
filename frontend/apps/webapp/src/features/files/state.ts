import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fileService } from './service';
import { FileDataRequest, FileDataResponse, FileMetaData } from './types';

interface LoadFilesResponse {
  path: string;
  item: FileDataResponse;
}
interface CreateFileResponse {
  path: string;
  file: FileMetaData;
}
interface CreateFileRequest {
  parent?: string;
  name: string;
  file?: any;
}

export interface FileState {
  path?: string;
  item?: FileDataResponse;
  fetching: boolean;
  fetched: boolean;
  error?: string;
}

const initialState: FileState = {
  fetched: false,
  fetching: false,
  error: ''
};

export const loadFiles = createAsyncThunk('files/load', async (path: string, thunkAPI) => {
  const promise = new Promise<LoadFilesResponse>((resolve, reject) => {
    fileService.getFilesByPath(path).then((response) => {
      resolve({
        path,
        item: response.data
      });
    });
  });
  return promise;
});

export const createFolder = createAsyncThunk('files/create-folder', async (arg: CreateFileRequest, thunkAPI) => {
  const promise = new Promise<CreateFileResponse>((resolve, reject) => {
    const request: FileDataRequest = {
      name: arg.name,
      parent: arg.parent,
      isDir: true,
      icon: 'folder'
    };
    fileService.createFile(request).then((response) => {
      resolve({
        path: response.data.id,
        file: response.data
      });
    });
  });
  return promise;
});

export const uploadFile = createAsyncThunk('files/upload-file', async (arg: CreateFileRequest, thunkAPI) => {
  const promise = new Promise<CreateFileResponse>((resolve, reject) => {
    const request: FileDataRequest = {
      name: arg.name,
      parent: arg.parent,
      isDir: false,
      icon: 'file'
    };
    fileService.uploadFile(request, arg.file).then((response) => {
      resolve({
        path: response.data.id,
        file: response.data
      });
    });
  });
  return promise;
});

const filesSlice = createSlice({
  name: 'files',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      loadFiles.pending,
      (state, action): FileState => {
        return {
          ...state,
          fetched: false,
          fetching: true,
          error: ''
        };
      }
    );
    builder.addCase(
      loadFiles.fulfilled,
      (state, action): FileState => {
        return {
          ...state,
          path: action.payload.path,
          item: action.payload.item,
          fetched: true,
          fetching: false,
          error: ''
        };
      }
    );
    builder.addCase(
      loadFiles.rejected,
      (state, action): FileState => {
        return {
          ...state,
          fetched: true,
          fetching: false,
          error: action.error.message
        };
      }
    );
    builder.addCase(
      createFolder.pending,
      (state, action): FileState => {
        return {
          ...state,
          fetched: false,
          fetching: true,
          error: ''
        };
      }
    );
    builder.addCase(
      createFolder.fulfilled,
      (state, action): FileState => {
        const currentItem = state.item || {
          id: 'root',
          isDir: true,
          name: '/',
          folderChain: []
        };
        const currentChildren = state.item?.children || [];
        return {
          ...state,
          item: {
            ...currentItem,
            children: [...currentChildren, action.payload.file]
          },
          fetched: true,
          fetching: false,
          error: ''
        };
      }
    );
    builder.addCase(
      createFolder.rejected,
      (state, action): FileState => {
        return {
          ...state,
          fetched: true,
          fetching: false,
          error: action.error.message
        };
      }
    );
    builder.addCase(
      uploadFile.pending,
      (state, action): FileState => {
        return {
          ...state,
          fetched: false,
          fetching: true,
          error: ''
        };
      }
    );
    builder.addCase(
      uploadFile.fulfilled,
      (state, action): FileState => {
        const currentItem = state.item || {
          id: 'root',
          isDir: true,
          name: '/',
          folderChain: []
        };
        const currentChildren = state.item?.children || [];
        return {
          ...state,
          item: {
            ...currentItem,
            children: [...currentChildren, action.payload.file]
          },
          fetched: true,
          fetching: false,
          error: ''
        };
      }
    );
    builder.addCase(
      uploadFile.rejected,
      (state, action): FileState => {
        return {
          ...state,
          fetched: true,
          fetching: false,
          error: action.error.message
        };
      }
    );
  }
});

export const filesReducer = filesSlice.reducer;
