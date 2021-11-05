import { NavModel, NavModelBreadcrumb, NavModelItem } from '@savantly/sprout-api';
import { css } from 'emotion';
import React, { FormEvent, ReactElement } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import { IconName } from '../../types';
import { Icon } from '../Icon/Icon';

export interface Props {
  model: NavModel;
}

const SelectNav = ({ children, customCss }: { children: NavModelItem[]; customCss: string }) => {
  const navigate = useNavigate();
  if (!children || children.length === 0) {
    return null;
  }

  const defaultSelectedItem = children.find((navItem) => {
    return navItem.active === true;
  });

  const gotoUrl = (evt: FormEvent) => {
    const element = evt.target as HTMLSelectElement;
    const url = element.options[element.selectedIndex].value;
    navigate(url);
  };

  return (
    <div className={`gf-form-select-wrapper width-20 ${customCss}`}>
      <label
        className={`gf-form-select-icon ${defaultSelectedItem ? defaultSelectedItem?.icon : ''}`}
        htmlFor="page-header-select-nav"
      />
      {/* Label to make it clickable */}
      <select
        className="gf-select-nav gf-form-input form-control"
        value={defaultSelectedItem?.url ?? ''}
        onChange={gotoUrl}
        id="page-header-select-nav"
      >
        {children.map((navItem: NavModelItem) => {
          if (navItem.hideFromTabs) {
            // TODO: Rename hideFromTabs => hideFromNav
            return null;
          }
          return (
            <option key={navItem.url} value={navItem.url}>
              {navItem.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const Navigation = ({ children }: { children: NavModelItem[] }) => {
  if (!children || children.length === 0) {
    return null;
  }

  const goToUrl = (index: number) => {
    return children[index] ? children[index].url || '' : '';
  };

  const getIcon = (icon?: string | Element | ReactElement) => {
    if (typeof icon == 'string') {
      return <Icon name={icon || ('' as IconName)} className="mr-1" />;
    } else {
      return icon;
    }
  };

  return (
    <div>
      <SelectNav customCss="page-header__select-nav" children={children} />
      <Nav tabs className="page-header__tabs">
        {children.map((child, index) => {
          return (
            !child.hideFromTabs && (
              <NavItem key={`child-${index}`}>
                <NavLink className="nav-link" to={goToUrl(index)}>
                  {getIcon(child.icon)}
                  {child.text}
                </NavLink>
              </NavItem>
            )
          );
        })}
      </Nav>
    </div>
  );
};

export class PageHeader extends React.Component<Props, any> {
  renderTitle(title: string, breadcrumbs: NavModelBreadcrumb[]) {
    if (!title && (!breadcrumbs || breadcrumbs.length === 0)) {
      return null;
    }

    if (!breadcrumbs || breadcrumbs.length === 0) {
      return <h1 className="page-header__title">{title}</h1>;
    }

    const breadcrumbsResult = [];
    for (const bc of breadcrumbs) {
      if (bc.url) {
        breadcrumbsResult.push(
          <Link className="text-link" key={breadcrumbsResult.length} to={bc.url}>
            {bc.title}
          </Link>
        );
      } else {
        breadcrumbsResult.push(<span key={breadcrumbsResult.length}> / {bc.title}</span>);
      }
    }
    breadcrumbsResult.push(<span key={breadcrumbs.length + 1}> / {title}</span>);

    return <h1 className="page-header__title">{breadcrumbsResult}</h1>;
  }

  getIcon = (icon?: string | Element | ReactElement, iconClassName?: string) => {
    if (typeof icon == 'string') {
      return <Icon name={icon || ('apps' as IconName)} size="3x" className={iconClassName} />;
    } else {
      return icon;
    }
  };

  renderHeaderTitle(main: NavModelItem) {
    const iconClassName = css`
      margin-top: 14px;
    `;

    return (
      <div className="page-header__inner">
        <span className="page-header__logo">
          {/*  */}
          {main.icon && this.getIcon(main.icon, iconClassName)}
          {main.img && <img alt="logo" className="page-header__img" src={main.img} />}
        </span>

        <div className="page-header__info-block">
          {this.renderTitle(main.text, main.breadcrumbs ?? [])}
          {main.subTitle && <div className="page-header__sub-title">{main.subTitle}</div>}
        </div>
      </div>
    );
  }

  render() {
    const { model } = this.props;

    if (!model) {
      return null;
    }

    const main = model.main;
    const children = main.children;

    return (
      <div className="page-header-canvas">
        <div className="page-container">
          <div className="page-header">
            {this.renderHeaderTitle(main)}
            {children && children.length && <Navigation children={children} />}
          </div>
        </div>
      </div>
    );
  }
}
