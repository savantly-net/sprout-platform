import { DeleteIcon, AddIcon, ChevronDownIcon, SettingsIcon, ChevronRightIcon, MinusIcon } from '@chakra-ui/icons';

import { Button, IconButton } from '@chakra-ui/react';
import cx from 'classnames';
import { Field, Form, Formik } from 'formik';
/* eslint-disable */
import React, { useState, useMemo } from 'react';
/* eslint-enable */
import { MenuDto } from '../../../menuAdminService';
import { permissionService } from '../../../../permissions/permissionService';
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
  const [privileges, setPrivileges] = useState<any>([]);
  const [error, setError] = useState('');

  useMemo(() => {
    if (Object.keys(privileges).length === 0) {
      permissionService
        .getPrivileges()
        .then((response) => {
          setPrivileges(response.data);
        })
        .catch((err) => {
          setError(err.detail || err.message || err.status);
        });
    }
  }, [privileges]);

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
            onSubmit={async (values: MenuDto, { resetForm }) => {
              values.authorities = [values.authorities.toString()];
              await onUpdate({ ...values, children });
              resetForm();
            }}
            validateOnChange={true}
            validateOnBlur={true}
            enableReinitialize={true}
          >
            <Form className="MenuItem__body__content__form">
              <label className="MenuItem__body__content__form__item__label">
                <span>Name</span>
                <Field className="MenuItem__body__content__form__item" name="name" type="text" autoComplete="off" />
              </label>
              <label className="MenuItem__body__content__form__item__label">
                <span>Icon</span>
                <Field className="MenuItem__body__content__form__item" name="icon" type="text" autoComplete="off" />
              </label>
              <label className="MenuItem__body__content__form__item__label">
                <span>Display Text</span>
                <Field
                  className="MenuItem__body__content__form__item"
                  name="displayText"
                  type="text"
                  autoComplete="off"
                />
              </label>
              <label className="MenuItem__body__content__form__item__label">
                <span>URL</span>
                <Field className="MenuItem__body__content__form__item" name="url" type="text" autoComplete="off" />
              </label>
              <label className="MenuItem__body__content__form__item__label">
                <span>Weight</span>
                <Field className="MenuItem__body__content__form__item" name="weight" type="number" autoComplete="off" />
              </label>
              <label className="MenuItem__body__content__form__item__label">
                <span>Render Mode</span>
                <Field className="MenuItem__body__content__form__item" name="renderMode" as="select" autoComplete="off">
                  <option disabled selected>
                    Select Render Mode
                  </option>
                  <option>INTERNAL</option>
                  <option>EXTERNAL</option>
                  <option>EMBED</option>
                  <option>FRAME</option>
                  <option>JSON</option>
                </Field>
              </label>
              <label className="MenuItem__body__content__form__item__label">
                <span>Authorities</span>
                <Field className="MenuItem__body__content__form__item" name="authorities" as="select" autoComplete="off">
                  <option selected>Select Authorities</option>
                  {privileges.map((auths: any) => (
                    <option value={auths.authority} key={auths.id}>
                      {auths.authority}
                    </option>
                  ))}
                </Field>
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
                  name: '',
                  icon: '',
                  displayText: '',
                  url: '',
                  weight: undefined,
                  authorities: [],
                  position: 0,
                  renderMode,
                  parentName: '',
                  children: []
                }}
                onSubmit={async (values: MenuDto, { resetForm }) => {
                  values.authorities = [values.authorities.toString()];
                  // values.authorities = (values.authorities.length > 0 ) ? [values.authorities] : [];
                  children.push(values);
                  await onUpdate({ ...props.menu, children });
                  resetForm();
                }}
              >
                <Form className="MenuItem__body__content__form">
                  <label className="MenuItem__body__content__form__item__label">
                    <span>Name</span>
                    <Field className="MenuItem__body__content__form__item" name="name" type="text" autoComplete="off" />
                  </label>
                  <label className="MenuItem__body__content__form__item__label">
                    <span>Icon</span>
                    <Field className="MenuItem__body__content__form__item" name="icon" type="text" autoComplete="off" />
                  </label>
                  <label className="MenuItem__body__content__form__item__label">
                    <span>Display Text</span>
                    <Field
                      className="MenuItem__body__content__form__item"
                      name="displayText"
                      type="text"
                      autoComplete="off"
                    />
                  </label>
                  <label className="MenuItem__body__content__form__item__label">
                    <span>URL</span>
                    <Field className="MenuItem__body__content__form__item" name="url" type="text" autoComplete="off" />
                  </label>
                  <label className="MenuItem__body__content__form__item__label">
                    <span>Weight</span>
                    <Field
                      className="MenuItem__body__content__form__item"
                      name="weight"
                      type="number"
                      autoComplete="off"
                    />
                  </label>
                  <label className="MenuItem__body__content__form__item__label">
                    <span>Render Mode</span>
                    <Field
                      className="MenuItem__body__content__form__item"
                      name="renderMode"
                      as="select"
                      autoComplete="off"
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
                    <Field
                      className="MenuItem__body__content__form__item"
                      name="authorities"
                      as="select"
                      autoComplete="off"
                    >
                      <option selected>Select Authorities</option>
                      {privileges.map((auths: any) => (
                        <option value={auths.authority} key={auths.id}>
                          {auths.authority}
                        </option>
                      ))}
                    </Field>
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
