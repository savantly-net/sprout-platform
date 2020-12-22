import { FileData } from 'chonky';

export interface FileMetaData {
  id: string;
  parent?: string;
  downloadUrl?: string;
  name: string;
  ext?: string;
  isDir?: boolean;
  isHidden?: boolean;
  isSymlink?: boolean;
  isEncrypted?: boolean;
  openable?: boolean;
  selectable?: boolean;
  draggable?: boolean;
  droppable?: boolean;
  dndOpenable?: boolean;
  size?: number;
  modDate?: Date | string;
  childrenCount?: number;
  color?: string;
  icon?: string | any;
  thumbnailUrl?: string;
  folderChainIcon?: string | any;
  [property: string]: any;
}

export interface FolderChainItem {
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
