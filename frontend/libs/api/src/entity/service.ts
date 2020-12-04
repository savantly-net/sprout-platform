import axios, { AxiosRequestConfig } from 'axios';
import { QueryResponse } from './types';

export interface BaseEntityServiceProps<T> {
  baseUrl: string;
}
export class BaseEntityService<T> {
  constructor(protected props: BaseEntityServiceProps<T>) {}

  load(config?: AxiosRequestConfig) {
    return axios.get<QueryResponse<T>>(this.props.baseUrl, config);
  }
  create(item: T, config?: AxiosRequestConfig) {
    return axios.post<T>(this.props.baseUrl, item, config);
  }
  update(item: T, config?: AxiosRequestConfig) {
    return axios.put<T>(this.props.baseUrl, item, config);
  }
  delete(id: string, config?: AxiosRequestConfig) {
    return axios.delete<void>(`${this.props.baseUrl}/${id}`, config);
  }
}
