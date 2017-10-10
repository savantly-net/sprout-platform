import { Injectable } from '@angular/core';

export abstract class ContentField {
  id: string;
  name: string;
  displayName: string;
  sortOrder: number;
  fieldType: string;
  required: boolean;
}

export abstract class ContentTemplate {
  id: string;
  name: string;
  content: string;
  fields: ContentField[];
}

@Injectable()
export class ContentTemplateService {
  items: ContentTemplate[];

  constructor() {
    this.items = [
      {
        id: '123',
        name: 'example content template',
        content: '<h1>${name}</h1><div>${body}</div>',
        fields: [
          {
            id: 'field_name',
            name: 'name',
            displayName: 'Name',
            fieldType: 'text',
            required: true,
            sortOrder: 0
          }, {
            id: 'field_body',
            name: 'body',
            displayName: 'Body',
            fieldType: 'text',
            required: true,
            sortOrder: 1
          }
        ]
      }
    ];
  }

}
