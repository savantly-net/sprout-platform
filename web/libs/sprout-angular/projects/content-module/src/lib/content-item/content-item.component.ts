import { ContentItem, ContentItemService } from './content-item.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sprout-content-items',
  templateUrl: './content-item.component.html',
  styleUrls: ['./content-item.component.css']
})
export class ContentItemComponent implements OnInit {

  items: ContentItem[];

  addItem(): void {
    this.router.navigate(['content-item', 'new']);
  }

  editItem(item: ContentItem): void {
    this.router.navigate(['content-item', item.id, 'edit']);
  }

  deleteItem(item: ContentItem): void {
    if(confirm('Are you sure?')){
      this.service.delete(item).subscribe(data => {
        this.getContentItems();
      }, err => {
        console.error('Failed to delete content item');
      });
    }
  }

  getContentItems(): void {
    this.service.getAll().subscribe(data => {
      this.items = data;
    }, err => {
      console.error('Failed to get contentItems');
    });
  }

  ngOnInit() {
  }

  constructor(
    private router: Router,
    private service: ContentItemService) {
    this.getContentItems();
  }
}
