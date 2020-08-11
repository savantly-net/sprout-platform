import { Resource, RestService } from '@lagoshny/ngx-hal-client';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class ContentTemplate extends Resource {
  id: string;
  'new': boolean;
  name: string;
  description: string;
  content: string;
  createdDate: any;
  createdBy: any;
  modifiedDate: any;
  modifiedBy: any;

  constructor(){
    super();
  }
}

@Injectable({providedIn: 'root'})
export class ContentTemplateService extends RestService<ContentTemplate> {

  findById(id: string) {
    const searchOptions: any = {params: [{key: 'id', value: id}]};
    return this.searchSingle('findById', searchOptions);
  }

  constructor(injector: Injector) {
    super(ContentTemplate, 'contentTemplates', injector);
  }

}
