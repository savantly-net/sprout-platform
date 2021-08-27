import React, { useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  FormControl,
  FormLabel,
  Input,
  Stack,
  ButtonGroup,
  Button,
  Box,
  IconButton,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import FocusLock from 'react-focus-lock';
import MenuItem from '../DraggableMenuItem/MenuItem';
import { MenuDto } from '../../menuAdminService';

const TextInput = React.forwardRef((props, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

// 2. Create the form
const Form = ({ firstFieldRef, onCancel }) => {
  return (
    <Stack spacing={4}>
      <TextInput label="First name" id="first-name" ref={firstFieldRef} defaultValue="John" />
      <TextInput label="Last name" id="last-name" defaultValue="Smith" />
      <ButtonGroup d="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button isDisabled colorScheme="teal">
          Save
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

interface Props {
  onSave: (menu: MenuDto) => void;
}

const AddMenuItem = ({ onSave }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);
  const [menu, setMenu] = useState<MenuDto>({
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
