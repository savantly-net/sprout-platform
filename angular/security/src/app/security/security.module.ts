import { SecurityMockService } from './security-mock.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityService } from './security.service';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [UserComponent],
  declarations: [UserComponent],
  providers: []
})
export class SecurityModule { }
