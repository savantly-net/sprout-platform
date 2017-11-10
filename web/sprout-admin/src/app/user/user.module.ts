import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleEditorComponent } from './role-editor/role-editor.component';
import { UserService } from './user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [UserListComponent, UserEditorComponent, RoleListComponent, RoleEditorComponent],
  exports: [UserListComponent, UserEditorComponent, RoleListComponent, RoleEditorComponent],
  providers: [UserService]
})
export class UserModule { }
