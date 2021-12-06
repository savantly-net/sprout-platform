import React, { useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import FocusLock from 'react-focus-lock';
import MenuItem from '../DraggableMenuItem/MenuItem';
import { MenuDto } from '../../menuAdminService';

interface Props {
  onSave: (menu: MenuDto) => void;
}

const AddMenuItem = ({ onSave }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);
  const [menu] = useState<MenuDto>({
    name: '',
    icon: '',
    displayText: '',
    parentName: '',
    url: '',
    position: 0,
    children: [],
    authorities: []
  });
  const toast = useToast();
  const onSubmit = (menu: MenuDto) => {
    onSave(menu);
    toast({
      title: 'Menu Item created.',
      description: 'Added to the bottom of the menu list',
      duration: 3000,
      isClosable: true,
      variant: 'subtle',
      position: 'top-right'
    });
    onClose();
  };

  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="left"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button size="sm">Add Menu Item</Button>
        </PopoverTrigger>
        <PopoverContent p={8}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <MenuItem
              menu={menu}
              onUpdate={onSubmit}
              disableCollapse={true}
              saveButtonText="Add"
              editorTitle="Add New Item"
            />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AddMenuItem;
