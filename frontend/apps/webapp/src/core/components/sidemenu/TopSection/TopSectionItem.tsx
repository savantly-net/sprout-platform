import { NavModelItem } from '@savantly/sprout-api';
import { Icon } from '@sprout-platform/ui';
import React, { FC } from 'react';
import { MenuItem, SubMenu } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import useDevice from '../../../hooks/useDevice';
import { PrivateComponent } from '../../PrivateComponent/PrivateComponent';

export interface Props {
  link: NavModelItem;
  onClick?: () => void;
  firstChild?: boolean;
}

const CustomLink = ({ item, onClick }: { item: NavModelItem; onClick?: () => void }) => {
  if (!item.renderMode || item.renderMode == 'INTERNAL') {
    return (
      <NavLink to={item.url || '/'} onClick={onClick}>
        {item.text}
      </NavLink>
    );
  } else if (item.renderMode == 'EXTERNAL') {
    return <a href={item.url} target={'_blank'}>{item.text}</a>;
  }
  const encodedUrl = encodeURIComponent(item.url || '/');
  return <NavLink to={`/embedded/${item.renderMode}/${encodedUrl}`}>{item.text}</NavLink>;
};

const TopSectionItem: FC<Props> = (props) => {
  const { link, onClick, firstChild } = props;
  const { isMobile } = useDevice();

  const getIcon = (icon: any) => {
    if (typeof icon == 'string') {
      return <Icon name={icon || ('cube' as any)} size="1x" />;
    } else {
      return icon || ('cube' as any);
    }
  };

  const leafNode = (
    <MenuItem icon={getIcon(link.icon)}>
      {link.onClick ? <span onClick={link.onClick}>{link.text}</span> : <CustomLink item={link} onClick={onClick} />}
    </MenuItem>
  );

  const hasChildren = !!link.children?.length;

  const linkTag = (
    <>
      {!hasChildren ? (
        isMobile || !firstChild ? (
          leafNode
        ) : (
          <SubMenu title={link.text} icon={getIcon(link.icon)} firstchild={firstChild}>
            {leafNode}
          </SubMenu>
        )
      ) : (
        <SubMenu title={link.text} icon={getIcon(link.icon)} firstchild={firstChild}>
          {(link.children || []).map((child) => (
            <TopSectionItem key={child.id} link={child} />
          ))}
        </SubMenu>
      )}
    </>
  );

  return link.authority ? (
    <PrivateComponent redirect={false} hasAnyAuthority={[link.authority]}>
      {linkTag}
    </PrivateComponent>
  ) : (
    linkTag
  );
};

export default TopSectionItem;
