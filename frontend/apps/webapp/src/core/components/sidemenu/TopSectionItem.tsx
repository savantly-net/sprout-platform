import { NavModelItem } from '@savantly/sprout-api';
import { Icon } from '@savantly/sprout-ui';
import { css, cx } from 'emotion';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import SideMenuDropDown from './SideMenuDropDown';

export interface Props {
  link: NavModelItem;
  onClick?: () => void;
}

const TopSectionItem: FC<Props> = (props) => {
  const { link, onClick } = props;

  const shouldRenderAsAnchor = link.target || onClick;

  const renderAnchor = () => {
    return (
      <a className="sidemenu-link" href={link.url} target={link.target} onClick={onClick}>
        <span className="icon-circle sidemenu-icon">
          <Icon name={link.icon as any} size="xl" />
          {link.img && <img src={link.img} />}
        </span>
      </a>
    );
  };

  const renderLink = () => {
    if (link.url) {
      return (
        <NavLink className="sidemenu-link" to={link.url} replace={false}>
          <span className="icon-circle sidemenu-icon">
            <Icon name={link.icon as any} size="xl" />
            {link.img && <img src={link.img} />}
          </span>
        </NavLink>
      );
    } else {
      return renderAnchor();
    }
  };

  return (
    <div className={cx("sidemenu-item", "dropdown", "justify-content-center", css`
      display: flex;
      flex-direction: row;
    `)}>
      {renderLink()}
      <SideMenuDropDown link={link} onHeaderClick={onClick} />
    </div>
  );
};

export default TopSectionItem;
