import React, { FC, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent, SidebarHeader } from 'react-pro-sidebar';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../../types';
import { filter } from 'lodash';
import TopSectionItem from './TopSectionItem';
import { HamburgerIcon } from '@chakra-ui/icons';

import 'react-pro-sidebar/dist/css/styles.css';
import './style.scss';
import { Branding } from '../../Branding/Branding';
import useDevice from '../../../hooks/useDevice';

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
  }, [isMobile]);

  console.log('mainLinks', mainLinks);

  return (
    <>
      {isMobile ? (
        <div className="TopSection__mobileMenuIcon">
          <HamburgerIcon w={20} h={20} onClick={() => onToggle(true)} />
        </div>
      ) : null}
      <ProSidebar collapsed={collapsed} breakPoint="md" toggled={toggled} onToggle={onToggle}>
        <SidebarHeader>
          <span className="TopSection__logoContainer">
            <Branding.MenuLogo width={30} onClick={!isMobile ? () => setCollapsed(!collapsed) : null} />
          </span>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="circle" popperArrow={true}>
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
