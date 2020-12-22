import { SERVER_API_URL } from '../../config/constants';
import { sproutApiSvc } from '../../core/services/sproutApiSvc';
import { FileDataRequest, FileDataResponse, FileMetaData } from './types';
import { FileService } from '@savantly/sprout-api'
import { setFileService } from '@savantly/sprout-runtime';

class FileServiceImpl implements FileService {
  getFilesByPath = (path?: string) => {
    return sproutApiSvc.get<FileDataResponse>(`${SERVER_API_URL}/api/files/list/${path || ''}`);
  };

  deleteFileByPath = (path?: string) => {
    return sproutApiSvc.delete(`${SERVER_API_URL}/api/files/list/${path || ''}`);
  };

  createFile = (request: FileDataRequest) => {
    return sproutApiSvc.post<FileMetaData>(`${SERVER_API_URL}/api/files/create`, request);
  };

  uploadFile = (request: FileDataRequest, file: any) => {
    
    //const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const metaData = new Blob([JSON.stringify(request)], { type: 'application/json' })

    let fd = new FormData();
    fd.append('file', file);
    fd.append("metaData", metaData)
    console.log(fd);
    return sproutApiSvc.post<FileMetaData>(`${SERVER_API_URL}/api/files/upload`, fd);
  };
}

export const fileService = new FileServiceImpl();
setFileService(fileService);
