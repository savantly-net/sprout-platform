import { NavModelItem } from '@savantly/sprout-api';
import { Icon } from '@savantly/sprout-ui';
import { css } from 'emotion';
import React, { PureComponent } from 'react';
import { CoreEvents } from '../../../types';
import appEvents from '../../app_events';
import { getFooterLinks } from '../Footer/Footer';

export interface Props {
  link: NavModelItem;
}

export default class BottomNavLinks extends PureComponent<Props> {
  onOpenShortcuts = () => {
    appEvents.emit(CoreEvents.showModal, {
      templateHtml: '<help-modal></help-modal>'
    });
  };

  getIcon = (icon: any, className?: string) => {
    if (typeof icon == 'string') {
      return <Icon name={icon || ('cube' as any)} size="xl" className={className} />;
    } else {
      return icon || ('cube' as any);
    }
  };

  render() {
    const { link } = this.props;
    const subMenuIconClassName = css`
      margin-right: 8px;
    `;

    let children = link.children || [];

    if (link.id === 'help') {
      children = getFooterLinks();
    }

    return (
      <div className="sidemenu-item dropdown dropup">
        <a href={link.url} className="sidemenu-link" target={link.target}>
          <span className="icon-circle sidemenu-icon">
            {link.icon && this.getIcon(link.icon)}
            {link.img && <img src={link.img} />}
          </span>
        </a>
        <ul className="dropdown-menu dropdown-menu--sidemenu" role="menu">
          {link.subTitle && (
            <li className="sidemenu-subtitle">
              <span className="sidemenu-item-text">{link.subTitle}</span>
            </li>
          )}

          {children.map((child, index) => {
            return (
              <li key={`${child.text}-${index}`}>
                <a href={child.url} target={child.target} rel="noopener">
                  {child.icon && this.getIcon(child.icon, subMenuIconClassName)}
                  {child.text}
                </a>
              </li>
            );
          })}

          {link.id === 'help' && (
            <li key="keyboard-shortcuts">
              <a onClick={() => this.onOpenShortcuts()}>
                <Icon name="keyboard" className={subMenuIconClassName} /> Keyboard shortcuts
              </a>
            </li>
          )}

          <li className="side-menu-header">
            <span className="sidemenu-item-text">{link.text}</span>
          </li>
        </ul>
      </div>
    );
  }
}
