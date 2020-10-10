import React, { FC } from 'react';
import _ from 'lodash';
import TopSectionItem from './TopSectionItem';
import config from '../../config';
import { getLocationSrv } from '@savantly/sprout-runtime';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../types';

const TopSection: FC<any> = () => {
  const navTree = useSelector((state: StoreState) => state.navTree.items);
  const mainLinks = _.filter(navTree, item => !item.hideFromMenu);
  const searchLink = {
    text: 'Search',
    icon: 'search',
  };

  const onOpenSearch = () => {
    getLocationSrv().update({ query: { search: 'open' }, partial: true });
  };

  return (
    <div className="sidemenu__top">
      <TopSectionItem link={searchLink} onClick={onOpenSearch} />
      {mainLinks.map((link, index) => {
        return <TopSectionItem link={link} key={`${link.id}-${index}`} />;
      })}
    </div>
  );
};

export default TopSection;
