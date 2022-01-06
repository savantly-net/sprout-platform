import React, { useState } from 'react';
import useDevice from '../../hooks/useDevice';
import BottomSection from './BottomSection';
import TopSection from './TopSection';

export const SideMenu = () => {
  const { isMobile } = useDevice();
  const [collapsed, setCollapsed] = useState(!isMobile);

  return (
    <div className="sidemenu1">
      <TopSection key="topsection" collapsed={collapsed} setCollapsed={setCollapsed} />
      <BottomSection key="bottomsection" collapsed={collapsed} setCollapsed={setCollapsed} />
    </div>
  );
};
