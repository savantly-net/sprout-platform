import { NavModelItem } from '@savantly/sprout-api';
import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../types';
import BottomNavLinks from './BottomNavLinks';
import { SignIn } from './SignIn';

import { Icon } from '@savantly/sprout-ui';
import { Menu, MenuItem, ProSidebar, SidebarContent, SidebarHeader, SubMenu } from 'react-pro-sidebar';
import useDevice from '../../hooks/useDevice';
import { sproutApiSvc } from '../../services/sproutApiSvc';
import { logout } from '../../reducers/authentication';
import { NavLink, useNavigate } from 'react-router-dom';
const BottomSection: FC<any> = ({collapsed, setCollapsed}) => {
  const navTree = useSelector((state: StoreState) => state.navTree.items);
  const bottomNav: NavModelItem[] = navTree.filter((item) => item.hideFromMenu);
  const authentication = useSelector((state: StoreState) => state.authentication);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isMobile } = useDevice();
  const [toggled, onToggle] = useState(false);
  const [error, setError] = useState('');
  const once = true;

  useEffect(() => {
    if (isMobile) {
      return setCollapsed(false);
    }
    setCollapsed(true);
  }, [isMobile,setCollapsed]);
  const getIcon = (icon: any) => {
    if (typeof icon == 'string') {
      return <Icon name={icon || ('cube' as any)} />;
    } else {
      return icon || ('cube' as any);
    }
  };

  const submitLogout = async () => {
    sproutApiSvc
    .get('/api/logout')
    .then((value) => {
      navigate('/login');
    })
    .catch((failed: Error) => {
      console.error(failed);
      setError(failed.message);
      dispatch(logout());
    })
  };

  return (
    <div className="sidemenu__bottom">
      {!authentication.isAuthenticated && <SignIn />}
      {bottomNav.map((link, index) => {
        return <BottomNavLinks link={link} key={`${link.url}-${index}`} />;
      })}
      <ProSidebar collapsed={collapsed} breakPoint="md" toggled={toggled} onToggle={onToggle}>
        <SidebarHeader></SidebarHeader>
        <SidebarContent>
          <Menu iconShape="round" popperArrow={true}>
            <SubMenu icon={getIcon(`user-circle`)} title={`Profile`}>
              <MenuItem icon={getIcon(`user`)}>
                <NavLink to={`/profile`}>Profile</NavLink>
              </MenuItem>
              <MenuItem icon={getIcon(`lock`)} onClick={submitLogout}>
                Sign out
              </MenuItem>
            </SubMenu>
            
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </div>
  );
};

export default BottomSection;
