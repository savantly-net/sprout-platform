import { NavModel, NavModelBreadcrumb, NavModelItem } from '@savantly/sprout-api';
import { Icon, IconName, Tab, TabsBar } from '@savantly/sprout-ui';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { css, cx } from 'emotion';
import React, { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export interface Props {
  model: NavModel;
}

/**
 * Return path and search part (as object) of url
 */
function parseUrlValue(url: string) {
  const urlParts = url.split('?');
  const query: any = {};
  if (urlParts.length === 1) {
    return {
      path: urlParts[0],
      query: {}
    };
  }
  const search = urlParts[1];
  const searchParamsSegments = search.split('&');
  const params: any = {};
  for (const p of searchParamsSegments) {
    const keyValuePair = p.split('=');
    if (keyValuePair.length > 1) {
      // key-value param
      const key = decodeURIComponent(keyValuePair[0]);
      const value = decodeURIComponent(keyValuePair[1]);
      params[key] = value;
    } else if (keyValuePair.length === 1) {
      // boolean param
      const key = decodeURIComponent(keyValuePair[0]);
      params[key] = true;
    }
  }
  return {
    path: urlParts[0],
    query: params
  };
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
    const { path, query } = parseUrlValue(url);
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
        className="gf-select-nav gf-form-input"
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
  const navigate = useNavigate();
  if (!children || children.length === 0) {
    return null;
  }

  const goToUrl = (index: number) => {
    children.forEach((child, i) => {
      if (i === index) {
        const { path, query } = parseUrlValue(child.url || '');
        navigate(child.url || '');
      }
    });
  };

  return (
    <div>
      <SelectNav customCss="page-header__select-nav" children={children} />
      <Nav tabs className="page-header__tabs">
        {children.map((child, index) => {
          return (
            !child.hideFromTabs && (
              <NavItem>
                <NavLink
                  className={cx({ active: child.active })}
                  onClick={() => {
                    goToUrl(index);
                  }}
                >
                  <Icon name={child.icon as IconName} />
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

export default class PageHeader extends React.Component<Props, any> {
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

  renderHeaderTitle(main: NavModelItem) {
    const iconClassName =
      main.icon === 'grafana'
        ? css`
            margin-top: 12px;
          `
        : css`
            margin-top: 14px;
          `;

    return (
      <div className="page-header__inner">
        <span className="page-header__logo">
          {/*  */}
          {main.icon && <Icon name={main.icon as IconName} size="xxxl" className={iconClassName} />}
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
