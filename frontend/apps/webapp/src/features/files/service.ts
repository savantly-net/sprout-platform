import axios from 'axios';
import { SERVER_API_URL } from '../../config/constants';
import { FileDataRequest, FileDataResponse, FileMetaData } from './types';

class FileService {
  getFilesByPath = (path?: string) => {
    return axios.get<FileDataResponse>(`${SERVER_API_URL}/api/files/list/${path || ''}`);
  };

  deleteFileByPath = (path?: string) => {
    return axios.delete(`${SERVER_API_URL}/api/files/list/${path || ''}`);
  };

  createFile = (request: FileDataRequest) => {
    return axios.post<FileMetaData>(`${SERVER_API_URL}/api/files/create`, request);
  };

  uploadFile = (request: FileDataRequest, file: any) => {
    
    //const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const metaData = new Blob([JSON.stringify(request)], { type: 'application/json' })

    let fd = new FormData();
    fd.append('file', file);
    fd.append("metaData", metaData)
    console.log(fd);
    return axios.post<FileMetaData>(`${SERVER_API_URL}/api/files/upload`, fd);
  };
}

export const fileService = new FileService();
