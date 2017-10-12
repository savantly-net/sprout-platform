import { ContentTemplate } from '../content-template/content-template.service';
import { Identifiable, RestRepositoryService } from '../spring-data/rest-repository.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';

export class ContentField {
  id: string;
  name: string;
  displayName: string;
  sortOrder: number;
  fieldType: string;
  required: boolean;
}

export class ContentType implements Identifiable {
  id: string;
  name: string;
  description?: string;
  updateable: boolean;
  template: ContentTemplate;
  fields: ContentField[];
  icon?: string;
}

@Injectable()
export class ContentTypesService extends RestRepositoryService<ContentType> {
  private itemSource = new BehaviorSubject<ContentType>(new ContentType());
  currentItem = this.itemSource.asObservable();
  items: ContentType[];

  changeCurrentItem(item: ContentType) {
    this.itemSource.next(item);
  }

  constructor(http: HttpClient) {
    super(http, '/api/contentTypes');

  }

}
