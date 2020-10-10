import { useSelector } from 'react-redux';
import { StoreState } from '../../types/store';
import { getNavModel } from '../selectors/navModel';
import { NavModel } from '@savantly/sprout-api';

export const useNavModel = (id: string): NavModel => {
  const navIndex = useSelector((state: StoreState) => state.navIndex);
  return getNavModel(navIndex, id);
};
