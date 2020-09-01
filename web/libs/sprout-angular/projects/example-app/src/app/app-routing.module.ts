import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SproutUserListComponent, SproutUserEditorComponent } from "@savantly/ngx-sprout-security";

import { HomeComponent } from "./home";
import { ContentItemEmbeddedEditorComponent } from "./content-item-embedded-editor/content-item-embedded-editor.component";
import { ContentTypeEmbeddedEditorComponent } from './content-type-embedded-editor/content-type-embedded-editor.component';
import { UserEditComponent } from "./security/user-edit.component";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: 'test/content-item-embedded', component: ContentItemEmbeddedEditorComponent},
  {path: 'test/content-type-embedded', component: ContentTypeEmbeddedEditorComponent},
  {path: 'test/security/user-list', component: SproutUserListComponent},
  {path: 'test/security/user-edit', component: UserEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
