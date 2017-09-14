import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './authentication/authentication.service';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [AuthenticationService, UserComponent],
  declarations: [UserComponent]
})
export class SecurityModule { }
