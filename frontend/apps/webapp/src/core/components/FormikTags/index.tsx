import { FieldProps } from 'formik';
/* eslint-disable */
import React from 'react';
/* eslint-enable */
import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Stack,
  ButtonGroup,
  Button,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import FocusLock from 'react-focus-lock';

import './styles.scss';

interface Props {
  tags: Array<string>;
  label?: string;
}

interface FormProps {
  firstFieldRef: any;
  onCancel: () => void;
  onSave: (tagName: string) => void;
}

interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = React.forwardRef((props: TextInputProps, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref as any} {...props} />
    </FormControl>
  );
});

const Form = ({ firstFieldRef, onCancel, onSave }: FormProps) => {
  const [tagName, setTagName] = React.useState('');
  return (
    <Stack spacing={4}>
      <TextInput
        label="Tag Name"
        id="tag-name"
        ref={firstFieldRef}
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
      />
      <ButtonGroup d="flex" justifyContent="flex-end">
        <Button
          variant="outline"
          onClick={() => {
            setTagName('');
            onCancel();
          }}
        >
          Cancel
        </Button>
        <Button
          isDisabled={!tagName}
          onClick={() => {
            setTagName('');
            onSave(tagName);
            onCancel();
          }}
        >
          Save
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

const FormikTags: React.FC<FieldProps & Props> = ({ label, field, form }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);
  const tags = field.value || [];

  return (
    <Box>
      <FormControl>
        <FormLabel className="FormikSelect__label">{label || field.name}</FormLabel>
        <HStack spacing={4}>
          {tags.map((tag: string, idx: number) => (
            <Tag key={tag} size="lg">
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton
                onClick={() => {
                  tags.splice(idx, 1);
                  form.setFieldValue(field.name, tags);
                }}
              />
            </Tag>
          ))}
          <Popover
            isOpen={isOpen}
            initialFocusRef={firstFieldRef}
            onOpen={onOpen}
            onClose={onClose}
            placement="right"
            closeOnBlur={false}
          >
            <PopoverTrigger>
              <IconButton icon={<AddIcon />} aria-label="Add Tag" size="sm" />
            </PopoverTrigger>
            <PopoverContent p={5}>
              <Box>
                <FocusLock returnFocus persistentFocus={false}>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <Form
                    firstFieldRef={firstFieldRef}
                    onCancel={onClose}
                    onSave={(tag) => {
                      form.setFieldValue(field.name, [...tags, tag]);
                    }}
                  />
                </FocusLock>
              </Box>
            </PopoverContent>
          </Popover>
        </HStack>
      </FormControl>
    </Box>
  );
};

export default FormikTags;
