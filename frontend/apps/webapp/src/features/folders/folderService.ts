import Axios from 'axios';

export interface Folder {
  id: string;
  name: string;
  icon: string;
  parent: string;
  children: Folder[];
}

export const folderService = {
  getFolders: () => {
    return Axios.get<Folder[]>('/api/folders');
  },
  createFolder: (folder: Folder) => {
    console.log('creating folder: ', folder);
    return Axios.post<Folder>('/api/folders', folder);
  },
  deleteFolder: (id: string) => {
    console.log('deleting folder:', id);
    return Axios.delete(`/api/folders/${id}`);
  }
};
