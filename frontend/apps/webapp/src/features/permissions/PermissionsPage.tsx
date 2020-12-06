import { Form } from '@sprout-platform/ui';
import { Field, FormikHelpers } from 'formik';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'reactstrap';
import Page from '../../core/components/Page/Page';
import { getNavModel } from '../../core/selectors/navModel';
import { StoreState } from '../../types';
import { permissionService, Privilege, Role } from './permissionService';

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
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Role</th>
          <th>Privileges</th>
        </tr>
      </thead>
      <tbody>
        {roles &&
          roles.map((r) => (
            <tr>
              <td>{r.name}</td>
              <td>
                <Form
                  showCancelButton={false}
                  submitText="Update"
                  initialValues={{
                    privileges: r.privileges.map((p) => p.name)
                  }}
                  onSubmit={(values, helpers) => {
                    console.log(r, values);
                    onSubmit(r.name, values.privileges, helpers);
                  }}
                >
                  <div role="group" aria-labelledby="checkbox-group">
                    {privileges.map((p) => {
                      return (
                        <>
                          <label>
                            <Field type="checkbox" name="privileges" value={p.name} />
                            {p.name}
                          </label>
                          <br />
                        </>
                      );
                    })}
                  </div>
                </Form>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export const PermissionsPage = () => {
  const navModel = useSelector((state: StoreState) => getNavModel(state.navIndex, 'appPermissions'));

  const [error, setError] = useState('');
  const [roles, setRoles] = useState(emptyRoles);
  const [privileges, setPrivileges] = useState(emptyPrivileges);

  useMemo(() => {
    if (roles.length === 0) {
      permissionService
        .getRoles()
        .then((response) => {
          setRoles(response.data);
        })
        .catch((err) => {
          setError(err.detail || err.message || err.status);
        });
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
