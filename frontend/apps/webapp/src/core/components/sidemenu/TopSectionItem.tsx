import React, { FC } from 'react';
import SideMenuDropDown from './SideMenuDropDown';
import { Icon } from '@savantly/sprout-ui';
import { NavModelItem } from '@savantly/sprout-api';
import { NavLink } from 'react-router-dom';

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
    if(link.url){
      return (<NavLink to={link.url}></NavLink>);
    } else {
      return renderAnchor();
    }
  }

  return (
    <div className="sidemenu-item dropdown">
      {renderLink()}
      <SideMenuDropDown link={link} onHeaderClick={onClick} />
    </div>
  );
};

export default TopSectionItem;
