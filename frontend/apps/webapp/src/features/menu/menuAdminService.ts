import Axios from 'axios';

export interface MenuDto {
  id?: string;
  name: string;
  icon: string;
  displayText: string;
  parentName: string;
  url: string;
  position: number;
  children: MenuDto[];
  authorities: string[];
  weight?: number;
}

export const menuAdminService = {
  getMenus: () => {
    return Axios.get<MenuDto[]>('/api/menu');
  },
  updateMenus: (menus: MenuDto[]) => {
    console.log('updating menus: ', menus);
    return Axios.post<void>('/api/menu', menus);
  },
  deleteMenu: (menu: MenuDto) => {
    if (!menu.id) {
      console.warn('menu item id is undefined, so skipping the delete', menu);
      return;
    }
    return Axios.delete<void>(`/api/menu/${menu.id}`);
  }
};
