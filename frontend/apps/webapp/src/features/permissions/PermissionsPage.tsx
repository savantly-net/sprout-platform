import { Form } from '@sprout-platform/ui';
import { Field, FormikHelpers } from 'formik';
import React, { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'reactstrap';
import Page from '../../core/components/Page/Page';
import { getNavModel } from '../../core/selectors/navModel';
import { StoreState } from '../../types';
import { permissionService, Privilege, Role } from './permissionService';
import { css, cx } from 'emotion';

const customLabel = css`
  position:relative;
  display: flex;
  align-items: center;
  margin-bottom: 14px;
  flex:0 0 33.33%;
  width:0 0 33.33%
`
const customInput = css`
  width:18px;
  height:18px;
  margin-right:12px
`

const defaultButton = css`
  width: 100%;
  border: 1px solid #ccc;
  padding: 6px 10px;
  border-radius: 5px;
  margin-bottom:6px;
`

const slectedButton = css`
  background: #1a202c;
  color: #fff;
`

const emptyRoles: Role[] = [];
const emptyPrivileges: Privilege[] = [];


const PermissionsTable = ({
  roles,
  privileges,
  onSubmit
}: {
  roles: Role[];
  privileges: Privilege[];
  onSubmit: (
    role: string,
    privileges: string[],
    helpers: FormikHelpers<{
      privileges: string[];
    }>
  ) => void;
}) => {

  const [rolePrivileges, setRolePrivileges] = React.useState<any>({
    privileges: [],
    name: ''
  });

  /* GET FIRST ROLE PRIVILAGES WHEN PAGE ARE LOADED */
  useEffect(() => {
    if (roles.length > 0 && !rolePrivileges.name) {
      setRolePrivileges({
        privileges: roles[0].privileges,
        name: roles[0].name
      });
    }
  }, [roles]);

  /* SET SELECTED USER PRIVILAGES */
  const getSelectedRolePrivilage = (result: any) => {
    setRolePrivileges(result);
  };

  return (
    <>
      <div className="row card-deck">
        {roles && roles.length > 0 &&
          <div className={cx('center', css` width: 25%; `)}>
            <h3 className={cx(css` font-size:16px;font-weight: 600;margin-bottom:12px `)}>Role</h3>
            <div className={cx('card', 'mb-3', 'ml-0', css` min-width: 5rem;`)}>
              <div className="card-body" >
                <ul className={cx('ul.card-body', css`list-style: none`)}>
                  {roles &&
                    roles.map((r, index) => (
                      <li key={index}><button onClick={() => getSelectedRolePrivilage(r)} className={cx(defaultButton, (rolePrivileges?.name == r.name) ? slectedButton : '')}>{r.name}</button></li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        }
        {roles
          && roles.map((role, index) => {
            if (role.name != rolePrivileges.name) {
              return null;
            }
            return (
              <div className={cx('center', css` width:75% `)}>
                <h3 className={cx(css` font-size:16px;font-weight: 600;margin-bottom:12px `)}>Privileges</h3>
                <div className={cx('card', 'mb-3', 'ml-0', css` min-width: 12rem; `)}>
                  <div className="card-body" >
                    <ul className={cx('ul.card-body', css`list-style: none`)}>
                      {
                        rolePrivileges.privileges && rolePrivileges.privileges.length > 0 ?
                          <Form
                            showCancelButton={false}
                            submitText="Update"
                            initialValues={{
                              privileges: rolePrivileges.privileges.map((p: any) => p.name)
                            }}
                            onSubmit={(values: any, helpers: any) => {
                              onSubmit(rolePrivileges.name, values.privileges, helpers);
                            }}
                          >
                            <div role="group" aria-labelledby="checkbox-group" className={cx(css`display:flex; flex-wrap:wrap;margin-bottom:24px`)}>
                              {privileges.map((p) => {
                                return (
                                  <>
                                    <label className={cx(customLabel)}>
                                      <Field className={cx(customInput)} type="checkbox" name="privileges" value={p.name} /> {p.name}
                                    </label>
                                  </>
                                );
                              })}
                            </div>
                          </Form>
                          : "Sorry, no privileges available"
                      }
                    </ul>
                  </div>
                </div>
              </div>
            )
          }
          )
        }
      </div>
    </>
  );
};

export const PermissionsPage = () => {
  const navModel = useSelector((state: StoreState) => getNavModel(state.navIndex, 'appPermissions'));

  const [error, setError] = useState('');
  const [roles, setRoles] = useState(emptyRoles);
  const [privileges, setPrivileges] = useState(emptyPrivileges);

  useMemo(() => {
    if (roles.length === 0) {
      getRoleMethod();
    }
  }, [roles]);

  useMemo(() => {
    if (privileges.length === 0) {
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

  /* GET LOGIN USER ROLES */
  function getRoleMethod() {
    permissionService
      .getRoles()
      .then((response) => {
        setRoles(response.data);
      })
      .catch((err) => {
        setError(err.detail || err.message || err.status);
      });
  }

  return (
    <Page navModel={navModel}>
      <Page.Contents>
        <>
          {error && <Alert color="danger">{error}</Alert>}
          {roles && (
            <PermissionsTable
              roles={roles}
              privileges={privileges}
              onSubmit={(role, privileges, helpers) => {
                permissionService
                  .updatePermissions(role, privileges)
                  .then((response) => {
                    console.log('updated permissions:', role, privileges);
                    helpers.setSubmitting(false);
                    getRoleMethod()
                  })
                  .catch((err) => {
                    console.error('failed to update permissions:', err);
                  });
              }}
            />
          )}
        </>
      </Page.Contents>
    </Page>
  );
};
