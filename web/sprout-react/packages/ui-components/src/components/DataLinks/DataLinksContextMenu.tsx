import React from 'react';
import { WithContextMenu } from '../ContextMenu/WithContextMenu';
import { LinkModel } from '@grafana/data';
import { linkModelToContextMenuItems } from '../../utils/dataLinks';
import { css } from 'emotion';

interface DataLinksContextMenuProps {
  children: (props: DataLinksContextMenuApi) => JSX.Element;
  links: () => LinkModel[];
}

export interface DataLinksContextMenuApi {
  openMenu?: React.MouseEventHandler<HTMLElement>;
  targetClassName?: string;
}

export const DataLinksContextMenu: React.FC<DataLinksContextMenuProps> = ({ children, links }) => {
  const getDataLinksContextMenuItems = () => {
    return [{ items: linkModelToContextMenuItems(links), label: 'Data links' }];
  };

  // Use this class name (exposed via render prop) to add context menu indicator to the click target of the visualization
  const targetClassName = css`
    cursor: context-menu;
  `;

  return (
    <WithContextMenu getContextMenuItems={getDataLinksContextMenuItems}>
      {({ openMenu }) => {
        return children({ openMenu, targetClassName });
      }}
    </WithContextMenu>
  );
};
