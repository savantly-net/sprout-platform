import { useOktaAuth } from '@okta/okta-react';
import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import MenuItem from '../components/MenuItem';
import { IRootState } from '../state/reducers';
import { SidebarItemsState } from '../state/reducers/sidebar';

export interface SidebarProps extends StateProps, DispatchProps {
  items: SidebarItemsState
}

export const Sidebar = (props:SidebarProps) => {

  const { authService } = useOktaAuth();

  const logout = async () => authService.logout('/');

  const isPathActive = (path: string) => {
    // TODO
    return true;
  }

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
        <a className="sidebar-brand brand-logo" href="/"><img src={props.appSettings.getValueByName('WEB_SITE_LOGO_URL')} alt="logo" /></a>
        <a className="sidebar-brand brand-logo-mini pt-3" href="/"><img src={props.appSettings.getValueByName('WEB_SITE_LOGO_MINI_URL')} alt="logo" /></a>
      </div>
      <ul className="nav">
        {props.items.map(({linkTo, title, cssClassName}) => (
          <MenuItem key={title} active={isPathActive(linkTo)} title={title} cssClassName={cssClassName} linkTo={linkTo} />
        ))}
        <li className="nav-item">
          <a className="nav-link" onClick={logout}>
              <i className="fa fa-ban menu-icon" ></i>
              <span className="menu-title">Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  );

}


const mapStateToProps = ({ sidebarItems, authentication, appSettings }: IRootState) => ({
  items: sidebarItems,
  authentication,
  appSettings
});

const mapDispatchToProps = {  };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);