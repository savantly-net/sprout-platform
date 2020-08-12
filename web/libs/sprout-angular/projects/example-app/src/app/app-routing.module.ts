import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentTypesComponent } from "@savantly/ngx-sprout-content";

import { HomeComponent } from "./home";

const routes: Routes = [
  {path: "", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
