import { ContentTypesService, ContentType } from './content-types.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sprout-content-types',
  templateUrl: './content-types.component.html',
  styleUrls: ['./content-types.component.css']
})
export class ContentTypesComponent implements OnInit {

  @Output("messageEvent") 
  messageEmitter = new EventEmitter<{msg: string, code: number, err?: any}>();
  items: ContentType[];

  addItem(): void {
    this.router.navigate(['content-type-editor']);
  }

  editItem(item: ContentType): void {
    this.router.navigate(['content-type-editor', {id: item.id}]);
  }

  deleteItem(item: ContentType): void {
    this.contentTypes.delete(item).subscribe(data => {
      this.getItems();
    }, err => {
      this.messageEmitter.emit({msg: 'Could not delete item', code: 500, err});
      console.error(err);
    });
  }

  getItems(): void {
    this.contentTypes.getAll().subscribe(data => {
      this.items = data;
    }, err => {
      console.error('Failed to get contentTypes');
    });
  }

  constructor(private router: Router, private contentTypes: ContentTypesService) {
    this.getItems();
  }

  ngOnInit() {
  }

}
