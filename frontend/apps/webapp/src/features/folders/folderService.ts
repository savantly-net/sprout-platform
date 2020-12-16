import { sproutApiSvc } from "../../core/services/sproutApiSvc";

export interface Folder {
  id: string;
  name: string;
  icon: string;
  parent: string;
  children: Folder[];
}

export const folderService = {
  getFolders: () => {
    return sproutApiSvc.get<Folder[]>('/api/folders');
  },
  createFolder: (folder: Folder) => {
    console.log('creating folder: ', folder);
    return sproutApiSvc.post<Folder>('/api/folders', folder);
  },
  deleteFolder: (id: string) => {
    console.log('deleting folder:', id);
    return sproutApiSvc.delete(`/api/folders/${id}`);
  }
};
