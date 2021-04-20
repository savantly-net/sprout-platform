import { NavModelItem } from '@savantly/sprout-api';
import React from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../types';
import BottomNavLinks from './BottomNavLinks';
import { SignIn } from './SignIn';

const BottomSection = () => {
  const navTree = useSelector((state: StoreState) => state.navTree.items);
  const bottomNav: NavModelItem[] = navTree.filter((item) => item.hideFromMenu);
  const authentication = useSelector((state: StoreState) => state.authentication);

  return (
    <div className="sidemenu__bottom">
      {!authentication.isAuthenticated && <SignIn />}
      {bottomNav.map((link, index) => {
        return <BottomNavLinks link={link} key={`${link.url}-${index}`} />;
      })}
    </div>
  );
};

export default BottomSection;
