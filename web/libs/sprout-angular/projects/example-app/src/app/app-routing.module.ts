import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentTypesComponent } from "@savantly/ngx-sprout-content";

import { HomeComponent } from "./home";
import { ContentItemEmbeddedEditorComponent } from "./content-item-embedded-editor/content-item-embedded-editor.component";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: 'test/content-item-embedded', component: ContentItemEmbeddedEditorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
