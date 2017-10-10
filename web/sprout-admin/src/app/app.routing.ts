import { ContentItemsComponent } from './content-items/content-items.component';
import { ContentTypesComponent } from './content-types/content-types.component';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'content-types', component: ContentTypesComponent },
  { path: 'content-items', component: ContentItemsComponent }
];

export const routing = RouterModule.forRoot(routes);
