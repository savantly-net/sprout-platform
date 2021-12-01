import React, { useState } from 'react';
import cx from 'classnames';
import { MenuDto } from '../../menuAdminService';
import { Draggable } from 'react-beautiful-dnd';

import MenuItem from './MenuItem';
import { UpdateMenuItemHandler, DeleteMenuItemHandler } from '..';
import DroppableMenuList from '../DroppableMenuList';

import Collapse from 'react-bootstrap/Collapse';
import './styles.scss';
import { IconButton } from '@chakra-ui/react';

interface DraggableMenuItemProps {
  menu: MenuDto;
  index: number;
  updateMenuAtIndex: UpdateMenuItemHandler;
  deleteMenuAtIndex: DeleteMenuItemHandler;
  fullIndex: string;
  placeholderProps?: any;
  setPlaceholderProps: (props: any) => void;
}

const DraggableMenuItem = ({
  menu,
  index,
  updateMenuAtIndex,
  deleteMenuAtIndex,
  fullIndex,
  placeholderProps,
  setPlaceholderProps,
}: DraggableMenuItemProps) => {
  menu.weight = Number(index) +1;
  const draggableId = `menuItem-${fullIndex}`;
  const [open, setOpen] = useState(false);

  return (
    <>
      {menu.children && menu.children.length > 0 ? (
        <>
          <Draggable key={menu.name} draggableId={draggableId} index={index}>
            {(provided: any, draggableSnapshot: any) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={provided.draggableProps.style}
                className={`DraggableMenuItem ${open ? 'active' : ''}`}>
                {menu.name ? (
                  <MenuItem
                    menu={menu}
                    onExpand={() => setOpen(!open)}
                    disableExpand={open}
                    onUpdate={(menu) => updateMenuAtIndex(fullIndex, menu)}
                    onDelete={() => deleteMenuAtIndex(fullIndex)}
                  />
                ) : null}
                {
                  <Collapse in={open} dimension="width">
                    <div className={`sub-manu-${menu.children[0].id}`}>
                      <DroppableMenuList
                        menuList={menu.children}
                        fullIndex={fullIndex}
                        updateMenuAtIndex={updateMenuAtIndex}
                        deleteMenuAtIndex={deleteMenuAtIndex}
                        placeholderProps={placeholderProps}
                        setPlaceholderProps={setPlaceholderProps}
                      />
                    </div>
                  </Collapse>
                }
              </div>
            )}
          </Draggable>
        </>
      ) : (
        <Draggable key={menu.name} draggableId={draggableId} index={index}>
          {(provided: any, draggableSnapshot: any) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={provided.draggableProps.style}
              className={cx('DraggableMenuItem')}
            >
              {menu.name ? (
                <MenuItem
                  menu={menu}
                  onExpand={(open) => setOpen(!open)}
                  onUpdate={(menu) => updateMenuAtIndex(fullIndex, menu)}
                  onDelete={() => deleteMenuAtIndex(fullIndex)}
                />
              ) : null}
              {
                <DroppableMenuList
                  menuList={menu.children}
                  fullIndex={fullIndex}
                  updateMenuAtIndex={updateMenuAtIndex}
                  deleteMenuAtIndex={deleteMenuAtIndex}
                  placeholderProps={placeholderProps}
                  setPlaceholderProps={setPlaceholderProps}
                />
              }
            </div>
          )}
        </Draggable>
      )}
    </>
  );
};

export default DraggableMenuItem;
