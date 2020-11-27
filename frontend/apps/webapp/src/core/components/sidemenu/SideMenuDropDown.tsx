import React, { FC } from 'react';
import _ from 'lodash';
import DropDownChild from './DropDownChild';
import { NavModelItem } from '@savantly/sprout-api';
import { NavLink } from 'react-router-dom';

interface Props {
  link: NavModelItem;
  onHeaderClick?: () => void;
}

const SideMenuDropDown: FC<Props> = (props) => {
  const { link, onHeaderClick } = props;
  let childrenLinks: NavModelItem[] = [];
  if (link.children) {
    childrenLinks = _.filter(link.children, (item) => !item.hideFromMenu);
  }

  return (
    <ul className="dropdown-menu dropdown-menu--sidemenu" role="menu">
      <li className="side-menu-header">
        <NavLink to={link.url || '#'} onClick={onHeaderClick} className="side-menu-header-link">
          <span className="sidemenu-item-text">{link.text}</span>
        </NavLink>
      </li>
      {childrenLinks.map((child, index) => {
        return <DropDownChild child={child} key={`${child.url}-${index}`} />;
      })}
    </ul>
  );
};

export default SideMenuDropDown;
