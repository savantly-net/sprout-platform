import React from 'react';
import cx from 'classnames';
import { MenuDto } from '../../menuAdminService';
import { Draggable } from 'react-beautiful-dnd';

import MenuItem from './MenuItem';
import { UpdateMenuItemHandler } from '..';
import DroppableMenuList from '../DroppableMenuList';

import './styles.scss';

interface DraggableMenuItemProps {
  menu: MenuDto;
  index: number;
  updateMenuAtIndex: UpdateMenuItemHandler;
  fullIndex: string;
  placeholderProps?: any;
  setPlaceholderProps: (props: any) => void;
}

const DraggableMenuItem = ({
  menu,
  index,
  updateMenuAtIndex,
  fullIndex,
  placeholderProps,
  setPlaceholderProps
}: DraggableMenuItemProps) => {
  const draggableId = `menuItem-${fullIndex}`;
  return (
    <>
      <Draggable key={menu.name} draggableId={draggableId} index={index}>
        {(provided: any, draggableSnapshot: any) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={provided.draggableProps.style}
            className={cx('DraggableMenuItem')}
          >
            {menu.name ? <MenuItem menu={menu} onUpdate={(menu) => updateMenuAtIndex(fullIndex, menu)} /> : null}
            <DroppableMenuList
              menuList={menu.children}
              fullIndex={fullIndex}
              updateMenuAtIndex={updateMenuAtIndex}
              placeholderProps={placeholderProps}
              setPlaceholderProps={setPlaceholderProps}
            />
          </div>
        )}
      </Draggable>
    </>
  );
};

export default DraggableMenuItem;
