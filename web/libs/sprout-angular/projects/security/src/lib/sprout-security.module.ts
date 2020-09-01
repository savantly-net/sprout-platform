import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SproutRoleEditorComponent } from './sprout-role/sprout-role-editor/sprout-role-editor.component';
import { SproutRoleListComponent } from './sprout-role/sprout-role-list/sprout-role-list.component';
import { SproutUserDetailComponent } from './sprout-user/sprout-user-detail/sprout-user-detail.component';
import { SproutUserEditorComponent } from './sprout-user/sprout-user-editor/sprout-user-editor.component';
import { SproutUserListComponent } from './sprout-user/sprout-user-list/sprout-user-list.component';

@NgModule({
  declarations: [SproutUserListComponent, 
    SproutUserDetailComponent, 
    SproutUserEditorComponent, 
    SproutRoleEditorComponent, 
    SproutRoleListComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [SproutUserListComponent, 
    SproutUserDetailComponent, 
    SproutUserEditorComponent, 
    SproutRoleEditorComponent, 
    SproutRoleListComponent]
})
export class SproutSecurityModule { }
