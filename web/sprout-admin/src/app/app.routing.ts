import { ContentItemEditorComponent } from './content-item/content-item-editor/content-item-editor.component';
import { ContentItemComponent } from './content-item/content-item.component';
import { ContentTemplateEditorComponent } from './content-template/content-template-editor/content-template-editor.component';
import { ContentTemplateComponent } from './content-template/content-template.component';
import { ContentTypesEditorComponent } from './content-types/content-types-editor/content-types-editor.component';
import { ContentTypesComponent } from './content-types/content-types.component';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LayoutEditorComponent } from './web-page/layout/layout-editor/layout-editor.component';
import { LayoutListComponent } from './web-page/layout/layout-list/layout-list.component';
import { PageEditorComponent } from './web-page/page/page-editor/page-editor.component';
import { PageListComponent } from './web-page/page/page-list/page-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'content-types', component: ContentTypesComponent },
  { path: 'content-types-editor', component: ContentTypesEditorComponent },
  { path: 'content-item', component: ContentItemComponent },
  { path: 'content-item-editor', component: ContentItemEditorComponent },
  { path: 'content-template', component: ContentTemplateComponent },
  { path: 'content-template-editor', component: ContentTemplateEditorComponent },
  { path: 'pages', component: PageListComponent },
  { path: 'page-editor', component: PageEditorComponent },
  { path: 'layouts', component: LayoutListComponent },
  { path: 'layout-editor', component: LayoutEditorComponent }
];

export const routing = RouterModule.forRoot(routes);
