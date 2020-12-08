import { NavModelItem } from '@savantly/sprout-api';
import { Icon, IconName } from '@sprout-platform/ui';
import { css } from 'emotion';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

export interface Props {
  child: NavModelItem;
}

const DropDownChild: FC<Props> = (props) => {
  const { child } = props;
  const listItemClassName = child.divider ? 'divider' : '';
  const iconClassName = css`
    margin-right: 0.3rem;
  `;

  let useAnchor = false;
  let useNavLink = false;
  if (child.url && child.url.startsWith('http')) {
    useAnchor = true;
  } else if (child.url) {
    useNavLink = true;
  }

  return (
    <li className={listItemClassName}>
      {useNavLink && (
        <NavLink to={child.url || ''}>
          {child.icon && <Icon name={child.icon as IconName} className={iconClassName} />}
          {child.text}
        </NavLink>
      )}
      {useAnchor && (
        <a href={child.url} target={child.target}>
          {child.icon && <Icon name={child.icon as IconName} className={iconClassName} />}
          {child.text}
        </a>
      )}
    </li>
  );
};

export default DropDownChild;
