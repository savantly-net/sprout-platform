import { NavModelItem } from '@savantly/sprout-api';
import { Icon, IconName } from '@sprout-platform/ui';
import { css } from 'emotion';
import _ from 'lodash';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

export interface Props {
  child: NavModelItem;
  depth?: number;
}

const NestedDropDown = ({ link, depth }: { link: NavModelItem; depth: number }) => {
  let childrenLinks: NavModelItem[] = [];
  if (link.children) {
    childrenLinks = _.filter(link.children, (item) => !item.hideFromMenu);
  }

  return (
    <ul
      className={css`
        min-width: 140px;
        margin: 2px 0 0;
        list-style: none;
      `}
    >
      {childrenLinks.map((child, index) => {
        return <DropDownChild child={child} key={`${child.text}-${index}-${depth}`} depth={depth + 1} />;
      })}
    </ul>
  );
};

const DropDownChild: FC<Props> = (props) => {
  const { child, depth } = props;

  const renderChildren = !!child.children && child.children.length > 0;
  const listItemClassName = child.divider
    ? 'divider'
    : css`
        display: ${renderChildren ? 'inline-flex' : 'block'};
      `;
  /*
  const anchorClassName = css`
    padding-left: ${(depth || 0) * 30 + 10}px !important;
  `;
  */
  const anchorClassName = css``;
  const iconClassName = css`
    margin-right: 0.3rem;
  `;

  console.log('DropDownChild', child);
  let useClickHandler = false;
  let useAnchor = false;
  let useNavLink = false;
  if (child.onClick) {
    useClickHandler = true;
  } else if (child.url && child.url.startsWith('http')) {
    useAnchor = true;
  } else if (child.url) {
    useNavLink = true;
  }

  return (
    <li className={listItemClassName}>
      {useClickHandler && (
        <a href={child.url} onClick={child.onClick} className={anchorClassName}>
          {child.icon && <Icon name={child.icon as IconName} className={iconClassName} />}
          {child.text}
        </a>
      )}
      {useNavLink && (
        <NavLink to={child.url || ''} className={anchorClassName}>
          {child.icon && <Icon name={child.icon as IconName} className={iconClassName} />}
          {child.text}
        </NavLink>
      )}
      {useAnchor && (
        <a href={child.url} target={child.target} className={anchorClassName}>
          {child.icon && <Icon name={child.icon as IconName} className={iconClassName} />}
          {child.text}
        </a>
      )}
      {renderChildren && <NestedDropDown link={child} depth={depth || 0} />}
    </li>
  );
};

export default DropDownChild;
