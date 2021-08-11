import React, { useState } from 'react';
import { CoreEvents } from '../../../types';
import appEvents from '../../app_events';
import config from '../../config';
import useDevice from '../../hooks/useDevice';
import BottomSection from './BottomSection';
import TopSection from './TopSection';

const homeUrl = config.appSubUrl || '/';

export const SideMenu = () => {
  const { isMobile } = useDevice();
  const [collapsed, setCollapsed] = useState(!isMobile);

  return (
    <div className="sidemenu1">
      <TopSection key="topsection" collapsed={collapsed} setCollapsed={setCollapsed} />
      <BottomSection key="bottomsection" />
    </div>
  );
};
