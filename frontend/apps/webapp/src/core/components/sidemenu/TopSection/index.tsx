import { HamburgerIcon } from '@chakra-ui/icons';
import { filter } from 'lodash';
/* eslint-disable */
import React, { FC, useEffect, useState } from 'react';
/* eslint-enable */
import { Menu, ProSidebar, SidebarContent, SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../../types';
import useDevice from '../../../hooks/useDevice';
import { Branding } from '../../Branding/Branding';
import './style.scss';
import TopSectionItem from './TopSectionItem';

const TopSection: FC<any> = ({ collapsed, setCollapsed }) => {
  const navTree = useSelector((state: StoreState) => state.navTree.items);
  const mainLinks = filter(navTree, (item) => !item.hideFromMenu).sort(
    (a, b) => (a?.position || 0) - (b?.position || 0)
  );
  const { isMobile } = useDevice();
  const [toggled, onToggle] = useState(false);
  useEffect(() => {
    if (isMobile) {
      return setCollapsed(false);
    }
    setCollapsed(true);
  }, [isMobile,setCollapsed]);

  console.log('mainLinks', mainLinks);

  return (
    <>
      {isMobile ? (
        <div className="TopSection__mobileMenuIcon" onClick={() => onToggle(true)}>
          <HamburgerIcon w={20} h={20} />
        </div>
      ) : null}
      <ProSidebar collapsed={collapsed} breakPoint="md" toggled={toggled} onToggle={onToggle}>
        <SidebarHeader>
          <span className="TopSection__logoContainer" onClick={() => !isMobile && setCollapsed(!collapsed)}>
            <HamburgerIcon w={20} h={20} />
          </span>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="round" popperArrow={true}>
            <TopSectionItem key={'home'} link={{ text: 'Home', target: '/', icon: <Branding.MenuLogo /> }}>
              <Branding.MenuLogo width={30} />{' '}
            </TopSectionItem>
            {mainLinks.map((link) => {
              return <TopSectionItem key={link.id} link={link} firstChild={true} />;
            })}
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </>
  );
};

export default TopSection;
