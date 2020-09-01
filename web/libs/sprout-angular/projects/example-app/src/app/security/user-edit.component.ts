import { Component, OnInit } from '@angular/core';
import { ContentItem, ContentTypesService, ContentType, ContentItemService } from '@savantly/ngx-sprout-content';
import { BehaviorSubject } from 'rxjs';
import { ResourcePage } from '@lagoshny/ngx-hal-client';
import { SproutUser } from "@savantly/ngx-sprout-security";

@Component({
  selector: 'app-security-user-editor',
  template: `<sprout-user-editor [(ngModel)]="user"></sprout-user-editor>`,
  styles: []
})
export class UserEditComponent {

    user = new SproutUser();
  
}
