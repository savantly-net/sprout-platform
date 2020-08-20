import { Component, OnInit } from '@angular/core';
import { ContentItem, ContentTypesService, ContentType, ContentItemService } from '@savantly/ngx-sprout-content';
import { BehaviorSubject } from 'rxjs';
import { ResourcePage } from '@lagoshny/ngx-hal-client';

@Component({
  selector: 'app-content-item-embedded-editor',
  templateUrl: './content-item-embedded-editor.component.html',
  styleUrls: ['./content-item-embedded-editor.component.scss']
})
export class ContentItemEmbeddedEditorComponent implements OnInit {

  contentItem = new ContentItem();
  contentItem2 = new ContentItem();

  beforeSave(model: ContentItem) {
    alert('intercepted. Use the other save button');
    return true;
  }

  beforeDelete(model: ContentItem) {
    alert('intercepted.');
    return true;
  }

  beforeClose(model: ContentItem) {
    alert('intercepted.');
    return true;
  }
  
  save(){
    this.contentItemService.create(this.contentItem).subscribe(result => {
      console.log('saved contentItem: ', result);
    })
  }

  ngOnInit(): void {
    this.contentTypeService.getAllPage().subscribe((contentTypes: ResourcePage<ContentType>) => {
      if(contentTypes.resources.length > 0) {
        const contentItem = new ContentItem();
        contentItem.contentType = contentTypes.resources[0];
        this.contentItem = contentItem;
      } else {
        console.warn('there were no contentTypes returned from the server');
      }
    });
  }

  constructor(
    private contentItemService: ContentItemService,
    private contentTypeService: ContentTypesService) {}
}
