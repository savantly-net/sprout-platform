import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export class ContentField {
  id: string;
  name: string;
  displayName: string;
  sortOrder: number;
  fieldType: string;
  required: boolean;
}

export class ContentTemplate {
  id: string;
  name: string;
  content: string;
  fields: ContentField[];
}

@Injectable()
export class ContentTemplateService {
  items: ContentTemplate[];


  findAll(): any {
    return this.http.get('/api/contentTemplates').subscribe();
  }

  saveItem(item: ContentTemplate): any {
    if (item['isNew']) {
      return this.http.post('/api/contentTemplates', item).subscribe();
    } else {
      return this.http.put('/api/contentTemplates/' + item.id, item).subscribe();
    }
  }

  deleteItem(item: ContentTemplate): any {
    return this.http.delete('/api/contentTemplates' + item.id).subscribe();
  }

  constructor(private http: HttpClient) {
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
