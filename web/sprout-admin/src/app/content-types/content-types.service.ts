import { ContentTemplate, ContentTemplateService } from '../content-template/content-template.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class ContentType {
  id: string;
  name: string;
  description?: string;
  updateable: boolean;
  template: ContentTemplate;
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
    const contentTemplate = contentTemplateService.items[0];
    this.items = [
      {
        id: 'contentType_01',
        name: 'Example Content Type',
        description: 'ContentType Description',
        template: contentTemplate,
        updateable: true,
        icon: 'subject'
      }
    ];
  }

}
