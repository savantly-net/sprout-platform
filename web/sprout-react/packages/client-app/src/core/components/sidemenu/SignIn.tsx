import { Icon } from '@savantly/sprout-ui';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../types';
import { getForcedLoginUrl } from './utils';

export const SignIn = () => {
  const url = useSelector((state: StoreState) => {
    return state.router.location.pathname
  });
  const forcedLoginUrl = getForcedLoginUrl(url);

  return (
    <div className="sidemenu-item">
      <a href={forcedLoginUrl} className="sidemenu-link" target="_self">
        <span className="icon-circle sidemenu-icon">
          <Icon name="sign-in-alt" size="xl" />
        </span>
      </a>
      <a href={forcedLoginUrl} target="_self">
        <ul className="dropdown-menu dropdown-menu--sidemenu" role="menu">
          <li className="side-menu-header">
            <span className="sidemenu-item-text">Sign In</span>
          </li>
        </ul>
      </a>
    </div>
  );
};
