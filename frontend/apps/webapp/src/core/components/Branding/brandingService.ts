import axios from 'axios';
import { SERVER_API_URL } from '../../../config/constants';

export type StyleMatchType = 'LOCATION';

export interface StyleMap {
  matchType: StyleMatchType;
  matchExpression: string;
  value: string;
}

export const getBrandingStyles = () => {
  return axios.get<StyleMap[]>(`${SERVER_API_URL}/api/public/brand/styles`);
};
