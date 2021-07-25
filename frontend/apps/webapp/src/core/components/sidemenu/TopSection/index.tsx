import React, { FC, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent, SidebarHeader } from 'react-pro-sidebar';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../../types';
import { filter } from 'lodash';
import TopSectionItemNew from './TopSectionItemNew';
import { HamburgerIcon } from '@chakra-ui/icons';

import 'react-pro-sidebar/dist/css/styles.css';
import './style.scss';
import { Branding } from '../../Branding/Branding';
import useDevice from '../../../hooks/useDevice';

const TopSectionNew: FC<any> = () => {
  const navTree = useSelector((state: StoreState) => state.navTree.items);
  const mainLinks = filter(navTree, (item) => !item.hideFromMenu).sort(
    (a, b) => (a?.position || 0) - (b?.position || 0)
  );
  const { isMobile } = useDevice();
  const [toggled, onToggle] = useState(false);
  const [collapsed, setCollapsed] = useState(!isMobile);
  useEffect(() => {
    if (isMobile) {
      return setCollapsed(false);
    }
    setCollapsed(true);
  }, [isMobile]);

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
            <NavLink to={'/'}>
              <Branding.MenuLogo width={30} />
            </NavLink>
          </span>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="circle" popperArrow={true}>
            {mainLinks.map((link) => {
              return <TopSectionItemNew key={link.id} link={link} firstChild={true} />;
            })}
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </>
  );
};

export default TopSectionNew;
