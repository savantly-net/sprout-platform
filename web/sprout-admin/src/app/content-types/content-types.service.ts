import { ContentTemplate, ContentTemplateService } from '../content-template/content-template.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class ContentField {
  id: string;
  name: string;
  displayName: string;
  sortOrder: number;
  fieldType: string;
  required: boolean;
}

export class ContentType {
  id: string;
  name: string;
  description?: string;
  updateable: boolean;
  template: ContentTemplate;
  fields: ContentField[];
  icon?: string;
}

@Injectable()
export class ContentTypesService {
  private itemSource = new BehaviorSubject<ContentType>(new ContentType());
  currentItem = this.itemSource.asObservable();
  items: ContentType[];

  changeCurrentItem(item: ContentType) {
    this.itemSource.next(item);
  }

  saveItem(item: ContentType) {

  }

  constructor(contentTemplateService: ContentTemplateService) {

  }

}
