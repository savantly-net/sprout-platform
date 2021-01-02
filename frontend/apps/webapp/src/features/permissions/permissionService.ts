import Axios from 'axios';

export interface Privilege {
  name: string;
}

export interface Role {
  name: string;
  privileges: Privilege[];
}

export const permissionService = {
  getRoles: () => {
    return Axios.get<Role[]>('/api/permissions/role');
  },
  getPrivileges: () => {
    return Axios.get<Privilege[]>('/api/permissions/privilege');
  },
  updatePermissions: (role: string, privileges: string[]) => {
    console.log('updating permissions: ', role, privileges);
    return Axios.put<Role>('/api/permissions/role', { role, privileges });
  }
};
