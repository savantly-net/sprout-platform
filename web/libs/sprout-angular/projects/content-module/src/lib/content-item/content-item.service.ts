import { Injectable, Injector } from '@angular/core';
import { Resource, RestService } from '@lagoshny/ngx-hal-client';
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { ContentTemplate } from '../content-template/content-template.service';
import { ContentType } from '../content-types/content-types.service';

export class ContentItem extends Resource {
  id: string;
  name: string;
  description?: string;
  fieldValues: any = {};
  template: any;
  contentType: ContentType = null;

  hasContentType(): boolean {
    return (this.contentType !== null || this._links?.contentType !== null);
  }

  getContentType(): Observable<ContentType> {
    if(this.contentType) {
      return of(this.contentType);
    } else {
      return this.getRelation(ContentType, 'contentType').pipe(map(ct => {
        this.contentType = ct as ContentType;
        return ct;
      })) as Observable<ContentType>;
    }
  };

  hasContentTemplate(): boolean {
    return (this.template !== null || this._links?.template !== null);
  }

  getContentTemplate = (): Observable<ContentTemplate> => {
    if(this.template) {
      return of(this.template);
    } else {
      return this.getRelation(ContentTemplate, 'contentTemplate').pipe(map(ct => {
        this.template = ct as ContentTemplate;
        return ct;
      })) as Observable<ContentTemplate>;
    }
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
