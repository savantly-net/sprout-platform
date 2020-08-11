import { Resource, RestService } from '@lagoshny/ngx-hal-client';
import { Injectable, Injector } from '@angular/core';


export class ContentField extends Resource {
  id: string;
  name: string;
  displayName: string;
  sortOrder: number;
  fieldType: string;
  required: boolean;
  contentType: any;
}

@Injectable({providedIn: 'root'})
export class ContentFieldService extends RestService<ContentField> {

  constructor(injector: Injector) {
    super(ContentField, 'contentFields', injector);
  }

}
