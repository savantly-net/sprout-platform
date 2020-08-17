import { ContentField } from '../content-field/content-field.service';
import { Resource, RestService, ExternalService } from '@lagoshny/ngx-hal-client';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export class ContentType extends Resource {
  id: string;
  name: string;
  description?: string;
  updateable: boolean = true;
  fields: ContentField[];
  icon?: string;
  requiresTemplate: boolean;
  version: number;
}

@Injectable({providedIn: 'root'})
export class ContentTypesService extends RestService<ContentType> {

  getFieldTypes() {
    return this.http.get<Array<any>>(this.extService.getRootUri() + '/../content/fieldTypes');
  }

  findByName(name: string): Observable<ContentType> {
    const options: any = {params: [{key: 'name', value: name}]};
    return this.searchSingle('findByName', options);
  }

  constructor(private http: HttpClient, injector: Injector, private extService: ExternalService) {
    super(ContentType, 'contentTypes', injector);
  }

}
