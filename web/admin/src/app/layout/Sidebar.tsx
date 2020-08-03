import React, { Component } from 'react';
import { IRootState } from '../state/reducers';
import { connect } from 'react-redux';
import { SidebarItemsState, ISidebarItem } from '../state/reducers/sidebar';
import MenuItem from '../components/MenuItem';

export interface SidebarProps extends StateProps, DispatchProps {
  items: SidebarItemsState
}

export const Sidebar = (props:SidebarProps) => {

  const demoItems:Array<ISidebarItem> = [
    {
      title: 'Icons',
      cssClassName: '',
      linkTo: '/icons'
    },
    {
      title: 'Login',
      cssClassName: '',
      linkTo: '/login'
    },
    {
      title: 'Register',
      cssClassName: '',
      linkTo: '/register'
    },
    {
      title: 'Charts',
      cssClassName: '',
      linkTo: '/charts'
    },
    {
      title: 'Error 500',
      cssClassName: '',
      linkTo: '/errors/500'
    },
    {
      title: 'Error 404',
      cssClassName: '',
      linkTo: '/errors/404'
    }
  ]

  const isPathActive = (path: string) => {
    // TODO
    return true;
  }

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
        <a className="sidebar-brand brand-logo" href="/"><img src={require("../../assets/images/logo.png")} alt="logo" /></a>
        <a className="sidebar-brand brand-logo-mini pt-3" href="/"><img src={require("../../assets/images/favicon.png" )} alt="logo" /></a>
      </div>
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link" href="https://github.com/savantly-net/sprout-platform" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-book menu-icon" ></i>
              <span className="menu-title">Documentation</span>
          </a>
        </li>
        {props.items.map(({linkTo, title, cssClassName}) => (
          <MenuItem key={title} active={isPathActive(linkTo)} title={title} cssClassName={cssClassName} linkTo={linkTo} />
        ))}
        <li className="dropdown-divider">Demos</li>
        {demoItems.map(({linkTo, title, cssClassName}) => (
          <MenuItem key={title} active={isPathActive(linkTo)} title={title} cssClassName={cssClassName} linkTo={linkTo} />
        ))}
      </ul>
    </nav>
  );

}


const mapStateToProps = ({ sidebarItems }: IRootState) => ({
  items: sidebarItems
});

const mapDispatchToProps = {  };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);