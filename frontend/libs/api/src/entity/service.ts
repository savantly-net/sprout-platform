import axios, { AxiosRequestConfig } from 'axios';
import { QueryResponse } from './types';

export interface BaseEntityServiceProps<T> {
  baseUrl: string;
}
export class BaseEntityService<T> {
  constructor(protected props: BaseEntityServiceProps<T>) {}

  load(config?: AxiosRequestConfig) {
    return axios.get<QueryResponse<T> | T[]>(this.props.baseUrl, config);
  }
  getById(id: string, config?: AxiosRequestConfig) {
    return axios.get<T>(`${this.props.baseUrl}/${id}`, config);
  }
  create(item: T, config?: AxiosRequestConfig) {
    return axios.post<T>(this.props.baseUrl, item, config);
  }
  update(id: string, item: T, config?: AxiosRequestConfig) {
    return axios.put<T>(`${this.props.baseUrl}/${id}`, item, config);
  }
  updateV2(id: string, item: T, config?: AxiosRequestConfig) {
    return axios.put<T>(`${this.props.baseUrl}`, item, config);
  }
  delete(id: string, config?: AxiosRequestConfig) {
    return axios.delete<void>(`${this.props.baseUrl}/${id}`, config);
  }
}
