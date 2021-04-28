import _ from 'lodash';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../types';
import { PrivateComponent } from '../PrivateComponent/PrivateComponent';
import TopSectionItem from './TopSectionItem';

const TopSection: FC<any> = () => {
  const navTree = useSelector((state: StoreState) => state.navTree.items);
  const mainLinks = _.filter(navTree, (item) => !item.hideFromMenu).sort(
    (a, b) => (a?.position || 0) - (b?.position || 0)
  );
  console.log(mainLinks);

  return (
    <div className="sidemenu__top">
      {/* <TopSectionItem link={searchLink} onClick={onOpenSearch} /> */}
      {mainLinks.map((link, index) => {
        return (
          (link.authority && (
            <PrivateComponent hasAnyAuthority={[link.authority]} key={`pc-${link.id}-${index}`} >
              <TopSectionItem link={link} key={`${link.id}-${index}`} />
            </PrivateComponent>
          )) || <TopSectionItem link={link} key={`${link.id}-${index}`} />
        );
      })}
    </div>
  );
};

export default TopSection;
