import { NavModelItem } from '@savantly/sprout-api';
import { MenuItem, SubMenu } from 'react-pro-sidebar';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { PrivateComponent } from '../../PrivateComponent/PrivateComponent';
import { Icon } from '@sprout-platform/ui';
import useDevice from '../../../hooks/useDevice';

export interface Props {
  link: NavModelItem;
  onClick?: () => void;
  firstChild?: boolean;
}

const TopSectionItem: FC<Props> = (props) => {
  const { link, onClick, firstChild } = props;
  const { isMobile } = useDevice();

  const leafNode = (
    <MenuItem icon={<Icon name={link.icon || ('cube' as any)} size="1x" />}>
      {link.onClick ? (
        <span onClick={link.onClick}>{link.text}</span>
      ) : (
        <NavLink to={link.url || '/'} onClick={onClick}>
          {link.text}
        </NavLink>
      )}
    </MenuItem>
  );

  const hasChildren = !!link.children?.length;

  const linkTag = (
    <>
      {!hasChildren ? (
        isMobile || !firstChild ? (
          leafNode
        ) : (
          <SubMenu
            title={link.text}
            icon={<Icon name={link.icon || ('cube' as any)} size="1x" />}
            firstchild={firstChild}
          >
            {leafNode}
          </SubMenu>
        )
      ) : (
        <SubMenu
          title={link.text}
          icon={<Icon name={link.icon || ('cube' as any)} size="1x" />}
          firstchild={firstChild}
        >
          {(link.children || []).map((child) => (
            <TopSectionItem key={child.id} link={child} />
          ))}
        </SubMenu>
      )}
    </>
  );

  return link.authority ? <PrivateComponent hasAnyAuthority={[link.authority]}>{linkTag}</PrivateComponent> : linkTag;
};

export default TopSectionItem;
