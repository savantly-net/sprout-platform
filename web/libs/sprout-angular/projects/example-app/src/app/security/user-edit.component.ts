import { Component, OnInit } from '@angular/core';
import { UserResource } from "@savantly/ngx-sprout-security";

@Component({
  selector: 'app-security-user-editor',
  template: `<sprout-user-editor [(ngModel)]="user"></sprout-user-editor>`,
  styles: []
})
export class UserEditComponent {

    user = new UserResource();
  
}
