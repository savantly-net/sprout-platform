import { ContentItemComponent } from './content-item/content-item.component';
import { ContentTemplateEditorComponent } from './content-template/content-template-editor/content-template-editor.component';
import { ContentTemplateComponent } from './content-template/content-template.component';
import { ContentTypesEditorComponent } from './content-types/content-types-editor/content-types-editor.component';
import { ContentTypesComponent } from './content-types/content-types.component';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'content-types', component: ContentTypesComponent },
  { path: 'content-types-editor', component: ContentTypesEditorComponent },
  { path: 'content-items', component: ContentItemComponent },
  { path: 'content-template', component: ContentTemplateComponent },
  { path: 'content-template-editor', component: ContentTemplateEditorComponent }
];

export const routing = RouterModule.forRoot(routes);
