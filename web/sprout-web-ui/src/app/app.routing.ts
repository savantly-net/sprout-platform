import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PageComponent } from './page/page.component';
import { ServerPluginsComponent } from './server-plugins/server-plugins.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent},
  { path: 'page/:id', component: PageComponent },
  { path: 'plugins/:id', component: ServerPluginsComponent }
];

export const routing = RouterModule.forRoot(routes);
