import { ContentItem, ContentItemService } from './content-item.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-items',
  templateUrl: './content-item.component.html',
  styleUrls: ['./content-item.component.css']
})
export class ContentItemComponent implements OnInit {

  items: ContentItem[];

  addItem(): void {
    this.router.navigate(['content-item-editor']);
  }

  editItem(item: ContentItem): void {
    this.router.navigate(['content-item-editor', {id: item.id}]);
  }

  ngOnInit() {
  }

  constructor(private router: Router, service: ContentItemService) {
    service.findAll().subscribe(data => {
      this.items = data._embedded.contentItems;
    }, err => {
      console.error('Failed to get contentItems');
    });
  }
}
