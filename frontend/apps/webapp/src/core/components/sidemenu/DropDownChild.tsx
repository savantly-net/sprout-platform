import { Icon, IconName, useTheme } from '@savantly/sprout-ui';
import { css } from 'emotion';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

export interface Props {
  child: any;
}

const DropDownChild: FC<Props> = (props) => {
  const { child } = props;
  const listItemClassName = child.divider ? 'divider' : '';
  const theme = useTheme();
  const iconClassName = css`
    margin-right: ${theme.spacing.sm};
  `;

  return (
    <li className={listItemClassName}>
      {child.url && (
        <NavLink to={child.url}>
          {child.icon && <Icon name={child.icon as IconName} className={iconClassName} />}
          {child.text}
        </NavLink>
      )}
    </li>
  );
};

export default DropDownChild;
