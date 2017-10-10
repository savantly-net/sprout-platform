import { ContentTypesService, ContentType } from './content-types.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-types',
  templateUrl: './content-types.component.html',
  styleUrls: ['./content-types.component.css']
})
export class ContentTypesComponent implements OnInit {
  items: ContentType[];

  constructor(contentTypes: ContentTypesService) {
    this.items = contentTypes.items;
  }

  ngOnInit() {
  }

}
