import { Icon } from '@savantly/sprout-ui';
import React from 'react';
import { CoreEvents } from '../../../types';
import appEvents from '../../app_events';
import config from '../../config';
import { Branding } from '../Branding/Branding';
import BottomSection from './BottomSection';
import TopSection from './TopSection';

const homeUrl = config.appSubUrl || '/';

export const SideMenu = () => {
  const toggleSideMenuSmallBreakpoint = () => {
    appEvents.emit(CoreEvents.toggleSidemenuMobile);
  };

  return (
    <div className="sidemenu">
      <a href={homeUrl} className="sidemenu__logo" key="logo">
        <Branding.MenuLogo />
      </a>
      <div className="sidemenu__logo_small_breakpoint" onClick={toggleSideMenuSmallBreakpoint} key="hamburger">
        <Icon name="bars" size="xl" />
        <span className="sidemenu__close">
          <Icon name="times" />
          &nbsp;Close
        </span>
      </div>
      <TopSection key="topsection" />
      <BottomSection key="bottomsection" />
    </div>
  );
};
