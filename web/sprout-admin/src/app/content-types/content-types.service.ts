import { ContentTemplate, ContentTemplateService } from '../content-template/content-template.service';
import { Injectable } from '@angular/core';

export abstract class ContentType {
  id: string;
  name: string;
  description?: string;
  updateable: boolean;
  template: ContentTemplate;
  icon?: string;
}

@Injectable()
export class ContentTypesService {
  items: ContentType[];

  constructor(contentTemplateService: ContentTemplateService) {
    const contentTemplate = contentTemplateService.items[0];
    this.items = [
      {
        id: 'contentTemplate_01',
        name: 'Example Content Template',
        description: 'ContentTemplate Description',
        template: contentTemplate,
        updateable: true,
        icon: 'subject'
      }
    ];
  }

}
