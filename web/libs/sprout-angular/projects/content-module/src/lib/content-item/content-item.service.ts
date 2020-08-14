import { Resource, RestService } from '@lagoshny/ngx-hal-client';
import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContentTemplate } from '../content-template/content-template.service';
import { Observable } from 'rxjs';
import { ContentType } from '../content-types/content-types.service';

export class ContentItem extends Resource {
  id: string;
  name: string;
  description?: string;
  fieldValues: any = {};
  template: any;
  contentType: any;

  getContentType = (): Observable<ContentType> => {
    return this.getRelation(ContentType, 'contentType') as Observable<ContentType>;
  };

  getContentTemplate = (): Observable<ContentTemplate> => {
    return this.getRelation(ContentTemplate, 'contentTemplate') as Observable<ContentTemplate>;
  };
}

@Injectable({providedIn: 'root'})
export class ContentItemService extends RestService<ContentItem>  {

  getContentType(contentItem: ContentItem): Observable<ContentType> {
    return contentItem.getRelation(ContentType, 'contentType') as Observable<ContentType>;
  }

  getContentTemplate(contentItem: ContentItem): Observable<ContentTemplate> {
    if (Object.prototype.hasOwnProperty('getRelation')) {
      return contentItem.getRelation(ContentTemplate, 'template') as Observable<ContentTemplate>;
    } else {
      throw new Error("the content item doesnt have a getRelation function???");
      
    }
  }

  setContentTemplate(contentItem: ContentItem, template: ContentTemplate) {
    return contentItem.updateRelation('template', template);
  }

  constructor(injector: Injector) {
    super(ContentItem, 'contentItems', injector);
  }

}
