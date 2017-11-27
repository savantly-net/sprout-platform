import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { EmailService } from './email-service';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleService } from './role.service';
import { UserService } from './user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [UserListComponent, UserEditorComponent, RoleListComponent],
  exports: [UserListComponent, UserEditorComponent, RoleListComponent],
  providers: [UserService, EmailService, RoleService]
})
export class UserModule { }
