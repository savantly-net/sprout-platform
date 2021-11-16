import React, { useState } from 'react';
import { internalMenuItemsStateType } from '../MenuAdminPage';
import { MenuDto } from '../menuAdminService';
import { DragDropContext } from 'react-beautiful-dnd';
import { useFormikContext } from 'formik';

import './styles.scss';
import DroppableMenuList from './DroppableMenuList';
import AddMenuItem from './AddMenuItem';
import { DialogModalCloseResponse, openChakraDialog } from '../../../core/components/ChakraDialogModal';
import { confirm } from '@sprout-platform/ui';

interface Props {
  menuItems: internalMenuItemsStateType;
  setMenuItems: (menuItems: internalMenuItemsStateType) => void;
  deleteMenuItem: (menuItem: MenuDto) => void;
}

interface DeleteConfirmationProps {
  onClose: (response: DialogModalCloseResponse<boolean>) => void;
}

type DragEndHandler = (result: any) => void;

export type UpdateMenuItemHandler = (fullIndex: string, menu: MenuDto) => void;

export type DeleteMenuItemHandler = (fullIndex: string) => void;

const DragAndDropMenuBuilder = ({ menuItems = [], setMenuItems, deleteMenuItem }: Props) => {
  const { submitForm } = useFormikContext();
  const [placeholderProps, setPlaceholderProps] = useState({});

  const getList = (id: string) => {
    const fullIndex = id.split('-')[1];
    if (!fullIndex) {
      return menuItems;
    }

    const item = resolveFullIndex(fullIndex);

    if (!item.children) {
      item.children = [];
    }

    return item.children;
  };

  const resolveFullIndex = (fullIndex: string) => {
    if (!fullIndex) {
      return { children: menuItems };
    }
    let item = { children: menuItems };

    for (const idx of fullIndex.split('.')) {
      item = item.children?.[parseInt(idx, 10)];
    }

    return item;
  };

  const addItemToList = (list: MenuDto[], idx: number, item: MenuDto) => {
    list.splice(idx, 0, item);
    return list;
  };

  const removeItemFromList = (list: MenuDto[], idx: number) => {
    const [item] = list.splice(idx, 1);
    return item;
  };

  const onDragEnd: DragEndHandler = (result: any) => {
    setPlaceholderProps({});
    if (!result.destination) {
      return;
    }

    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      // Returning as it is a same position drop
      return;
    }

    const sourceList = getList(result.source.droppableId);
    const destinationList = getList(result.destination.droppableId);

    const item = removeItemFromList(sourceList, result.source.index);
    addItemToList(destinationList, result.destination.index, item);

    setMenuItems(menuItems);
  };

  const onDragStart = (event: any) => {
    const draggedDOM = getDraggedDom(event.draggableId);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const sourceIndex = event.source.index;
    var clientY =
      // ts-ignore
      parseFloat(window.getComputedStyle(draggedDOM.parentNode as Element || <div/>).paddingTop) +
      [...draggedDOM.parentNode?.children || []].slice(0, sourceIndex).reduce((total, curr) => {
        const style = (curr as any).currentStyle || window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(draggedDOM.parentNode as Element || <div/>).paddingLeft)
    });
  };

  const onDragUpdate = (event: any) => {
    if (!event.destination) {
      return;
    }

    const draggedDOM = getDraggedDom(event.draggableId);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const destinationIndex = event.destination.index;
    const sourceIndex = event.source.index;

    const childrenArray = [...getDestinationDom(event.destination.droppableId)?.children || []]; // [...draggedDOM.parentNode.children];
    const movedItem = childrenArray[sourceIndex];
    if (event.destination.droppableId === event.source.droppableId) {
      childrenArray.splice(sourceIndex, 1);
    }

    const updatedArray = [
      ...childrenArray.slice(0, destinationIndex),
      movedItem,
      ...childrenArray.slice(destinationIndex + 1)
    ];

    var clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode as Element || <div/>).paddingTop) +
      updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
        const style = (curr as any).currentStyle || window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(draggedDOM.parentNode as Element || <div/>).paddingLeft)
    });
  };

  const getDraggedDom = (draggableId: string) => {
    const domQuery = `[data-rbd-drag-handle-draggable-id='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    return draggedDOM;
  };

  const getDestinationDom = (droppableId: string) => {
    const domQuery = `[data-rbd-droppable-id='${droppableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    return draggedDOM;
  };

  const deleteMenuAtIndex: DeleteMenuItemHandler = async (fullIndex) => {
    const response = await confirm({
      message: 'Deleting will delete this menu item and all its children, Do you want to proceed?',
      title: 'Are you sure?',
      confirmText: 'Yes',
      cancelText: 'Cancel'
    });
    if (!response) {
      return;
    }
    const parentFullIndex = fullIndex.substring(0, fullIndex.lastIndexOf('.'));
    const parentItem = resolveFullIndex(parentFullIndex);
    const requiredIndex = parseInt(fullIndex.substring(fullIndex.lastIndexOf('.') + 1));
    const toBeDeletedMenuItem = parentItem.children[requiredIndex];
    deleteMenuItem(toBeDeletedMenuItem);
  };

  const updateMenuAtIndex: UpdateMenuItemHandler = (fullIndex, menu) => {
    const parentFullIndex = fullIndex.substring(0, fullIndex.lastIndexOf('.'));
    const parentItem = resolveFullIndex(parentFullIndex);
    parentItem.children[parseInt(fullIndex.substring(fullIndex.lastIndexOf('.') + 1))] = menu;
    const updatedMenuItems = [...menuItems];
    setMenuItems(updatedMenuItems);
    setTimeout(() => {
      submitForm();
    }, 0);
  };

  const onNewMenuItem = (menu: MenuDto) => {
    const updatedMenuItems = [...menuItems];
    updatedMenuItems.push(menu);
    setMenuItems(updatedMenuItems);
  };

  return (
    <div className="DragAndDropMenuBuilder">
      <div className="DragAndDropMenuBuilder__AddButtonWrapper">
        <AddMenuItem onSave={onNewMenuItem} />
      </div>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart} onDragUpdate={onDragUpdate}>
        <DroppableMenuList
          menuList={menuItems}
          updateMenuAtIndex={updateMenuAtIndex}
          deleteMenuAtIndex={deleteMenuAtIndex}
          fullIndex={''}
          isRoot={true}
          placeholderProps={placeholderProps}
          setPlaceholderProps={setPlaceholderProps}
        />
      </DragDropContext>
    </div>
  );
};

export default DragAndDropMenuBuilder;
