import {
  DeleteIcon,
  AddIcon,
  ChevronDownIcon,
  TriangleDownIcon,
  SettingsIcon,
  TriangleUpIcon,
  ChevronRightIcon,
  MinusIcon
} from '@chakra-ui/icons';
import { Button, IconButton } from '@chakra-ui/react';
import cx from 'classnames';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { MenuDto } from '../../../menuAdminService';
import './styles.scss';

interface Props {
  menu: MenuDto;
  onUpdate: (menu: MenuDto) => void;
  onExpand?: (type: boolean) => void;
  onDelete?: () => void;
  disableCollapse?: boolean;
  disableCollapseForAdd?: boolean;
  disableDelete?: boolean;
  disableExpand?: boolean;
  saveButtonText?: string;
  editorTitle?: string;
}

const MenuItem = (props: Props) => {
  const {
    menu: { name, icon, displayText, url, weight, authorities, children, position, renderMode, parentName },
    onUpdate,
    onDelete,
    onExpand,
    disableCollapse = false,
    disableDelete = false,
    disableCollapseForAdd = false,
    disableExpand,
    saveButtonText = 'Save',
    editorTitle
  } = props;
  const [collapsed, setCollapsed] = useState(!disableCollapse);
  const [collapsedForAdd, setCollapsedForAdd] = useState(disableCollapseForAdd);

  return (
    <div className={cx('MenuItem')}>
      <div className="MenuItem__header">
        <div className="MenuItem__header__actions">
          {props.menu.children.length > 0 && (
            <IconButton
              variant="ghost"
              onClick={() => onExpand && onExpand(!disableExpand)}
              aria-label={!disableExpand ? 'show sub menu ' : 'Hide sub menu '}
              size="sm"
              icon={!disableExpand ? <ChevronRightIcon /> : <ChevronDownIcon />}
            />
          )}
          {props.menu.children.length === 0 ? <span className="noSubMenu"> {displayText}</span> : displayText}
        </div>
        <div className="MenuItem__header__actions">
          {!disableCollapse && (
            <IconButton
              variant="ghost"
              onClick={() => setCollapsed(!collapsed)}
              aria-label={collapsed ? 'Expand' : 'Collapse'}
              size="sm"
              icon={collapsed ? <SettingsIcon /> : <SettingsIcon />}
              // icon={collapsed ? <TriangleDownIcon /> : <TriangleUpIcon />}
            />
          )}

          <IconButton
            variant="ghost"
            onClick={() => setCollapsedForAdd(!collapsedForAdd)}
            aria-label={collapsedForAdd ? 'Expand' : 'Collapse'}
            size="sm"
            icon={!collapsedForAdd ? <AddIcon /> : <MinusIcon />}
          />

          {!disableDelete && (
            <IconButton
              variant="ghost"
              onClick={() => onDelete && onDelete()}
              aria-label="Delete menu item"
              size="sm"
              icon={<DeleteIcon />}
            />
          )}
        </div>
      </div>
      <div className={cx('MenuItem__body', { collapsed })}>
        <div className={cx('MenuItem__body__content')}>
          <Formik
            initialValues={{
              name,
              icon,
              displayText,
              url,
              weight,
              authorities,
              position,
              renderMode,
              parentName,
              children
            }}
            onSubmit={async (values: MenuDto) => {
              console.log("props.menu", props.menu)
              console.log("children", children)
              // values.id = props.menu.id;
              console.log("valuesvalues", values)
              await onUpdate({ ...values, children });
            }}
          >
            <Form className="MenuItem__body__content__form">
              <label className="MenuItem__body__content__form__item__label">
                <span>Name</span>
                <Field className="MenuItem__body__content__form__item" name="name" type="text" autocomplete="off" />
              </label>
              <label className="MenuItem__body__content__form__item__label">
                <span>Icon</span>
                <Field className="MenuItem__body__content__form__item" name="icon" type="text" autocomplete="off" />
              </label>
              <label className="MenuItem__body__content__form__item__label">
                <span>Display Text</span>
                <Field
                  className="MenuItem__body__content__form__item"
                  name="displayText"
                  type="text"
                  autocomplete="off"
                />
              </label>
              <label className="MenuItem__body__content__form__item__label">
                <span>URL</span>
                <Field className="MenuItem__body__content__form__item" name="url" type="text" autocomplete="off" />
              </label>
              <label className="MenuItem__body__content__form__item__label">
                <span>Weight</span>
                <Field className="MenuItem__body__content__form__item" name="weight" type="number" autocomplete="off" />
              </label>
              <label className="MenuItem__body__content__form__item__label">
                <span>Render Mode</span>
                <Field className="MenuItem__body__content__form__item" name="renderMode" as="select" autocomplete="off">
                  <option>INTERNAL</option>
                  <option>EXTERNAL</option>
                  <option>EMBED</option>
                  <option>FRAME</option>
                  <option>JSON</option>
                </Field>
              </label>
              <label className="MenuItem__body__content__form__item__label">
                <span>Authorities</span>
                <div
                  className="MenuItem__body__content__form__item__checkboxGroup"
                  role="group"
                  aria-labelledby="checkbox-group"
                >
                  <label>
                    <Field type="checkbox" name="authorities" value="Admin" />
                    Admin
                  </label>
                </div>
              </label>
              <Button type="submit">{saveButtonText}</Button>
            </Form>
          </Formik>
        </div>
      </div>
      <>
        {collapsedForAdd ? (
          <div className={cx('MenuItem__body')}>
            <div className={cx('MenuItem__body__content')}>
              <Formik
                initialValues={{
                  name:'',
                  icon:'',
                  displayText:'',
                  url:'',
                  weight:undefined,
                  authorities:[],
                  position:0,
                  renderMode,
                  parentName:'',
                  children:[]
                }}
                onSubmit={async (values: MenuDto) => {
                  children.push(values)
                  console.log("adddddd ")
                  await onUpdate({ ...props.menu, children });
                }}
              >
                <Form className="MenuItem__body__content__form">
                  <label className="MenuItem__body__content__form__item__label">
                    <span>Name</span>
                    <Field className="MenuItem__body__content__form__item" name="name" type="text" autocomplete="off" />
                  </label>
                  <label className="MenuItem__body__content__form__item__label">
                    <span>Icon</span>
                    <Field className="MenuItem__body__content__form__item" name="icon" type="text" autocomplete="off" />
                  </label>
                  <label className="MenuItem__body__content__form__item__label">
                    <span>Display Text</span>
                    <Field
                      className="MenuItem__body__content__form__item"
                      name="displayText"
                      type="text"
                      autocomplete="off"
                    />
                  </label>
                  <label className="MenuItem__body__content__form__item__label">
                    <span>URL</span>
                    <Field className="MenuItem__body__content__form__item" name="url" type="text" autocomplete="off" />
                  </label>
                  <label className="MenuItem__body__content__form__item__label">
                    <span>Weight</span>
                    <Field
                      className="MenuItem__body__content__form__item"
                      name="weight"
                      type="number"
                      autocomplete="off"
                    />
                  </label>
                  <label className="MenuItem__body__content__form__item__label">
                    <span>Render Mode</span>
                    <Field
                      className="MenuItem__body__content__form__item"
                      name="renderMode"
                      as="select"
                      autocomplete="off"
                    >
                      <option>INTERNAL</option>
                      <option>EXTERNAL</option>
                      <option>EMBED</option>
                      <option>FRAME</option>
                      <option>JSON</option>
                    </Field>
                  </label>
                  <label className="MenuItem__body__content__form__item__label">
                    <span>Authorities</span>
                    <div
                      className="MenuItem__body__content__form__item__checkboxGroup"
                      role="group"
                      aria-labelledby="checkbox-group"
                    >
                      <label>
                        <Field type="checkbox" name="authorities" value="Admin" />
                        Admin
                      </label>
                    </div>
                  </label>
                  <Button type="submit">{saveButtonText}</Button>
                </Form>
              </Formik>
            </div>
          </div>
        ) : (
          ''
        )}
      </>
    </div>
  );
};

export default MenuItem;
