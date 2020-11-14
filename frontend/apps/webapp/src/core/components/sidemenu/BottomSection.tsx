import React from 'react';
import _ from 'lodash';
import { SignIn } from './SignIn';
import BottomNavLinks from './BottomNavLinks';
import config from '../../config';
import { NavModelItem } from '@savantly/sprout-api';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../types';

const BottomSection = () => {
  const navTree: NavModelItem[] = _.cloneDeep(config.bootData.navTree);
  const bottomNav: NavModelItem[] = navTree.filter(item => item.hideFromMenu);
  const authentication = useSelector((state:StoreState) => state.authentication);

  return (
    <div className="sidemenu__bottom">
      {!authentication.isAuthenticated && <SignIn />}
      {bottomNav.map((link, index) => {
        return <BottomNavLinks link={link} user={authentication.user} key={`${link.url}-${index}`} />;
      })}
    </div>
  );
}

export default BottomSection;
