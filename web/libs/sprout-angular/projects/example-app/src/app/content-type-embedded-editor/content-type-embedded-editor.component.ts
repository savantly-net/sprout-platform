import { Component, OnInit } from '@angular/core';
import { ContentType } from '@savantly/ngx-sprout-content';

@Component({
  selector: 'app-content-type-embedded-editor',
  templateUrl: './content-type-embedded-editor.component.html',
  styleUrls: ['./content-type-embedded-editor.component.scss']
})
export class ContentTypeEmbeddedEditorComponent implements OnInit {

  contentType: ContentType = new ContentType();

  beforeSave(model: ContentType) {
    alert('intercepted.');
    return true;
  }

  beforeDelete(model: ContentType) {
    alert('intercepted.');
    return true;
  }

  beforeClose(model: ContentType) {
    alert('intercepted.');
    return true;
  }

  constructor() {
    console.log('constructed');
   }

  ngOnInit(): void {
  }

}
