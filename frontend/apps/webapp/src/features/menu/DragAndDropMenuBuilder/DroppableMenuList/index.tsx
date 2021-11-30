import React, { useState } from 'react';
import cx from 'classnames';
import { isEmpty } from 'lodash';
import { Droppable } from 'react-beautiful-dnd';
import DraggableMenuItem from '../DraggableMenuItem';
import { MenuDto } from '../../menuAdminService';
import { DeleteMenuItemHandler, UpdateMenuItemHandler } from '..';
import './styles.scss';

interface DroppableMenuListProps {
  menuList: MenuDto[];
  fullIndex: string;
  updateMenuAtIndex: UpdateMenuItemHandler;
  deleteMenuAtIndex: DeleteMenuItemHandler;
  isRoot?: boolean;
  placeholderProps: any;
  setPlaceholderProps: (props: any) => void;
}

const DroppableMenuList = ({
  fullIndex,
  menuList,
  updateMenuAtIndex,
  deleteMenuAtIndex,
  isRoot,
  placeholderProps,
  setPlaceholderProps
}: DroppableMenuListProps) => {
  const droppableId = `menuList-${fullIndex}`;
  const [open, setOpen] = useState(false);

  return (
    <div className="DroppableMenuList">
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={cx('DroppableMenuList__droppable', {
              draggingOver: snapshot.isDraggingOver
            })}
          >
            {(menuList || []).map((menu, idx) => (
                 <DraggableMenuItem
                    menu={menu}
                    key={menu.name}
                    index={idx}
                    fullIndex={`${fullIndex}${!isRoot ? '.' : ''}${idx}`}
                    updateMenuAtIndex={updateMenuAtIndex}
                    deleteMenuAtIndex={deleteMenuAtIndex}
                    placeholderProps={placeholderProps}
                    setPlaceholderProps={setPlaceholderProps}
                  />
            ))}
            {provided.placeholder}
            {!isEmpty(placeholderProps) && snapshot.isDraggingOver ? (
              <div
                className="DroppableMenuList__placeholder"
                style={{
                  top: placeholderProps.clientY,
                  left: placeholderProps.clientX,
                  height: placeholderProps.clientHeight,
                  width: placeholderProps.clientWidth
                }}
              />
            ) : null}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DroppableMenuList;
