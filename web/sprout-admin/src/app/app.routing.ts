import { AppMenuComponent } from './app-menu/app-menu.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { ContentItemEditorComponent } from './content-item/content-item-editor/content-item-editor.component';
import { ContentItemComponent } from './content-item/content-item.component';
import { ContentTemplateEditorComponent } from './content-template/content-template-editor/content-template-editor.component';
import { ContentTemplateComponent } from './content-template/content-template.component';
import { ContentTypesEditorComponent } from './content-types/content-types-editor/content-types-editor.component';
import { ContentTypesComponent } from './content-types/content-types.component';
import { FileBrowserComponent } from './file-browser/file-browser.component';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RoleListComponent } from './user/role-list/role-list.component';
import { UserEditorComponent } from './user/user-editor/user-editor.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { LayoutEditorComponent } from './web-page/layout/layout-editor/layout-editor.component';
import { LayoutListComponent } from './web-page/layout/layout-list/layout-list.component';
import { PageEditorComponent } from './web-page/page/page-editor/page-editor.component';
import { PageListComponent } from './web-page/page/page-list/page-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'app-menu', component: AppMenuComponent, pathMatch: 'full' },
  { path: 'content-types', component: ContentTypesComponent, pathMatch: 'full' },
  { path: 'content-types-editor', component: ContentTypesEditorComponent, pathMatch: 'full' },
  { path: 'content-item', component: ContentItemComponent, pathMatch: 'full' },
  { path: 'content-item-editor', component: ContentItemEditorComponent, pathMatch: 'full' },
  { path: 'content-template', component: ContentTemplateComponent, pathMatch: 'full' },
  { path: 'content-template-editor', component: ContentTemplateEditorComponent, pathMatch: 'full' },
  { path: 'browser', component: FileBrowserComponent, pathMatch: 'full' },
  { path: 'pages', component: PageListComponent, pathMatch: 'full' },
  { path: 'page-editor', component: PageEditorComponent, pathMatch: 'full' },
  { path: 'users', component: UserListComponent, pathMatch: 'full' },
  { path: 'user-editor', component: UserEditorComponent, pathMatch: 'full' },
  { path: 'roles', component: RoleListComponent, pathMatch: 'full' },
  { path: 'role-editor', component: RoleListComponent, pathMatch: 'full' },
  { path: 'settings', component: AppSettingsComponent, pathMatch: 'full' },
  { path: 'layouts', component: LayoutListComponent, pathMatch: 'full' },
  { path: 'layout-editor', component: LayoutEditorComponent, pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(routes);
