import { FileData } from 'chonky';

export interface FileMetaData extends FileData {
  id: string;
  parent?: string;
  downloadUrl?: string;
}

interface FolderChainItem {
  id: string;
  name: string;
  isDir: boolean;
}

export interface FileDataResponse {
  name: string;
  id: string;
  isDir: boolean;
  color?: string;
  icon?: string;
  parent?: string;
  children: FileMetaData[];
  folderChain: FolderChainItem[];
}

export interface FileDataRequest {
  name: string;
  id?: string;
  isDir?: boolean;
  color?: string;
  icon?: string;
  parent?: string;
}
