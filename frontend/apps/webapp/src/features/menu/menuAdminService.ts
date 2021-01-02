import Axios from 'axios';

export interface MenuDto {
  name: string;
  icon: string;
  displayText: string;
  parentName: string;
  url: string;
  position: number;
  children: MenuDto[];
}

export const menuAdminService = {
  getMenus: () => {
    return Axios.get<MenuDto[]>('/api/menu');
  },
  updateMenus: (menus: MenuDto[]) => {
    console.log('updating menus: ', menus);
    return Axios.post<void>('/api/menu', menus);
  }
};
